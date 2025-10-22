"use client";

import { useEffect, useState, useCallback } from "react";
import { FileText } from "lucide-react";
import { getProducts } from "../../../lib/data";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { IProduct } from "../../../interfaces/dataInterfaces";

import ProductFormModal from "@/components/admin/products/productFormModal";
import ProductPhotoModal from "@/components/admin/products/productPhotoModal";
import ConfirmModal from "@/components/confirmModal";
import ProductsTableHeader from "@/components/admin/products/tableHeader";
import ProductSection from "@/components/admin/dashboard/productSection";
import ProductsTableRow from "@/components/admin/products/tableRow";
import ProductsTableSkeleton from "@/components/skeletons/admin/products/tableSkeleton";
import useAuthStore from "@/stores/useAuthStore";
import TablePagination from "@/components/admin/products/tablePagination";

export default function ProductsTable() {
  const { isAuthLoading } = useAuthStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // State for the modals
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [productForImage, setProductForImage] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  // --- DATA FETCHING ---
  const fetchProducts = useCallback(async () => {
    if (!isAuthLoading) return;
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  }, [isAuthLoading]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- API HANDLERS ---
  const confirmDeleteProduct = async (product: IProduct) => {
    if (!product) return;

    try {
      await api.delete(`/api/products/${product.id}`);
      toast.success("Berhasil Menghapus Product");
      // Refetch products to ensure data is consistent
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Gagal Menghapus Product");
    }
  };

  // --- MODAL HANDLERS ---
  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: IProduct) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleOpenImageModal = (product: IProduct) => {
    setProductForImage(product);
    setIsImageModalOpen(true);
  };

  const handleOpenDeleteModal = (product: IProduct) => {
    setProductToDelete(product);
    setIsConfirmModalOpen(true);
  };

  const handleProductSave = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleImageSave = () => {
    setIsImageModalOpen(false);
    fetchProducts();
  };

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- PAGINATION LOGIC ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto ">
        <div className=" md:flex md:items-center md:justify-between">
          <header className="mb-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-500 dark:text-gray-200" />
              <h1 className="text-2xl font-bold text-blue-500 dark:text-white">
                Product Management
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Melihat, mengatur, dan update stok produk.
            </p>
          </header>
        </div>

        <ProductSection />

        <main className="flex flex-col gap-4 py-6">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-500" />
            <h2 className="text-2xl text-blue-500 font-bold">Daftar Produk</h2>
          </div>

          <div className=" bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Component for Search and Add Button */}
            <ProductsTableHeader
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onAddProductClick={handleOpenAddModal}
            />

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-blue-500 font-semibold uppercase ">
                  <tr>
                    <th scope="col" className="px-3 py-2">
                      Produk
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Kategori
                    </th>
                    <th scope="col" className="px-3 py-2 text-right">
                      Harga
                    </th>
                    <th scope="col" className="px-3 py-2 text-center">
                      Stok
                    </th>
                    <th scope="col" className="px-3 py-2 text-center">
                      Berat/pcs (Kg)
                    </th>
                    <th scope="col" className="px-3 py-2 text-center">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Component for Loading and Empty States */}
                  <ProductsTableSkeleton
                    loading={loading}
                    isEmpty={filteredProducts.length === 0 && !loading}
                    searchTerm={searchTerm}
                  />
                  {/* Component for Table Row */}
                  {currentProducts.map((product) => (
                    <ProductsTableRow
                      key={product.id}
                      product={product}
                      onEdit={handleOpenEditModal}
                      onDelete={handleOpenDeleteModal}
                      onOpenImageModal={handleOpenImageModal}
                    />
                  ))}
                </tbody>
              </table>

              {/* Component for Pagination */}
              {filteredProducts.length > productsPerPage && (
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals remain here, controlled by the container state */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleProductSave}
        productToEdit={productToEdit}
      />
      <ProductPhotoModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={handleImageSave}
        product={productForImage}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => confirmDeleteProduct(productToDelete as IProduct)}
        title="Hapus Product?"
        confirmText="Hapus"
      />
    </div>
  );
}

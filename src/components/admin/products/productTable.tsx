"use client";

import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { ICategory, IProduct } from "../../../interfaces/dataInterfaces";

import { ProductFormModal } from "@/components/admin/products/productFormModal";
import { ProductPhotoModal } from "@/components/admin/products/productPhotoModal";
import { ConfirmModal } from "@/components/confirmModal";
import { ProductsTableHeader } from "@/components/admin/products/tableHeader";
import { ProductsTableRow } from "@/components/admin/products/tableRow";
import { ProductsTableSkeleton } from "@/components/skeletons/admin/products/tableSkeleton";
import { TablePagination } from "@/components/admin/products/tablePagination";
import { getTotalPages } from "@/helper/functions";
import { useRouter } from "next/navigation";

interface props {products:IProduct[]; isLoading: boolean; categories:ICategory[] }

export const ProductsTable = ({products, isLoading, categories}:props ) => {
const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  // State for the modals
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [productForImage, setProductForImage] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  // --- API HANDLERS ---
  const confirmDeleteProduct = async (product: IProduct) => {
    if (!product) return;

    try {
      await api.delete(`/api/products/${product.id}`);
      toast.success("Berhasil Menghapus Product");
      router.refresh();
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
    router.refresh();
  };

  const handleImageSave = () => {
    router.refresh();
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

  const {totalPages, currentItems} = getTotalPages(filteredProducts, currentPage, productsPerPage)

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="flex flex-col gap-4 py-6">
      <div className="flex items-center gap-2">
        <FileText className="w-6 md:w-8 text-blue-500" />
        <h2 className="text-xl md:text-2xl text-blue-500 font-bold">
          Daftar Produk
        </h2>
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
                loading={isLoading}
                isEmpty={filteredProducts.length === 0 && !isLoading}
                searchTerm={searchTerm}
              />
              {/* Component for Table Row */}
              {currentItems.map((product) => (
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
      {/* Modals remain here, controlled by the container state */}
      <ProductFormModal
      categories={categories}
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
    </main>
  );
}

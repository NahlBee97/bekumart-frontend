"use client";

import { IProduct } from "@/interfaces/productInterfaces";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { apiUrl } from "@/config";
import { getCookie } from "cookies-next";
import { CameraIcon, DeleteIcon, EditIcon, PlusIcon } from "@/components/admin/products/icons";
import ProductFormModal from "@/components/admin/products/productFormModal";
import ImageUploadModal from "@/components/admin/products/productImageModal";

// --- MAIN COMPONENT ---
// Renders the entire product table page.
export default function ProductsTable() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const token = getCookie("access_token") as string;

  // State for the modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [productForImage, setProductForImage] = useState<IProduct | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/api/products`);
      const sortedProducts = data.data.sort(
        (a: IProduct, b: IProduct) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- HANDLERS ---
  const handleDelete = async (productId: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
      }

      await axios.delete(`${apiUrl}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refetch products to ensure data is consistent
      fetchProducts();

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

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

  const handleImageSave = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleProductSave = () => {
    setIsModalOpen(false);
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
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manajemen Produk
            </h1>
            <p className="mt-1 text-gray-600">
              Atur stok, harga, dan informasi produk lainnya.
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
          >
            <PlusIcon />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Table Header and Search */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berdasarkan nama produk atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Produk
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Stok
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Berat/pcs (Kg)
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Tindakan
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="relative group flex-shrink-0">
                          {/* eslint-disable-next-line */}
                          <img
                            src={
                              product.imageUrl ||
                              "https://placehold.co/40x40/e2e8f0/64748b?text=N/A"
                            }
                            alt={product.name}
                            className="w-12 h-12 rounded-md object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/40x40/e2e8f0/64748b?text=Error";
                            }}
                          />
                          <button
                            onClick={() => handleOpenImageModal(product)}
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-md opacity-0 group-hover:opacity-50 transition-opacity"
                            aria-label="Change image"
                          >
                            <CameraIcon />
                          </button>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            Rating:{" "}
                            {product.rating
                              ? `${product.rating}/5`
                              : "Belum ada rating"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </td>
                    <td className="px-6 py-4 text-center">{product.stock}</td>
                    <td className="px-6 py-4 text-center">
                      {product.weightInKg}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="group p-1 rounded-full hover:bg-blue-100 transition-colors"
                          aria-label="Edit product"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="group p-1 rounded-full hover:bg-red-100 transition-colors"
                          aria-label="Delete product"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">
                  Loading Products...
                </h3>
                <p className="mt-1 text-gray-500">
                  Please wait while we fetch the product data.
                </p>
              </div>
            )}
            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">
                  No Products Found
                </h3>
                <p className="mt-1 text-gray-500">
                  Your search for{" "}
                  <span className="font-semibold">{searchTerm}</span> did not
                  match any products.
                </p>
              </div>
            )}
            {filteredProducts.length > productsPerPage && (
              <div className="p-4 sm:p-6 flex items-center justify-between border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  Page <span className="font-semibold">{currentPage}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleProductSave}
        productToEdit={productToEdit}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={handleImageSave}
        product={productForImage}
      />
    </div>
  );
}

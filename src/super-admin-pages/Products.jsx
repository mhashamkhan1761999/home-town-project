import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getRequest, postRequest, deleteRequest, putRequest } from "../api";
import { Plus, Search, Edit, Trash, Eye, Filter, Package } from "lucide-react";
import { queryClient } from "../main";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useModalHistory } from "../hooks/useModalHistory";

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

const SuperAdminProducts = () => {
  // Utility to strip HTML tags from a string
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal history management
  const addModal = useModalHistory('addProduct', showAddModal, () => setShowAddModal(false));
  const editModal = useModalHistory('editProduct', showEditModal, () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  });
  const deleteModal = useModalHistory('deleteProduct', showDeleteModal, () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  });
  const viewModal = useModalHistory('viewProduct', showViewModal, () => {
    setShowViewModal(false);
    setSelectedProduct(null);
  });

  // Hardcoded fallback data
  const fallbackProducts = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      description: "Premium quality cotton t-shirt with comfortable fit",
      price: 25.99,
      stock: 150,
      status: "active",
      image: "shirt.svg",
      colors: '["red", "blue", "black", "white"]',
      category: { id: 1, name: "Clothing" },
    },
    {
      id: 2,
      name: "Athletic Hoodie",
      description:
        "Warm and comfortable hoodie perfect for sports and casual wear",
      price: 45.99,
      stock: 75,
      status: "active",
      image: "shirt.svg",
      colors: '["gray", "navy", "black"]',
      category: { id: 1, name: "Clothing" },
    },
    {
      id: 3,
      name: "Baseball Cap",
      description: "Adjustable baseball cap with team logo",
      price: 19.99,
      stock: 200,
      status: "active",
      image: "shirt.svg",
      colors: '["red", "blue", "white", "black"]',
      category: { id: 2, name: "Accessories" },
    },
    {
      id: 4,
      name: "Sports Jersey",
      description: "Official team jersey with player name and number",
      price: 65.99,
      stock: 50,
      status: "active",
      image: "shirt.svg",
      colors: '["blue", "white", "red"]',
      category: { id: 3, name: "Jersey" },
    },
    {
      id: 5,
      name: "Running Shoes",
      description: "High-performance running shoes with advanced cushioning",
      price: 89.99,
      stock: 30,
      status: "active",
      image: "shirt.svg",
      colors: '["black", "white", "blue", "gray"]',
      category: { id: 4, name: "Footwear" },
    },
    {
      id: 6,
      name: "Protein Powder",
      description: "Premium whey protein powder for muscle building",
      price: 39.99,
      stock: 100,
      status: "active",
      image: "shirt.svg",
      colors: '["white"]',
      category: { id: 5, name: "Strength Supplements" },
    },
  ];

  const fallbackCategories = [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Accessories" },
    { id: 3, name: "Jersey" },
    { id: 4, name: "Footwear" },
    { id: 5, name: "Strength Supplements" },
    { id: 6, name: "Health" },
    { id: 7, name: "Coffee" },
  ];

  // Fetch products with fallback
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => getRequest("/admin/products"),
    onError: (error) => {
      console.log("Backend not available, using fallback data");
    },
  });

  // Fetch categories with fallback
  const { data: categories, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getRequest("/categories"),
    onError: (error) => {
      console.log("Backend not available for categories, using fallback data");
    },
  });

  // Use fallback data if backend is not available
  const displayProducts = error ? fallbackProducts : products || [];
  const displayCategories = categoriesError
    ? fallbackCategories
    : categories || [];

  // Handle modal state restoration from URL
  useEffect(() => {
    if (addModal.shouldOpenModal) {
      setShowAddModal(true);
    }
    if (editModal.shouldOpenModal) {
      const modalData = editModal.getModalData();
      if (modalData?.product) {
        setSelectedProduct(modalData.product);
        setShowEditModal(true);
      }
    }
    if (deleteModal.shouldOpenModal) {
      const modalData = deleteModal.getModalData();
      if (modalData?.product) {
        setSelectedProduct(modalData.product);
        setShowDeleteModal(true);
      }
    }
    if (viewModal.shouldOpenModal) {
      const modalData = viewModal.getModalData();
      if (modalData?.product) {
        setSelectedProduct(modalData.product);
        setShowViewModal(true);
      }
    }
  }, [
    addModal.shouldOpenModal,
    editModal.shouldOpenModal,
    deleteModal.shouldOpenModal,
    viewModal.shouldOpenModal
  ]);

  // Filter products based on search and category
  const filteredProducts =
    displayProducts?.filter((product) => {
      const matchesSearch =
        product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product?.category?.id === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    editModal.openModal({ product });
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    deleteModal.openModal({ product });
    setShowDeleteModal(true);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    viewModal.openModal({ product });
    setShowViewModal(true);
  };

  return (
    <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white font-bold text-3xl">Manage Products</h2>
        <button
          onClick={() => {
            addModal.openModal();
            setShowAddModal(true);
          }}
          className="bg-[#D4BC6D] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b89f4e] transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#838383]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white placeholder-[#838383] focus:border-[#D4BC6D] outline-none"
          />
        </div>
        <div className="min-w-[200px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
          >
            <option value="">All Categories</option>
            {displayCategories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-bold text-[#838383] border-b border-[#323232]">
              <th className="pb-4">IMAGE</th>
              <th className="pb-4">NAME</th>
              <th className="pb-4">CATEGORY</th>
              <th className="pb-4">PRICE</th>
              <th className="pb-4">STOCK</th>
              <th className="pb-4">STATUS</th>
              <th className="pb-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-[#838383]">
                  Loading products...
                </td>
              </tr>
            ) : paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-[#838383]">
                  No products found
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#323232] hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <td className="py-4">
                    <div className="w-12 h-12 bg-[#282828] rounded-lg overflow-hidden">
                      {product.image ? (
                        <img
                          src={
                            error
                              ? `/${product.image}`
                              : `https://hometown.eagleeblaze.com/storage/app/public/${product.image}`
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full flex items-center justify-center text-[#838383] ${
                          product.image ? "hidden" : ""
                        }`}
                      >
                        <Package size={20} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-[#838383] text-sm truncate max-w-[200px]">
                        {stripHtml(product.description)}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 text-[#D4BC6D]">
                    {product.category?.name || "N/A"}
                  </td>
                  <td className="py-4 text-white font-bold">
                    ${product.price}
                  </td>
                  <td className="py-4 text-white">
                    {product.stock || "Unlimited"}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status || "Active"}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(product)}
                        className="p-2 text-[#838383] hover:text-[#D4BC6D] transition"
                        title="View Product"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-[#838383] hover:text-blue-400 transition"
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 text-[#838383] hover:text-red-400 transition"
                        title="Delete Product"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-[#282828] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a] transition"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg transition ${
                currentPage === page
                  ? "bg-[#D4BC6D] text-black"
                  : "bg-[#282828] text-white hover:bg-[#3a3a3a]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-[#282828] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a] transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          onClose={() => {
            addModal.closeModal();
            setShowAddModal(false);
          }}
          categories={displayCategories}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => {
            editModal.closeModal();
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          categories={displayCategories}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => {
            deleteModal.closeModal();
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showViewModal && selectedProduct && (
        <ViewProductModal
          product={selectedProduct}
          onClose={() => {
            viewModal.closeModal();
            setShowViewModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

// Add Product Modal
const AddProductModal = ({ onClose, categories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedColors, setSelectedColors] = useState([]);
  const [image, setImage] = useState(null);

  const mutation = useMutation({
    mutationFn: (data) => postRequest("/admin/products", data, true),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
      onClose();
      // You could add a toast notification here
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      // You could add error handling/toast here
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "colors") {
        formData.append(key, data[key]);
      }
    });

    if (selectedColors.length > 0) {
      formData.append(
        "colors",
        JSON.stringify(selectedColors.map((c) => c.value))
      );
    }

    if (image) {
      formData.append("image", image);
    }

    mutation.mutate(formData);
  };

  const colorOptions = [
    { label: "Black", value: "black", color: "#000000" },
    { label: "Black Beauty", value: "black beauty", color: "#1C1C1C" },
    { label: "White", value: "white", color: "#FFFFFF" },
    { label: "Light Gray", value: "light gray", color: "#D3D3D3" },
    { label: "Dark Gray", value: "dark gray", color: "#A9A9A9" },
    { label: "Pirate Gray", value: "pirate gray", color: "#828282" },
    { label: "Stone Gray", value: "stone gray", color: "#8B8C89" },
    { label: "Oat Gray", value: "oat gray", color: "#CCC5B9" },
    { label: "Carbon Gray", value: "carbon gray", color: "#545454" },
    { label: "Sand", value: "sand", color: "#C2B280" },
    { label: "Sand Color", value: "sand color", color: "#C2B280" },
    { label: "Milk Tea", value: "milk tea", color: "#DDB892" },
    { label: "Light Apricot", value: "light apricot", color: "#FDD5B1" },
    { label: "Honey Peach", value: "honey peach", color: "#FFB97B" },
    { label: "Yellow", value: "yellow", color: "#FFFF00" },
    { label: "Brown", value: "brown", color: "#8B4513" },
    { label: "Gray Camel", value: "gray camel", color: "#C1B6A4" },
    { label: "Dark Red", value: "dark red", color: "#8B0000" },
    { label: "Watermelon Red", value: "watermelon red", color: "#FC6C85" },
    { label: "Purple", value: "purple", color: "#800080" },
    { label: "Purple Haze", value: "purple haze", color: "#9F00C5" },
    { label: "Blue", value: "blue", color: "#0000FF" },
    { label: "Dark Blue", value: "dark blue", color: "#000080" },
    { label: "Navy", value: "navy", color: "#000080" },
    { label: "Colorful Blue", value: "colorful blue", color: "#3A75C4" },
    { label: "Dark Green", value: "dark green", color: "#006400" },
    { label: "Blackish Green", value: "blackish green", color: "#1C352D" },
    { label: "Gray Green", value: "gray green", color: "#A8B2A1" },
    // legacy and fallback colors
    { label: "Red", value: "red", color: "#FF0000" },
    { label: "Green", value: "green", color: "#008000" },
    { label: "Orange", value: "orange", color: "#FFA500" },
    { label: "Pink", value: "pink", color: "#FFC0CB" },
    { label: "Gray", value: "gray", color: "#808080" },
    { label: "Brown", value: "brown", color: "#A52A2A" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-[#D4BC6D] mb-6">
          Add New Product
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-white font-medium mb-2">
              Product Name
            </label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="4"
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
              placeholder="Enter product description"
              defaultValue={stripHtml(product.description)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                {...register("stock")}
                className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
                placeholder="Leave empty for unlimited"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Weight</label>
            <input
              type="number"
              {...register("weight")}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">
              Category
            </label>
            <select
              {...register("category_id", { required: "Category is required" })}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Colors */}
          <div>
            <label className="block text-white font-medium mb-2">
              Available Colors
            </label>
            <Select
              isMulti
              options={colorOptions.map((opt) => ({
                ...opt,
                label: (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: opt.color }}
                    ></span>
                    {opt.label}
                  </div>
                ),
              }))}
              value={selectedColors}
              onChange={setSelectedColors}
              className="text-black"
              styles={{
                control: (base) => ({
                  ...base,
                  background: "#282828",
                  border: "1px solid #4B4C46",
                  borderRadius: "0.5rem",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#282828",
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  background: isFocused ? "#4B4C46" : "#282828",
                  color: "white",
                }),
                multiValue: (base) => ({
                  ...base,
                  background: "#4B4C46",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#D4BC6D",
                }),
              }}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-white font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#4B4C46] text-white rounded-lg hover:bg-[#5a5b54] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-6 py-3 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#b89f4e] transition disabled:opacity-50"
            >
              {mutation.isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Product Modal
const EditProductModal = ({ product, onClose, categories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category?.id,
    },
  });

  // Robust color parsing: handle JSON array or comma-separated string
  // Robust color parsing: handle array, JSON string, or comma-separated string
  function parseColors(colors) {
    if (!colors) return [];
    if (Array.isArray(colors)) return colors;
    if (typeof colors === "string") {
      try {
        const parsed = JSON.parse(colors);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return colors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
      }
    }
    return [];
  }
  const [selectedColors, setSelectedColors] = useState(
    product.colors
      ? parseColors(product.colors).map((color) => ({
          label: color,
          value: color,
        }))
      : []
  );
  const [image, setImage] = useState(null);

  const mutation = useMutation({
    mutationFn: (data) =>
      putRequest(`/admin/products/${product.id}`, data, true),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
      onClose();
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "colors") {
        formData.append(key, data[key]);
      }
    });

    if (selectedColors.length > 0) {
      formData.append(
        "colors",
        JSON.stringify(selectedColors.map((c) => c.value))
      );
    }

    if (image) {
      formData.append("image", image);
    }

    mutation.mutate(formData);
  };

  const colorOptions = [
    { label: "Red", value: "red", color: "#FF0000" },
    { label: "Blue", value: "blue", color: "#0000FF" },
    { label: "Green", value: "green", color: "#008000" },
    { label: "Black", value: "black", color: "#000000" },
    { label: "White", value: "white", color: "#FFFFFF" },
    { label: "Yellow", value: "yellow", color: "#FFFF00" },
    { label: "Purple", value: "purple", color: "#800080" },
    { label: "Orange", value: "orange", color: "#FFA500" },
    { label: "Pink", value: "pink", color: "#FFC0CB" },
    { label: "Gray", value: "gray", color: "#808080" },
    { label: "Brown", value: "brown", color: "#A52A2A" },
    { label: "Navy", value: "navy", color: "#000080" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-[#D4BC6D] mb-6">Edit Product</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-white font-medium mb-2">
              Product Name
            </label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="4"
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                {...register("stock")}
                className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
                placeholder="Leave empty for unlimited"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Weight</label>
            <input
              type="number"
              {...register("weight")}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">
              Category
            </label>
            <select
              {...register("category_id", { required: "Category is required" })}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Colors */}
          <div>
            <label className="block text-white font-medium mb-2">
              Available Colors
            </label>
            <Select
              isMulti
              options={[
                { label: "Black", value: "black", color: "#000000" },
                {
                  label: "Black Beauty",
                  value: "black beauty",
                  color: "#1C1C1C",
                },
                { label: "White", value: "white", color: "#FFFFFF" },
                { label: "Light Gray", value: "light gray", color: "#D3D3D3" },
                { label: "Dark Gray", value: "dark gray", color: "#A9A9A9" },
                {
                  label: "Pirate Gray",
                  value: "pirate gray",
                  color: "#828282",
                },
                { label: "Stone Gray", value: "stone gray", color: "#8B8C89" },
                { label: "Oat Gray", value: "oat gray", color: "#CCC5B9" },
                {
                  label: "Carbon Gray",
                  value: "carbon gray",
                  color: "#545454",
                },
                { label: "Sand", value: "sand", color: "#C2B280" },
                { label: "Sand Color", value: "sand color", color: "#C2B280" },
                { label: "Milk Tea", value: "milk tea", color: "#DDB892" },
                {
                  label: "Light Apricot",
                  value: "light apricot",
                  color: "#FDD5B1",
                },
                {
                  label: "Honey Peach",
                  value: "honey peach",
                  color: "#FFB97B",
                },
                { label: "Yellow", value: "yellow", color: "#FFFF00" },
                { label: "Brown", value: "brown", color: "#8B4513" },
                { label: "Gray Camel", value: "gray camel", color: "#C1B6A4" },
                { label: "Dark Red", value: "dark red", color: "#8B0000" },
                {
                  label: "Watermelon Red",
                  value: "watermelon red",
                  color: "#FC6C85",
                },
                { label: "Purple", value: "purple", color: "#800080" },
                {
                  label: "Purple Haze",
                  value: "purple haze",
                  color: "#9F00C5",
                },
                { label: "Blue", value: "blue", color: "#0000FF" },
                { label: "Dark Blue", value: "dark blue", color: "#000080" },
                { label: "Navy", value: "navy", color: "#000080" },
                {
                  label: "Colorful Blue",
                  value: "colorful blue",
                  color: "#3A75C4",
                },
                { label: "Dark Green", value: "dark green", color: "#006400" },
                {
                  label: "Blackish Green",
                  value: "blackish green",
                  color: "#1C352D",
                },
                { label: "Gray Green", value: "gray green", color: "#A8B2A1" },
                // legacy and fallback colors
                { label: "Red", value: "red", color: "#FF0000" },
                { label: "Green", value: "green", color: "#008000" },
                { label: "Orange", value: "orange", color: "#FFA500" },
                { label: "Pink", value: "pink", color: "#FFC0CB" },
                { label: "Gray", value: "gray", color: "#808080" },
                { label: "Brown", value: "brown", color: "#A52A2A" },
              ].map((opt) => ({
                ...opt,
                label: (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: opt.color }}
                    ></span>
                    {opt.label}
                  </div>
                ),
              }))}
              value={selectedColors}
              onChange={setSelectedColors}
              className="text-black"
              styles={{
                control: (base) => ({
                  ...base,
                  background: "#282828",
                  border: "1px solid #4B4C46",
                  borderRadius: "0.5rem",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#282828",
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  background: isFocused ? "#4B4C46" : "#282828",
                  color: "white",
                }),
                multiValue: (base) => ({
                  ...base,
                  background: "#4B4C46",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#D4BC6D",
                }),
              }}
            />
          </div>

          {/* Current Image Preview */}
          {product.image && (
            <div>
              <label className="block text-white font-medium mb-2">
                Current Image
              </label>
              <div className="w-32 h-32 bg-[#282828] rounded-lg overflow-hidden">
                <img
                  src={`https://hometown.eagleeblaze.com/storage/app/public/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* New Image Upload */}
          <div>
            <label className="block text-white font-medium mb-2">
              {product.image ? "Replace Image" : "Product Image"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-3 bg-[#282828] border border-[#4B4C46] rounded-lg text-white focus:border-[#D4BC6D] outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#4B4C46] text-white rounded-lg hover:bg-[#5a5b54] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-6 py-3 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#b89f4e] transition disabled:opacity-50"
            >
              {mutation.isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Product Modal
const DeleteProductModal = ({ product, onClose }) => {
  const mutation = useMutation({
    mutationFn: (id) => deleteRequest(`/admin/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
      onClose();
    },
  });

  const handleDelete = () => {
    mutation.mutate(product.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-red-400 mb-4">Delete Product</h3>
        <p className="text-white mb-6">
          Are you sure you want to delete "{product.name}"? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#4B4C46] text-white rounded-lg hover:bg-[#5a5b54] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={mutation.isLoading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

// View Product Modal
const ViewProductModal = ({ product, onClose }) => {
  // Color mapping for display
  const colorMapping = {
    black: "#000000",
    "black beauty": "#1C1C1C",
    white: "#FFFFFF",
    "light gray": "#D3D3D3",
    "dark gray": "#A9A9A9",
    "pirate gray": "#828282",
    "stone gray": "#8B8C89",
    "oat gray": "#CCC5B9",
    "carbon gray": "#545454",
    sand: "#C2B280",
    "sand color": "#C2B280",
    "milk tea": "#DDB892",
    "light apricot": "#FDD5B1",
    "honey peach": "#FFB97B",
    yellow: "#FFFF00",
    brown: "#8B4513",
    "gray camel": "#C1B6A4",
    "dark red": "#8B0000",
    "watermelon red": "#FC6C85",
    purple: "#800080",
    "purple haze": "#9F00C5",
    blue: "#0000FF",
    "dark blue": "#000080",
    navy: "#000080",
    "colorful blue": "#3A75C4",
    "dark green": "#006400",
    "blackish green": "#1C352D",
    "gray green": "#A8B2A1",
    // legacy and fallback colors
    red: "#FF0000",
    green: "#008000",
    orange: "#FFA500",
    pink: "#FFC0CB",
    gray: "#808080",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-[#D4BC6D] mb-6">
          Product Details
        </h3>

        <div className="space-y-4">
          {product.image && (
            <div className="w-32 h-32 bg-[#282828] rounded-lg overflow-hidden">
              <img
                src={`https://hometown.eagleeblaze.com/storage/app/public/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <label className="text-[#838383] text-sm">Product Name</label>
            <p className="text-white font-medium">{product.name}</p>
          </div>

          <div>
            <label className="text-[#838383] text-sm">Description</label>
            <p className="text-white">{stripHtml(product.description)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#838383] text-sm">Price</label>
              <p className="text-[#D4BC6D] font-bold">${product.price}</p>
            </div>
            <div>
              <label className="text-[#838383] text-sm">Category</label>
              <p className="text-white">{product.category?.name || "N/A"}</p>
            </div>
          </div>

          {product.colors && (
            <div>
              <label className="text-[#838383] text-sm">Available Colors</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {(function () {
                  let colors = [];
                  if (Array.isArray(product.colors)) {
                    colors = product.colors;
                  } else if (typeof product.colors === "string") {
                    try {
                      const parsed = JSON.parse(product.colors);
                      if (Array.isArray(parsed)) colors = parsed;
                      else colors = [];
                    } catch {
                      colors = product.colors
                        .split(",")
                        .map((c) => c.trim())
                        .filter(Boolean);
                    }
                  }
                  return colors.map((color, index) => {
                    // Show real color if available, fallback to color name
                    const hex =
                      colorMapping[color.trim().toLowerCase()] || color.trim();
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-[#282828] px-3 py-2 rounded-full"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: hex }}
                        ></span>
                        <span className="text-white text-sm capitalize">
                          {color}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-[#4B4C46] text-white rounded-lg hover:bg-[#5a5b54] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuperAdminProducts;

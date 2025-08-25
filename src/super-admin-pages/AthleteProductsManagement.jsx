import React, { useState } from 'react';
import { Search, Eye, Package, ShoppingBag, Tag, Upload, Plus, X } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRequest, postRequest } from '../api';
import { queryClient } from '../main';
import { toast } from 'react-hot-toast';

const AthleteProductsManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      athleteName: 'Michael Jordan',
      productName: 'Air Jordan Signature Basketball',
      category: 'Sports Equipment',
      status: 'Pending',
      description: 'Official NBA size basketball with premium leather construction and superior grip.',
      price: '$129.99',
      colors: ['Black/Red', 'White/Black', 'All Black'],
      placement: 'Featured',
      images: ['/basketball.jpg', '/basketball-2.jpg', '/basketball-3.jpg']
    },
    {
      id: 2,
      athleteName: 'Serena Williams',
      productName: 'Pro Tennis Racket',
      category: 'Sports Equipment',
      status: 'Pending',
      description: 'Professional grade tennis racket used by tennis champions worldwide.',
      price: '$299.99',
      colors: ['Navy Blue', 'White', 'Pink'],
      placement: 'Best Seller',
      images: ['/tennis-racket.jpg', '/tennis-racket-2.jpg']
    },
    {
      id: 3,
      athleteName: 'Cristiano Ronaldo',
      productName: 'CR7 Football Boots',
      category: 'Footwear',
      status: 'Active',
      description: 'High-performance football boots designed for speed and precision on the field.',
      price: '$249.99',
      colors: ['White/Gold', 'Black/Silver', 'Red/Black'],
      placement: 'New Arrival',
      images: ['/football-boots.jpg', '/football-boots-2.jpg', '/football-boots-3.jpg']
    },
    {
      id: 4,
      athleteName: 'Katie Ledecky',
      productName: 'Pro Swimming Goggles',
      category: 'Swimming Gear',
      status: 'Inactive',
      description: 'Anti-fog swimming goggles with UV protection for competitive swimming.',
      price: '$49.99',
      colors: ['Blue', 'Clear', 'Black'],
      placement: 'Regular',
      images: ['/swimming-goggles.jpg']
    },
    {
      id: 5,
      athleteName: 'LeBron James',
      productName: 'King James Training Jersey',
      category: 'Apparel',
      status: 'Active',
      description: 'Moisture-wicking training jersey with advanced fabric technology.',
      price: '$89.99',
      colors: ['Purple/Gold', 'Black/White', 'Blue/Yellow'],
      placement: 'Featured',
      images: ['/training-jersey.jpg', '/training-jersey-2.jpg']
    },
    {
      id: 6,
      athleteName: 'Naomi Osaka',
      productName: 'Tennis Training Outfit',
      category: 'Apparel',
      status: 'Pending',
      description: 'Complete tennis training outfit designed for comfort and performance.',
      price: '$159.99',
      colors: ['Pink/White', 'Black/Purple', 'White/Blue'],
      placement: 'Regular',
      images: ['/tennis-outfit.jpg', '/tennis-outfit-2.jpg', '/tennis-outfit-3.jpg']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateAthleteModalOpen, setIsCreateAthleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImageFiles, setUploadedImageFiles] = useState([]); // Store actual File objects

  const statusTypes = ['Pending', 'Accepted',];
  const filterOptions = ['All', ...statusTypes];
  const categories = ['All', 'Sports Equipment', 'Footwear', 'Apparel', 'Swimming Gear'];

  // API Query for fetching athlete launches
  const { data: athleteProductsResponse, isLoading, error } = useQuery({
    queryKey: ['admin-athlete-products'],
    queryFn: () => getRequest('/admin/get-athletes-products'),
    onSuccess: (data) => {
      console.log('Athlete products API response:', data);
    },
    onError: (error) => {
      console.error('Error fetching athlete products:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.log('Backend error occurred, using fallback data');
    }
  });

  // Extract the actual products array from the API response
  const athleteProducts = athleteProductsResponse || [];

  // Mutation for updating product status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => {
      const formData = new FormData();
      formData.append('status', status);
      return postRequest(`/admin/update-status-product/${id}`, formData, true);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['admin-athlete-products']);
      toast.success(res?.message || 'Status updated successfully');
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  });

  // Mutation for viewing athlete product details
  const viewProductMutation = useMutation({
    mutationFn: (id) => getRequest(`/admin/view-athlete-product/${id}`),
    onSuccess: (res) => {
      console.log('Product details fetched:', res);
      // Update selected product with API data if needed
      if (res && res.data) {
        setSelectedProduct(prevProduct => ({
          ...prevProduct,
          ...res.data
        }));
      }
    },
    onError: (error) => {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
    }
  });

  // Mutation for storing product images
  const storeImagesMutation = useMutation({
    mutationFn: ({ productId, images }) => {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      return postRequest(`/admin/store-images/${productId}`, formData, true);
    },
    onSuccess: (res) => {
      console.log('Images uploaded successfully:', res);
      toast.success(res?.message || 'Images uploaded successfully');
      // Optionally refresh product data
      queryClient.invalidateQueries(['admin-athlete-products']);
      // Clear uploaded images after successful save
      setUploadedImages([]);
      setUploadedImageFiles([]);
      // Close the modal and navigate back to athlete products management
      setIsViewModalOpen(false);
      setSelectedProduct(null);
    },
    onError: (error) => {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    }
  });

  // Use API data if available, otherwise fallback to static data
  const displayProducts = athleteProducts || products;

  // Filter products based on search term and status
  const filteredProducts = displayProducts.filter(product => {
    const matchesSearch =
      product.athleteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && typeof product.category === 'string' && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.athlete?.athlete_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const productStatus = product.status?.charAt(0).toUpperCase() + product.status?.slice(1).toLowerCase();
    const matchesStatus = selectedStatus === 'All' || productStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (productId, newStatus) => {
    // Update local state immediately for better UX
    setProducts(products.map(product =>
      product.id === productId ? { ...product, status: newStatus?.toLowerCase() } : product
    ));

    // Call API to update status
    updateStatusMutation.mutate({ id: productId, status: newStatus });
  };

  const getStatusBadgeClass = (status) => {
    const normalizedStatus = status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase();
    switch (normalizedStatus) {
      case 'Active':
        return 'bg-green-600 text-white';
      case 'Inactive':
        return 'bg-gray-600 text-white';
      case 'Pending':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setUploadedImages([]); // Start with empty array for demo purposes
    setUploadedImageFiles([]); // Clear file objects as well
    setIsViewModalOpen(true);

    // Fetch detailed product information
    viewProductMutation.mutate(product.id);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newImages]);
    setUploadedImageFiles([...uploadedImageFiles, ...files]); // Store actual File objects
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    setUploadedImageFiles(uploadedImageFiles.filter((_, i) => i !== index)); // Remove corresponding file
  };

  const handleSaveImages = () => {
    if (!selectedProduct?.id) {
      toast.error('No product selected');
      return;
    }

    if (uploadedImageFiles.length === 0) {
      toast.error('No images to save');
      return;
    }

    storeImagesMutation.mutate({
      productId: selectedProduct.id,
      images: uploadedImageFiles
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Athlete Launch</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage athlete product launches and service rollouts</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-8 mb-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4BC6D]"></div>
              <span className="ml-3 text-gray-400">Loading athlete launches...</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Products</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{displayProducts.length}</p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
            </div>
          </div>

          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Pending Upload</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {displayProducts.filter(p => p.status?.toLowerCase() === 'pending').length}
                </p>
              </div>
              <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Active Products</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {displayProducts.filter(p => p.status?.toLowerCase() === 'active').length}
                </p>
              </div>
              <Tag className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] focus:border-transparent text-sm"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] focus:border-transparent text-sm min-w-[120px]"
              >
                {filterOptions.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#4B4C46]">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Storefront Name
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Product Name
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Service Type
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#4B4C46] hover:bg-[#2a2a2a] transition-colors">
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="text-white font-medium text-xs sm:text-sm">
                        {product.athleteName || product.athlete?.athlete_name || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="text-[#D4BC6D] font-medium text-xs sm:text-sm">
                        {product.productName || product.name || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="text-gray-300 text-xs sm:text-sm">
                        {product.category?.name || product.category || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <select
                        value={product.status?.charAt(0).toUpperCase() + product.status?.slice(1).toLowerCase() || 'Pending'}
                        onChange={(e) => handleStatusChange(product.id, e.target.value.toLowerCase())}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium cursor-pointer border-0 ${getStatusBadgeClass(product.status)}`}
                        disabled={updateStatusMutation.isLoading}
                      >
                        {statusTypes.map(status => (
                          <option key={status} value={status} className="bg-[#1a1a1a] text-white">
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="p-1 sm:p-2 text-blue-400 hover:text-blue-300 transition-colors"
                          title="View Details"
                          disabled={viewProductMutation.isLoading}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-sm sm:text-base">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* View Product Modal */}
      {isViewModalOpen && selectedProduct && (
        <ProductViewModal
          product={selectedProduct}
          uploadedImages={uploadedImages}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          onSaveImages={handleSaveImages}
          isLoadingDetails={viewProductMutation.isLoading}
          isSavingImages={storeImagesMutation.isLoading}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedProduct(null);
            setUploadedImages([]);
            setUploadedImageFiles([]);
          }}
        />
      )}
    </div>
  );
};

// Product View Modal Component
const ProductViewModal = ({ product, uploadedImages, onImageUpload, onRemoveImage, onSaveImages, onClose, isLoadingDetails, isSavingImages }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {isLoadingDetails && (
          <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-8 mb-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D4BC6D]"></div>
              <span className="ml-3 text-gray-400">Loading product details...</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Product Information */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Product Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Athlete Name</label>
                  <p className="text-white font-medium">{product.athleteName || product.athlete?.athlete_name || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Product Name</label>
                  <p className="text-[#D4BC6D] font-medium">{product.productName || product.name || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Category</label>
                  <p className="text-white">{product.category?.name || product.category || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Status</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status?.toLowerCase() === 'active' ? 'bg-green-600 text-white' :
                    product.status?.toLowerCase() === 'inactive' ? 'bg-gray-600 text-white' :
                      product.status?.toLowerCase() === 'pending' ? 'bg-yellow-600 text-white' :
                        'bg-gray-600 text-white'
                    }`}>
                    {product.status?.charAt(0).toUpperCase() + product.status?.slice(1).toLowerCase() || 'N/A'}
                  </span>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Description</label>
                  <p className="text-gray-300 text-sm leading-relaxed">{product.description || 'No description available'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Price</label>
                    <p className="text-green-400 font-bold text-lg">{product.price || 'N/A'}</p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Placement</label>
                    <p className="text-yellow-400 font-medium">{product.placement || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Available Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      let colors = [];

                      // Handle API colors format (JSON string)
                      if (product.colors && typeof product.colors === 'string') {
                        try {
                          // The API returns colors as a JSON string
                          const parsedColors = JSON.parse(product.colors);
                          colors = Array.isArray(parsedColors) ? parsedColors : [];
                        } catch (e) {
                          console.warn('Failed to parse colors:', product.colors);
                          colors = [];
                        }
                      }
                      // Handle fallback colors format (array)
                      else if (Array.isArray(product.colors)) {
                        colors = product.colors;
                      }

                      // Color mapping for proper hex values
                      const colorMapping = {
                        black: "#000000",
                        white: "#FFFFFF",
                        red: "#FF0000",
                        blue: "#0000FF",
                        green: "#008000",
                        yellow: "#FFFF00",
                        purple: "#800080",
                        orange: "#FFA500",
                        pink: "#FFC0CB",
                        gray: "#808080",
                        grey: "#808080",
                        brown: "#A52A2A",
                        navy: "#000080",
                        gold: "#FFD700",
                        silver: "#C0C0C0",
                      };

                      return colors.length > 0 ? (
                        colors.map((color, index) => {
                          const normalizedColor = color.toLowerCase().trim();
                          const hexColor = colorMapping[normalizedColor] || color;
                          
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-1 bg-[#4B4C46] text-white text-sm rounded-full border border-[#6B6C66]"
                            >
                              <span
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: hexColor }}
                                title={color}
                              ></span>
                              <span className="capitalize">{color}</span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 text-sm">No colors available</span>
                      );
                    })()}
                  </div>
                  <label className="block text-gray-400 text-sm mb-2 mt-4">Warnings</label>
                  <div className="bg-[#4B4C46] border border-[#6B6C66] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">{product?.warnings || "No warnings available"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Image Management */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Product Images</h3>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#C4AC5D] transition-colors text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    Upload Images
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-[#4B4C46] rounded-lg overflow-hidden border border-[#6B6C66]">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-[#D4BC6D] to-[#57430D] flex items-center justify-center" style={{ display: 'none' }}>
                        <Package className="h-8 w-8 text-white opacity-50" />
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                {/* Add More Images Placeholder */}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                  />
                  <div className="aspect-square border-2 border-dashed border-[#4B4C46] rounded-lg flex flex-col items-center justify-center hover:border-[#D4BC6D] transition-colors group">
                    <Plus className="h-8 w-8 text-[#4B4C46] group-hover:text-[#D4BC6D] mb-2" />
                    <span className="text-xs text-[#4B4C46] group-hover:text-[#D4BC6D] text-center">
                      Add More<br />Images
                    </span>
                  </div>
                </label>
              </div>

              <div className="mt-4 p-3 bg-[#2a2a2a] border border-[#4B4C46] rounded-lg">
                <p className="text-gray-400 text-xs">
                  <strong>Note:</strong> You can upload multiple images. Recommended size: 800x800px. Supported formats: JPG, PNG, WEBP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#4B4C46]">
          <button
            onClick={onSaveImages}
            disabled={isSavingImages || uploadedImages.length === 0}
            className="flex-1 px-6 py-3 bg-[#D4BC6D] text-black font-medium rounded-lg hover:bg-[#C4AC5D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSavingImages ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Saving Images...
              </>
            ) : (
              `Save Images ${uploadedImages.length > 0 ? `(${uploadedImages.length})` : ''}`
            )}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-[#4B4C46] text-white font-medium rounded-lg hover:bg-[#5B5C56] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Create Athlete Modal Component
const CreateAthleteModal = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    referral_code: '',
    age: '',
    gender: 'Male',
    country: '',
    city: '',
    level_of_athlete: 'Intermediate',
    grand_level: 'National',
    team_name: '',
    team_email: '',
    team_email_2: '',
    director_info: '',
    coach_info: '',
    school_name: '',
    school_email: '',
    school_phone: '',
    instagram: '',
    tiktok: '',
    twitter: '',
    youtube: '',
    twitch: '',
    other: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-4 sm:p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Create New Athlete</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">Personal Information</h3>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Referral Code</label>
                <input
                  type="text"
                  name="referral_code"
                  value={formData.referral_code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>
            </div>

            {/* Athletic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">Athletic Information</h3>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Level of Athlete</label>
                <select
                  name="level_of_athlete"
                  value={formData.level_of_athlete}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Grand Level</label>
                <select
                  name="grand_level"
                  value={formData.grand_level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                >
                  <option value="Local">Local</option>
                  <option value="Regional">Regional</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Team Name</label>
                <input
                  type="text"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Team Email</label>
                <input
                  type="email"
                  name="team_email"
                  value={formData.team_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Team Email 2</label>
                <input
                  type="email"
                  name="team_email_2"
                  value={formData.team_email_2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Director Info</label>
                <input
                  type="text"
                  name="director_info"
                  value={formData.director_info}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Coach Info</label>
                <input
                  type="text"
                  name="coach_info"
                  value={formData.coach_info}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>
            </div>

            {/* School Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">School Information</h3>

              <div>
                <label className="block text-gray-400 text-sm mb-2">School Name</label>
                <input
                  type="text"
                  name="school_name"
                  value={formData.school_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">School Email</label>
                <input
                  type="email"
                  name="school_email"
                  value={formData.school_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">School Phone</label>
                <input
                  type="tel"
                  name="school_phone"
                  value={formData.school_phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">Social Media</h3>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">TikTok</label>
                <input
                  type="url"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">YouTube</label>
                <input
                  type="url"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Twitch</label>
                <input
                  type="url"
                  name="twitch"
                  value={formData.twitch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Other</label>
                <textarea
                  name="other"
                  value={formData.other}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] resize-none"
                  placeholder="Other social media or additional information"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#4B4C46]">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#D4BC6D] text-black font-medium rounded-lg hover:bg-[#C4AC5D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Athlete'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#4B4C46] text-white font-medium rounded-lg hover:bg-[#5B5C56] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AthleteProductsManagement;

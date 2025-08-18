import React, { useState } from 'react';
import { Search, Eye, Package, ShoppingBag, Tag, Upload, Plus, X } from 'lucide-react';

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
      status: 'Completed',
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
      status: 'Shipped',
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
      status: 'Completed',
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const statusTypes = ['Pending', 'Completed', 'Shipped'];
  const filterOptions = ['All', ...statusTypes];
  const categories = ['All', 'Sports Equipment', 'Footwear', 'Apparel', 'Swimming Gear'];

  // Filter products based on search term and status
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (productId, newStatus) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white';
      case 'Shipped':
        return 'bg-gray-600 text-white';
      case 'Pending':
        return 'bg-yellow-600 text-white';
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setUploadedImages([]); // Start with empty array for demo purposes
    setIsViewModalOpen(true);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Athlete Products Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage athlete products, categories and placements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Products</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{products.length}</p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Pending Products</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {products.filter(p => p.status === 'Pending').length}
                </p>
              </div>
              <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Categories</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {new Set(products.map(p => p.category)).size}
                </p>
              </div>
              <Tag className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
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
                    Athlete Name
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Product Name
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-xs sm:text-sm">
                    Category
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
                        {product.athleteName}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="text-[#D4BC6D] font-medium text-xs sm:text-sm">
                        {product.productName}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="text-gray-300 text-xs sm:text-sm">
                        {product.category}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product.id, e.target.value)}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium cursor-pointer border-0 ${getStatusBadgeClass(product.status)}`}
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
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedProduct(null);
            setUploadedImages([]);
          }}
        />
      )}
    </div>
  );
};

// Product View Modal Component
const ProductViewModal = ({ product, uploadedImages, onImageUpload, onRemoveImage, onClose }) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Product Information */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Product Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Athlete Name</label>
                  <p className="text-white font-medium">{product.athleteName}</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Product Name</label>
                  <p className="text-[#D4BC6D] font-medium">{product.productName}</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Category</label>
                  <p className="text-white">{product.category}</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Description</label>
                  <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Price</label>
                    <p className="text-green-400 font-bold text-lg">{product.price}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Placement</label>
                    <p className="text-yellow-400 font-medium">{product.placement}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Available Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#4B4C46] text-white text-sm rounded-full border border-[#6B6C66]"
                      >
                        {color}
                      </span>
                    ))}
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
          <button className="flex-1 px-6 py-3 bg-[#D4BC6D] text-black font-medium rounded-lg hover:bg-[#C4AC5D] transition-colors">
            Save Changes
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

export default AthleteProductsManagement;

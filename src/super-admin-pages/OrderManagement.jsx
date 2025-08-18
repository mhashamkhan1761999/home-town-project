import React, { useState } from 'react';
import { Search, Eye, Package, DollarSign, ShoppingCart, MapPin, Plus } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main Street',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
      totalPrice: 299.99,
      status: 'Pending',
      orderItems: [
        { id: 1, productName: 'Athletic Jersey', price: 89.99, qty: 2 },
        { id: 2, productName: 'Sports Cap', price: 29.99, qty: 1 },
        { id: 3, productName: 'Training Shoes', price: 179.99, qty: 1 }
      ]
    },
    {
      id: 'ORD-002',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      postalCode: '90210',
      country: 'United States',
      totalPrice: 159.99,
      status: 'Processing',
      orderItems: [
        { id: 1, productName: 'Workout Gear Set', price: 129.99, qty: 1 },
        { id: 2, productName: 'Water Bottle', price: 29.99, qty: 1 }
      ]
    },
    {
      id: 'ORD-003',
      fullName: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      address: '789 Pine Road',
      city: 'Chicago',
      postalCode: '60601',
      country: 'United States',
      totalPrice: 449.97,
      status: 'Shipped',
      orderItems: [
        { id: 1, productName: 'Premium Jersey', price: 149.99, qty: 3 }
      ]
    },
    {
      id: 'ORD-004',
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      address: '321 Elm Street',
      city: 'Miami',
      postalCode: '33101',
      country: 'United States',
      totalPrice: 89.99,
      status: 'Delivered',
      orderItems: [
        { id: 1, productName: 'Sports Accessories', price: 89.99, qty: 1 }
      ]
    },
    {
      id: 'ORD-005',
      fullName: 'Alex Brown',
      email: 'alex.brown@example.com',
      address: '654 Maple Drive',
      city: 'Seattle',
      postalCode: '98101',
      country: 'United States',
      totalPrice: 199.98,
      status: 'Cancelled',
      orderItems: [
        { id: 1, productName: 'Training Equipment', price: 99.99, qty: 2 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusTypes = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filterOptions = ['All', ...statusTypes];

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-600 text-white';
      case 'Processing':
        return 'bg-blue-600 text-white';
      case 'Shipped':
        return 'bg-purple-600 text-white';
      case 'Delivered':
        return 'bg-green-600 text-white';
      case 'Cancelled':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Order Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage customer orders and track order status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Pending</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {orders.filter(o => o.status === 'Pending').length}
                </p>
              </div>
              <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Processing</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {orders.filter(o => o.status === 'Processing').length}
                </p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Delivered</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {orders.filter(o => o.status === 'Delivered').length}
                </p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  ${orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
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
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4BC6D] text-sm"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D] text-sm"
              >
                {filterOptions.map(status => (
                  <option key={status} value={status} className="bg-[#1a1a1a]">
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <table className="w-full">
                <thead className="bg-[#1a1a1a] border-b border-[#4B4C46]">
                  <tr>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4B4C46]">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-medium text-[#D4BC6D]">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-medium text-white">
                          {order.fullName}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-300">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-medium text-[#D4BC6D]">
                          ${order.totalPrice.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] ${getStatusColor(order.status)}`}
                        >
                          {statusTypes.map(status => (
                            <option key={status} value={status} className="bg-[#1a1a1a] text-white">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-400 hover:text-[#D4BC6D] transition-colors"
                          title="View Order"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No orders found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* View Order Modal */}
      {isViewModalOpen && selectedOrder && (
        <ViewOrderModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

// View Order Modal
const ViewOrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-600 text-white';
      case 'Processing':
        return 'bg-blue-600 text-white';
      case 'Shipped':
        return 'bg-purple-600 text-white';
      case 'Delivered':
        return 'bg-green-600 text-white';
      case 'Cancelled':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-4 sm:p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Order Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Order Information</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Order ID</label>
                <p className="text-[#D4BC6D] font-medium">{order.id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <p className="text-white">{order.fullName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <p className="text-white">{order.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Total Price</label>
                <p className="text-[#D4BC6D] font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Shipping Information</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                <p className="text-white">{order.address}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                <p className="text-white">{order.city}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Postal Code</label>
                <p className="text-white">{order.postalCode}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                <p className="text-white">{order.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
          
          <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#282828] border-b border-[#4B4C46]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4B4C46]">
                  {order.orderItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#282828] transition-colors">
                      <td className="px-4 py-3 text-sm text-white">
                        {item.productName}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#D4BC6D]">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {item.qty}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#D4BC6D] font-medium">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#282828] border-t border-[#4B4C46]">
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-400 text-right">
                      Total Amount:
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-[#D4BC6D]">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

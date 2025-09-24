import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Eye, Package, Search, Filter } from 'lucide-react';

const Orders = () => {
  const user = useSelector((state) => state.authenticate.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Hardcoded orders data for current athlete
  const orders = [
    {
      id: 'ORD-001',
      full_name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main Street',
      city: 'New York',
      postal_code: '10001',
      country: 'United States',
      total_price: 299.99,
      status: 'Pending',
      items: [
        { 
          id: 1, 
          product: { 
            name: 'Athletic Jersey', 
            category: { name: 'Clothing' },
            athlete: { id: user?.id, name: user?.athlete_name }
          }, 
          price: 89.99, 
          qty: 2 
        },
        { 
          id: 2, 
          product: { 
            name: 'Sports Cap', 
            category: { name: 'Accessories' },
            athlete: { id: user?.id, name: user?.athlete_name }
          }, 
          price: 29.99, 
          qty: 1 
        }
      ]
    },
    {
      id: 'ORD-002',
      full_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      postal_code: '90210',
      country: 'United States',
      total_price: 159.99,
      status: 'Sent',
      items: [
        { 
          id: 1, 
          product: { 
            name: 'Training Shoes', 
            category: { name: 'Footwear' },
            athlete: { id: user?.id, name: user?.athlete_name }
          }, 
          price: 159.99, 
          qty: 1 
        }
      ]
    },
    {
      id: 'ORD-003',
      full_name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      address: '789 Pine Road',
      city: 'Chicago',
      postal_code: '60601',
      country: 'United States',
      total_price: 449.97,
      status: 'Sent',
      items: [
        { 
          id: 1, 
          product: { 
            name: 'Premium Jersey', 
            category: { name: 'Clothing' },
            athlete: { id: user?.id, name: user?.athlete_name }
          }, 
          price: 149.99, 
          qty: 3 
        }
      ]
    },
    {
      id: 'ORD-004',
      full_name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      address: '321 Elm Street',
      city: 'Miami',
      postal_code: '33101',
      country: 'United States',
      total_price: 89.99,
      status: 'Return Request',
      items: [
        { 
          id: 1, 
          product: { 
            name: 'Sports Accessories Set', 
            category: { name: 'Accessories' },
            athlete: { id: user?.id, name: user?.athlete_name }
          }, 
          price: 89.99, 
          qty: 1 
        }
      ]
    },
    {
      id: 'ORD-005',
      full_name: 'Alex Brown',
      email: 'alex.brown@example.com',
      address: '654 Maple Drive',
      city: 'Seattle',
      postal_code: '98101',
      country: 'United States',
      total_price: 199.98,
      status: 'Pending',
      items: [
        { 
          id: 1, 
          product: { 
            name: 'Training Equipment', 
            category: { name: 'Equipment' },
            athlete: { id: user?.id, name: user?.athlete_name }
          }, 
          price: 99.99, 
          qty: 2 
        }
      ]
    }
  ];

  const isLoading = false;

  const statusTypes = ['Pending', 'Sent', 'Return Request'];
  const filterOptions = ['All', ...statusTypes];

  // Filter orders based on search term and status
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order?.id?.toString().includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'All' || order?.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Sent':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Return Request':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const calculateProfit = (totalPrice) => {
    // Hardcoded profit calculation (30% of total price for now)
    return (parseFloat(totalPrice) * 0.3).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#D4BC6D] text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="px-1 sm:px-3 lg:px-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-[#838383] text-sm sm:text-base">
          Track and manage your customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="w-full card-gradient border-[1.5px] py-4 px-6 rounded-3xl mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#838383] w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full bg-[#1a1a1a] border border-[#323232] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#D4BC6D]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-[#838383] w-4 h-4" />
              <select
                className="bg-[#1a1a1a] border border-[#323232] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4BC6D]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {filterOptions.map(status => (
                  <option key={status} value={status} className="bg-[#1a1a1a]">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-sm text-[#838383]">
              Total: {filteredOrders.length} orders
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="w-full card-gradient border-[1.5px] py-4 px-6 rounded-3xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] max-h-[600px] overflow-y-auto">
            <table className="w-full bg-transparent border-0 rounded-lg shadow-sm">
              <thead className="sticky top-0 bg-[rgba(0,0,0,0.9)] z-10">
                <tr className="text-left text-xs sm:text-sm font-bold text-[#838383]">
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    ORDER ID
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    CUSTOMER
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    PRODUCTS
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    CATEGORY
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    TOTAL PRICE
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    PROFIT
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    STATUS
                  </th>
                  <th className="px-4 py-4 border-b border-[#323232] whitespace-nowrap">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody className="text-xs sm:text-sm text-gray-600">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                      <td className="px-4 py-4 border-b border-[#323232]">
                        <div className="text-[#D4BC6D] font-bold text-xs sm:text-sm">
                          #{order.id}
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <div>
                          <div className="text-[#D4BC6D] font-bold text-xs sm:text-sm">
                            {order.full_name}
                          </div>
                          <div className="text-[#838383] text-xs">
                            {order.email}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <div className="flex items-center gap-2">
                          <Package className="text-[#D4BC6D] w-4 h-4" />
                          <div>
                            <div className="text-[#D4BC6D] font-bold text-xs sm:text-sm">
                              {order.items?.filter(item => item?.product?.athlete?.id === user?.id).length} items
                            </div>
                            <div className="text-[#838383] text-xs">
                              {order.items?.filter(item => item?.product?.athlete?.id === user?.id)
                                .slice(0, 2).map(item => item.product?.name).join(', ')}
                              {order.items?.filter(item => item?.product?.athlete?.id === user?.id).length > 2 && '...'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <div className="text-[#D4BC6D] font-bold text-xs sm:text-sm">
                          {order.items?.find(item => item?.product?.athlete?.id === user?.id)?.product?.category?.name || 'N/A'}
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <div className="text-[#D4BC6D] font-bold text-xs sm:text-sm">
                          ${parseFloat(order.total_price || 0).toFixed(2)}
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <div className="text-green-400 font-bold text-xs sm:text-sm">
                          ${calculateProfit(order.total_price || 0)}
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 border-b border-[#323232]">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="bg-[#D4BC6D] hover:bg-[#c2a851] text-black p-2 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      {searchTerm || selectedStatus !== 'All' ? 'No orders found matching your criteria' : 'No orders yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Order Modal */}
      {isViewModalOpen && selectedOrder && (
        <ViewOrderModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          order={selectedOrder}
          currentAthleteId={user?.id}
        />
      )}
    </div>
  );
};

// View Order Modal Component
const ViewOrderModal = ({ isOpen, onClose, order, currentAthleteId }) => {
  if (!isOpen) return null;

  // Filter items to show only those belonging to current athlete
  const athleteItems = order.items?.filter(item => item?.product?.athlete?.id === currentAthleteId) || [];
  const athleteTotal = athleteItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-black card-gradient border-[1.5px] rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#838383] mb-2">Order ID</h3>
              <p className="text-[#D4BC6D] font-bold">#{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#838383] mb-2">Status</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                order.status === 'Sent' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>
            <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2">
              <p className="text-[#D4BC6D] font-bold">{order.full_name}</p>
              <p className="text-[#838383] text-sm">{order.email}</p>
              <p className="text-[#838383] text-sm">
                {order.address}, {order.city}, {order.postal_code}
              </p>
              <p className="text-[#838383] text-sm">{order.country}</p>
            </div>
          </div>

          {/* Your Products */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Your Products in this Order</h3>
            <div className="space-y-3">
              {athleteItems.map((item, index) => (
                <div key={index} className="bg-[#1a1a1a] rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                      <Package className="text-[#D4BC6D] w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[#D4BC6D] font-bold text-sm">{item.product?.name}</p>
                      <p className="text-[#838383] text-xs">{item.product?.category?.name}</p>
                      <p className="text-[#838383] text-xs">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D4BC6D] font-bold">${parseFloat(item.price).toFixed(2)}</p>
                    <p className="text-[#838383] text-xs">each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-[#323232] pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#838383]">Your Items Total:</span>
              <span className="text-[#D4BC6D] font-bold">${athleteTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#838383]">Your Estimated Profit:</span>
              <span className="text-green-400 font-bold">${(athleteTotal * 0.3).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
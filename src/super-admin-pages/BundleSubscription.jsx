import React, { useState, useEffect } from 'react';
import { Eye, Search, Filter, Package, User, Calendar, DollarSign } from 'lucide-react';
import { getRequest } from '../api';

const BundleSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  // Fetch bundle subscriptions
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getRequest('/admin/get-bundle-subscription');
      const reversed = response.reverse();
      setSubscriptions(reversed);
    } catch (err) {
      console.error('Error fetching bundle subscriptions:', err);
      setError('Failed to fetch bundle subscriptions');
    } finally {
      setLoading(false);
    }
  };



  // Fetch subscription details
  const fetchSubscriptionDetails = async (id) => {
    try {
      setModalLoading(true);
      const response = await getRequest(`/admin/view-bundle-subscription/${id}`);
      setSelectedSubscription(response);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching subscription details:', err);
      setError('Failed to fetch subscription details');
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Debug modal state
  // useEffect(() => {
  //   console.log('Modal State - showModal:', showModal, 'selectedSubscription:', selectedSubscription);
  // }, [showModal, selectedSubscription]);

  // Filter subscriptions based on search term
  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription?.user?.athlete_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription?.package?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate stats
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.package?.price || 0), 0);
  const uniqueAthletes = new Set(subscriptions.map(sub => sub.user_id)).size;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#D4AF37]/20 bg-black/50">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                Bundle Subscriptions
              </h1>
              <p className="mt-2 text-gray-400">
                Manage and monitor bundle subscription purchases
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by athlete name or package..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                <Package className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total Subscriptions</p>
                <p className="text-2xl font-bold text-white">{subscriptions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Unique Athletes</p>
                <p className="text-2xl font-bold text-white">{uniqueAthletes}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-white">
                  {subscriptions.filter(sub => {
                    const subDate = new Date(sub.created_at);
                    const now = new Date();
                    return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions Table */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchSubscriptions}
              className="mt-4 px-4 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#D4AF37]/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Package Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Athlete Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Purchase Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Price
                    </th>
                    {/* <th className="px-6 py-4 text-left text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Content Status
                    </th> */}
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/10">
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-[#D4AF37]/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {subscription.package?.title || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-400">
                            {subscription.package?.graphic || 0} Graphics
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={subscription.user?.profile_picture_url || '/default.jpg'}
                              alt=""
                              onError={(e) => {
                                e.target.src = '/default.jpg';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {subscription.user?.athlete_name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-400">
                              {subscription.user?.email || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(subscription.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#D4AF37]">
                          ${subscription.package?.price || '0'}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscription.content && subscription.content.some(item => item !== null)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {subscription.content && subscription.content.some(item => item !== null)
                            ? 'Submitted'
                            : 'Pending'
                          }
                        </span>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => fetchSubscriptionDetails(subscription.id)}
                          disabled={modalLoading}
                          className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors disabled:opacity-50 flex items-center space-x-1"
                        >
                          <Eye className="w-5 h-5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {filteredSubscriptions.map((subscription) => (
                <div key={subscription.id} className="p-6 border-b border-[#D4AF37]/10 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={subscription.user?.profile_picture_url || '/default.jpg'}
                        alt=""
                        onError={(e) => {
                          e.target.src = '/default.jpg';
                        }}
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {subscription.user?.athlete_name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-400">
                          {subscription.user?.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => fetchSubscriptionDetails(subscription.id)}
                      disabled={modalLoading}
                      className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors disabled:opacity-50"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Package:</span>
                      <span className="text-sm text-white">{subscription.package?.title || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Price:</span>
                      <span className="text-sm text-[#D4AF37]">${subscription.package?.price || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Purchase Date:</span>
                      <span className="text-sm text-white">{formatDate(subscription.created_at)}</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Status:</span>
                      <span className={`text-sm ${
                        subscription.content && subscription.content.some(item => item !== null)
                          ? 'text-green-400'
                          : 'text-yellow-400'
                      }`}>
                        {subscription.content && subscription.content.some(item => item !== null)
                          ? 'Submitted'
                          : 'Pending'
                        }
                      </span>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>

            {filteredSubscriptions.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No bundle subscriptions found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Modal */}
      {showModal && selectedSubscription && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" 
          style={{ zIndex: 9999 }}
        >
          <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#D4AF37]">Bundle Subscription Details</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">ID: #{selectedSubscription.id}</span>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-8">
              {/* User Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-[#D4AF37]" />
                  Athlete Information
                </h4>
                <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <img
                      className="h-20 w-20 rounded-full object-cover border-2 border-[#D4AF37]/20"
                      src={selectedSubscription.user?.profile_picture_url || '/default.jpg'}
                      alt=""
                      onError={(e) => {
                        e.target.src = '/default.jpg';
                      }}
                    />
                    <div className="ml-6">
                      <h5 className="text-xl font-medium text-white">
                        {selectedSubscription.user?.athlete_name || 'N/A'}
                      </h5>
                      <p className="text-gray-400 mb-1">{selectedSubscription.user?.email || 'N/A'}</p>
                      {selectedSubscription.user?.badge_level && (
                        <div className="flex items-center mt-2">
                          <img
                            className="h-6 w-6 object-contain mr-2"
                            src={selectedSubscription.user.badge_level.image}
                            alt={selectedSubscription.user.badge_level.name}
                          />
                          <span className="text-sm text-[#D4AF37]">
                            {selectedSubscription.user.badge_level.name} Level
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Phone:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Sport:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.sport || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Country:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.country || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">City:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.city || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Level:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.level_of_athlete || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Team Name:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.team_name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Age:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.age || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Gender:</p>
                      <p className="text-white font-medium capitalize">{selectedSubscription.user?.gender || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">School:</p>
                      <p className="text-white font-medium">{selectedSubscription.user?.school_name || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#D4AF37]" />
                  Package Information
                </h4>
                <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-400">Package Title:</p>
                      <p className="text-white font-medium text-lg">{selectedSubscription.package?.title || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Price:</p>
                      <p className="text-[#D4AF37] font-bold text-2xl">${selectedSubscription.package?.price || '0'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-400">Description:</p>
                      <p className="text-white font-medium">{selectedSubscription.package?.description || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Graphics Count:</p>
                      <p className="text-white font-medium">{selectedSubscription.package?.graphic || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Purchase Date:</p>
                      <p className="text-white font-medium">{formatDate(selectedSubscription.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Information */}
              {/* <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-[#D4AF37]" />
                  Content Details
                </h4>
                <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-lg p-6">
                  {selectedSubscription.content && selectedSubscription.content.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Submitted Content:</p>
                        <span className="text-sm text-green-400 font-medium">
                          {selectedSubscription.content.filter(item => item !== null).length} / {selectedSubscription.content.length} items
                        </span>
                      </div>
                      <div className="space-y-3">
                        {selectedSubscription.content.map((item, index) => (
                          <div key={index} className={`bg-[#1a1a1a] border rounded-lg p-4 ${
                            item ? 'border-green-500/20' : 'border-gray-500/20'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-400">Content #{index + 1}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                item ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {item ? 'Submitted' : 'Pending'}
                              </span>
                            </div>
                            {item ? (
                              <p className="text-white bg-[#0a0a0a] p-3 rounded border border-[#D4AF37]/10">{item}</p>
                            ) : (
                              <p className="text-gray-500 italic">No content submitted</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400">No content submitted yet</p>
                    </div>
                  )}
                </div>
              </div> */}

              {/* Additional Details */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#D4AF37]" />
                  Additional Details
                </h4>
                <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Subscription Status:</p>
                      <p className="text-white font-medium">
                        {selectedSubscription.user?.has_active_subscription ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Sales:</p>
                      <p className="text-white font-medium">${selectedSubscription.user?.total_sale || '0'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Created:</p>
                      <p className="text-white font-medium">{formatDate(selectedSubscription.user?.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Last Updated:</p>
                      <p className="text-white font-medium">{formatDate(selectedSubscription.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#D4AF37]/20">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#D4AF37]/80 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BundleSubscription;

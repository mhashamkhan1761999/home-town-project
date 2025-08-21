import React, { useState } from 'react';
import { Search, Filter, Eye, DollarSign, Upload, CheckCircle, Clock, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '../api';
import toast from 'react-hot-toast';

const ManageCashout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);
    const [selectedCashout, setSelectedCashout] = useState(null);

    const queryClient = useQueryClient();

    // API call to get cashout requests
    const { data: cashoutRequests = [], isLoading, error } = useQuery({
        queryKey: ['cashout-requests'],
        queryFn: () => getRequest('/admin/get-cashouts'),
        onSuccess: (data) => {
            console.log('Cashout requests API response:', data);
        },
        onError: (error) => {
            console.error('Error fetching cashout requests:', error);
        }
    });

    // Mutation for updating cashout status
    const updateCashoutMutation = useMutation({
        mutationFn: (data) => {
            const formData = new FormData();
            formData.append('id', data.id);
            if (data.attachment) {
                formData.append('attachment', data.attachment);
            }
            return postRequest('/admin/update-cashout', formData, true);
        },
        onSuccess: (response) => {
            console.log('Cashout update successful:', response);
            // Show success notification
            toast.success(response?.message || 'Payment confirmed successfully!');
            // Refetch the cashout requests to get updated data
            queryClient.invalidateQueries(['cashout-requests']);
        },
        onError: (error) => {
            console.error('Error updating cashout:', error);
            // Show error notification
            toast.error('Failed to confirm payment. Please try again.');
        }
    });

    // Console log the response for debugging
    React.useEffect(() => {
        if (cashoutRequests) {
            console.log('Cashout requests data structure:', cashoutRequests);
        }
    }, [cashoutRequests]);

    const statusTypes = ['All', 'Pending', 'Completed'];

    // Filter cashout requests - handle loading state
    const filteredRequests = React.useMemo(() => {
        if (!cashoutRequests || !Array.isArray(cashoutRequests)) {
            return [];
        }
        
        return cashoutRequests.filter(request => {
            // Get athlete name from the nested athlete object
            const athleteName = request.athlete?.name || request.athlete?.email || 'Unknown Athlete';
            const matchesSearch = athleteName.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Capitalize status for comparison (API returns lowercase)
            const requestStatus = request.status?.charAt(0).toUpperCase() + request.status?.slice(1);
            const matchesStatus = selectedStatus === 'All' || requestStatus === selectedStatus;
            
            return matchesSearch && matchesStatus;
        });
    }, [cashoutRequests, searchTerm, selectedStatus]);

    const handlePayNow = (cashout) => {
        setSelectedCashout(cashout);
        setIsPayModalOpen(true);
    };

    const handlePaymentComplete = (paymentData) => {
        console.log('Payment completed:', paymentData);
        
        // Call API to update cashout status
        updateCashoutMutation.mutate({
            id: selectedCashout.id,
            attachment: paymentData.attachment
        });
        
        setIsPayModalOpen(false);
        setSelectedCashout(null);
    };

    const getStatusColor = (status) => {
        // Normalize status to handle lowercase from API
        const normalizedStatus = status?.charAt(0).toUpperCase() + status?.slice(1);
        switch (normalizedStatus) {
            case 'Pending':
                return 'bg-yellow-600 text-white';
            case 'Completed':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    const totalPending = React.useMemo(() => {
        if (!cashoutRequests || !Array.isArray(cashoutRequests)) return 0;
        return cashoutRequests.filter(req => req.status?.toLowerCase() === 'pending').length;
    }, [cashoutRequests]);
    
    const totalCompleted = React.useMemo(() => {
        if (!cashoutRequests || !Array.isArray(cashoutRequests)) return 0;
        return cashoutRequests.filter(req => req.status?.toLowerCase() === 'completed').length;
    }, [cashoutRequests]);
    
    const totalAmount = React.useMemo(() => {
        if (!cashoutRequests || !Array.isArray(cashoutRequests)) return 0;
        return cashoutRequests.reduce((sum, req) => sum + (parseFloat(req.amount) || 0), 0);
    }, [cashoutRequests]);
    
    const pendingAmount = React.useMemo(() => {
        if (!cashoutRequests || !Array.isArray(cashoutRequests)) return 0;
        return cashoutRequests.filter(req => req.status?.toLowerCase() === 'pending').reduce((sum, req) => sum + (parseFloat(req.amount) || 0), 0);
    }, [cashoutRequests]);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Manage Cashout</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Review and process athlete cashout requests</p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4BC6D] mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading cashout requests...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 mb-6">
                        <p className="text-red-400">Error loading cashout requests: {error.message}</p>
                    </div>
                )}

                {/* Main Content - Only show when not loading */}
                {!isLoading && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Total Requests</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{cashoutRequests.length}</p>
                                    </div>
                                    <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
                                </div>
                            </div>

                            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Pending</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{totalPending}</p>
                                    </div>
                                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                                </div>
                            </div>

                            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Completed</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{totalCompleted}</p>
                                    </div>
                                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                                </div>
                            </div>

                            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Pending Amount</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">${pendingAmount.toLocaleString()}</p>
                                    </div>
                                    <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-6">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                                    {/* Search */}
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <input
                                            type="text"
                                            placeholder="Search by athlete name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4BC6D] text-sm"
                                        />
                                    </div>

                                    {/* Filter by Status */}
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D] text-sm min-w-[150px]"
                                    >
                                        {statusTypes.map(status => (
                                            <option key={status} value={status} className="bg-[#1a1a1a]">
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Cashout Requests Table */}
                        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <div className="min-w-[800px]">
                                    <table className="w-full">
                                        <thead className="bg-[#1a1a1a] border-b border-[#4B4C46]">
                                            <tr>
                                                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Athlete Name
                                                </th>
                                                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Amount Requested
                                                </th>
                                                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Request Date
                                                </th>
                                                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Attachment
                                                </th>
                                                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#4B4C46]">
                                            {filteredRequests.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                                        {isLoading ? 'Loading...' : 'No cashout requests found'}
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredRequests.map((request) => (
                                                    <tr key={request.id} className="hover:bg-[#1a1a1a] transition-colors">
                                                        <td className="px-3 sm:px-6 py-4">
                                                            <div className="flex items-center">
                                                                <img
                                                                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover mr-3"
                                                                    src={request.athlete?.profile_image || request.athlete?.avatar || '/default.jpg'}
                                                                    alt={request.athlete?.name || request.athlete?.email || 'Athlete'}
                                                                    onError={(e) => {
                                                                        e.target.src = '/default.jpg';
                                                                    }}
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium text-white">
                                                                        {request.athlete?.athlete_name || request.athlete?.email || 'Unknown Athlete'}
                                                                    </p>
                                                                    {request.athlete?.email && request.athlete?.athlete_name && (
                                                                        <p className="text-xs text-gray-400">
                                                                            {request.athlete.email}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-4">
                                                            <div className="text-sm text-white font-semibold">
                                                                ${parseFloat(request.amount || 0).toLocaleString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-4">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                                                {request.status?.charAt(0).toUpperCase() + request.status?.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-4">
                                                            <div className="text-sm text-gray-400">
                                                                {new Date(request.created_at).toLocaleDateString()}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {new Date(request.created_at).toLocaleTimeString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-4">
                                                            {request.attachment ? (
                                                                <button className="text-[#D4BC6D] hover:text-[#ab965d] text-sm flex items-center">
                                                                    <Eye className="h-4 w-4 mr-1" />
                                                                    View
                                                                </button>
                                                            ) : (
                                                                <span className="text-gray-500 text-sm">No attachment</span>
                                                            )}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-4">
                                                            {request.status?.toLowerCase() === 'pending' ? (
                                                                <button
                                                                    onClick={() => handlePayNow(request)}
                                                                    className="bg-[#57430D] hover:bg-[#ab965d] text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                                                >
                                                                    Pay Now
                                                                </button>
                                                            ) : (
                                                                <span className="text-green-500 text-sm font-medium">Completed</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Pay Now Modal */}
                {isPayModalOpen && selectedCashout && (
                    <PayNowModal
                        isOpen={isPayModalOpen}
                        onClose={() => {
                            setIsPayModalOpen(false);
                            setSelectedCashout(null);
                        }}
                        cashout={selectedCashout}
                        onPaymentComplete={handlePaymentComplete}
                        isUpdating={updateCashoutMutation.isPending}
                    />
                )}
            </div>
        </div>
    );
};

// Pay Now Modal Component
const PayNowModal = ({ isOpen, onClose, cashout, onPaymentComplete, isUpdating = false }) => {
    const [attachment, setAttachment] = React.useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pass the actual file to the parent component
        onPaymentComplete({
            attachment: attachment // Pass the actual file, not the URL
        });
        
        setAttachment(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#282828] card-gradient border-[1.5px] rounded-3xl p-4 sm:p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Confirm Payment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isUpdating}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="mb-6">
                    <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-400 mb-2">Payment Details</p>
                        <p className="text-white font-semibold">
                            {cashout.athlete?.name || cashout.athlete?.email || 'Unknown Athlete'}
                        </p>
                        {cashout.athlete?.email && cashout.athlete?.name && (
                            <p className="text-xs text-gray-400 mb-2">
                                {cashout.athlete.email}
                            </p>
                        )}
                        <p className="text-[#D4BC6D] text-xl font-bold">
                            ${parseFloat(cashout.amount || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            Request ID: {cashout.id}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="attachment" className="block text-sm font-medium text-white mb-2">
                            Payment Proof (Optional)
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                id="attachment"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#57430D] file:text-white hover:file:bg-[#ab965d] file:cursor-pointer"
                                disabled={isUpdating}
                            />
                        </div>
                        {attachment && (
                            <p className="text-xs text-green-400 mt-2">
                                File selected: {attachment.name}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            disabled={isUpdating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-[#57430D] text-white rounded-lg hover:bg-[#ab965d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Processing...' : 'Confirm Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageCashout;

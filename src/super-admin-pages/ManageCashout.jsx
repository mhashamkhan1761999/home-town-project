import React, { useState } from 'react';
import { Search, Filter, Eye, DollarSign, Upload, CheckCircle, Clock, X } from 'lucide-react';

const ManageCashout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);
    const [selectedCashout, setSelectedCashout] = useState(null);

    // Mock data for cashout requests
    const [cashoutRequests, setCashoutRequests] = useState([
        {
            id: 1,
            athleteName: 'John Smith',
            athleteImage: '/mark.jpeg',
            amount: 500.00,
            status: 'Pending',
            requestDate: '2025-08-20',
            attachment: null
        },
        {
            id: 2,
            athleteName: 'Sarah Johnson',
            athleteImage: '/team1.jpeg',
            amount: 1200.00,
            status: 'Completed',
            requestDate: '2025-08-18',
            attachment: '/payment-proof-2.jpg',
            completedDate: '2025-08-19'
        },
        {
            id: 3,
            athleteName: 'Mike Wilson',
            athleteImage: '/team2.jpeg',
            amount: 750.00,
            status: 'Pending',
            requestDate: '2025-08-19',
            attachment: null
        },
        {
            id: 4,
            athleteName: 'Emma Davis',
            athleteImage: '/team3.jpeg',
            amount: 320.00,
            status: 'Completed',
            requestDate: '2025-08-17',
            attachment: '/payment-proof-4.jpg',
            completedDate: '2025-08-18'
        },
        {
            id: 5,
            athleteName: 'David Brown',
            athleteImage: '/alek.jpeg',
            amount: 2500.00,
            status: 'Pending',
            requestDate: '2025-08-21',
            attachment: null
        }
    ]);

    const statusTypes = ['All', 'Pending', 'Completed'];

    // Filter cashout requests
    const filteredRequests = cashoutRequests.filter(request => {
        const matchesSearch = request.athleteName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || request.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const handlePayNow = (cashout) => {
        setSelectedCashout(cashout);
        setIsPayModalOpen(true);
    };

    const handlePaymentComplete = (paymentData) => {
        setCashoutRequests(prev => 
            prev.map(req => 
                req.id === selectedCashout.id 
                    ? { 
                        ...req, 
                        status: 'Completed', 
                        attachment: paymentData.attachment,
                        completedDate: new Date().toISOString().split('T')[0]
                    }
                    : req
            )
        );
        setIsPayModalOpen(false);
        setSelectedCashout(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-600 text-white';
            case 'Completed':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    const totalPending = cashoutRequests.filter(req => req.status === 'Pending').length;
    const totalCompleted = cashoutRequests.filter(req => req.status === 'Completed').length;
    const totalAmount = cashoutRequests.reduce((sum, req) => sum + req.amount, 0);
    const pendingAmount = cashoutRequests.filter(req => req.status === 'Pending').reduce((sum, req) => sum + req.amount, 0);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Manage Cashout</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Review and process athlete cashout requests</p>
                </div>

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
                                    {filteredRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-[#1a1a1a] transition-colors">
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#D4BC6D]">
                                                        <img
                                                            src={request.athleteImage}
                                                            alt={request.athleteName}
                                                            className="h-full w-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = '/default.jpg';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-xs sm:text-sm font-medium text-white">
                                                            {request.athleteName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-[#D4BC6D]">
                                                    ${request.amount.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <span className={`text-xs font-semibold rounded-full px-2 py-1 ${getStatusColor(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(request.requestDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                {request.attachment ? (
                                                    <button className="text-[#D4BC6D] hover:text-[#ab965d] text-sm">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500 text-sm">No attachment</span>
                                                )}
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {request.status === 'Pending' ? (
                                                    <button
                                                        onClick={() => handlePayNow(request)}
                                                        className="bg-[#57430D] hover:bg-[#ab965d] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                                    >
                                                        Pay Now
                                                    </button>
                                                ) : (
                                                    <span className="text-green-500 text-sm">
                                                        Paid on {new Date(request.completedDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {filteredRequests.length === 0 && (
                        <div className="text-center py-12">
                            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400">No cashout requests found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>

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
                />
            )}
        </div>
    );
};

// Pay Now Modal Component
const PayNowModal = ({ isOpen, onClose, cashout, onPaymentComplete }) => {
    const [attachment, setAttachment] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [dragActive, setDragActive] = React.useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setAttachment(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            onPaymentComplete({
                attachment: attachment ? `/payment-proof-${cashout.id}.jpg` : null
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const removeAttachment = () => {
        setAttachment(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Confirm Payment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Payment Details */}
                <div className="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#4B4C46]">
                    <h3 className="text-lg font-semibold text-white mb-2">Payment Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Athlete:</span>
                            <span className="text-white">{cashout.athleteName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Amount:</span>
                            <span className="text-[#D4BC6D] font-semibold">${cashout.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Request Date:</span>
                            <span className="text-white">{new Date(cashout.requestDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* File Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white mb-2">
                            Upload Payment Proof (Optional)
                        </label>
                        
                        {!attachment ? (
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                                    dragActive 
                                        ? 'border-[#D4BC6D] bg-[#1a1a1a]' 
                                        : 'border-[#4B4C46] hover:border-[#D4BC6D]'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={isSubmitting}
                                />
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-400">
                                        Drop files here or click to upload
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, PDF up to 10MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 bg-[#D4BC6D] rounded flex items-center justify-center">
                                        <Upload className="h-4 w-4 text-black" />
                                    </div>
                                    <span className="ml-3 text-sm text-white truncate">
                                        {attachment.name}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeAttachment}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-[#57430D] text-white rounded-lg hover:bg-[#ab965d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageCashout;

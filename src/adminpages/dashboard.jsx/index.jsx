import { EllipsisVertical, EyeIcon, Trash } from 'lucide-react';
import React, { useState } from 'react'
import LeafLetMap from './LeafLetMap';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postRequest, getRequest } from '../../api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const user = useSelector((state) => state.authenticate.user);
    const [isCashOutModalOpen, setIsCashOutModalOpen] = useState(false);

    // Fetch dashboard stats
    const { data: dashboardStats, isLoading: isDashboardLoading, error: dashboardError } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: () => getRequest('/get-dashboard'),
        onSuccess: (data) => {
            console.log('Dashboard stats API response:', data);
        },
        onError: (error) => {
            console.error('Error fetching dashboard stats:', error);
        }
    });

    const data = [
        {
            id: 1, name: "Bros warner", item: '600', profit: "$14,000",
            completion: '60%',
        },
        {
            id: 1, name: "Bros warner", item: '600', profit: "$14,000",
            completion: '60%',
        },
        {
            id: 1, name: "Bros warner", item: '600', profit: "$14,000",
            completion: '60%',
        },
        {
            id: 1, name: "Bros warner", item: '600', profit: "$14,000",
            completion: '60%',
        },
        {
            id: 1, name: "Bros warner", item: '600', profit: "$14,000",
            completion: '60%',
        },
    ];

    const getTierLevel = (amount) => {
        if (amount <= 250) return 16.6666666667; // Bronze
        if (amount <= 1000) return 33.3333333334; // Silver
        if (amount <= 2500) return 50.0000000001; // Gold
        if (amount <= 10000) return 66.6666666668; // Emerald
        if (amount <= 20000) return 83.3333333335; // Diamond
        if (amount > 20000) return 100; // Royal
        return 0; // No tier
    };


    return (
        <div className="px-1 sm:px-3 lg:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-8 gap-2 sm:gap-4">
                <div className="grow w-full sm:w-auto">

                    <div className='h-[35px] sm:h-[50px] w-full bg-[#282828] rounded-full relative z-[1]'>
                        <div className="h-full bg-[#D4BC6D] rounded-full absolute left-0 z-[2]" style={{ width: `${getTierLevel(user?.total_sale)}%` }} />
                        <div className="h-full w-full grid grid-cols-6 items-center overflow-hidden relative z-[2] text-center">
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[6px] sm:text-sm px-0.5'>
                                Bronze
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[6px] sm:text-sm px-0.5'>
                                Silver
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[6px] sm:text-sm px-0.5'>
                                Gold
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[6px] sm:text-sm px-0.5'>
                                Emerald
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[6px] sm:text-sm px-0.5'>
                                Diamond
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full flex items-center justify-center grow text-[6px] sm:text-sm px-0.5'>
                                Royal
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-auto flex justify-center sm:justify-end items-center">
                    <button
                        className={`text-white text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-[#57430D] hover:bg-[#ab965d] transition duration-300`}
                        type='button'
                        onClick={() => setIsCashOutModalOpen(true)}
                    >
                        Cash Out
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-full lg:w-[27.313rem] card-gradient border-[1.5px] py-2 sm:py-4 lg:py-8 px-1.5 sm:px-3 lg:px-6 rounded-3xl overflow-hidden">
                    <div className="">
                       <div className="flex justify-end items-center mb-2">
                                <div className="card-gradient border border-gray-600 rounded-full">
                                    <select
                                    className="bg-transparent text-white p-1 sm:p-1.5 lg:p-3 outline-none text-xs sm:text-sm font-bold cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(90deg, #1e1e1e, #2a2a2a)',
                                        borderRadius: '9999px',
                                    }}
                                    >
                                    <option className="bg-[#1e1e1e] text-white" value="">24 hours</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">1 week</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">3 month</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">6 month</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">1 year</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">All time</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                    <div className="flex flex-col w-full gap-2 sm:gap-3 lg:gap-6">
                        <div className="">
                            <p className='font-bold text-xs sm:text-sm lg:text-xl text-[#838383]'>
                                Total Storefront Revenue
                            </p>
                            <h1 className='text-lg sm:text-xl lg:text-[4.563rem] font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-[1]'>
                                {console.log(dashboardStats)}
                                {isDashboardLoading ? 'Loading...' : `$${dashboardStats?.total_revunue ?? '0'}`}
                            </h1>
                        </div>
                        <div className="">
                            <p className='font-bold text-xs sm:text-sm lg:text-xl text-[#838383]'>
                                Total Cashouts
                            </p>
                            <h1 className='text-lg sm:text-xl lg:text-[4.563rem] font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-[1]'>
                                {isDashboardLoading ? 'Loading...' : `$${dashboardStats?.total_cashout ?? '0'}`}
                            </h1>
                        </div>
                        <div className="">
                            <p className='font-bold text-xs sm:text-sm lg:text-xl text-[#838383]'>
                                Storefront Views
                            </p>
                            <h1 className='text-lg sm:text-xl lg:text-[4.563rem] font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-[1]'>
                                {isDashboardLoading ? 'Loading...' : `${dashboardStats?.total_views ?? '0'}`}
                            </h1>
                        </div>
                        <div className="text-center">
                            {/* <button className='py-3.5 px-11 bg-[#57430D] text-sm font-bold text-white rounded-2xl' type='button'>
                                View More
                            </button> */}
                        </div>
                    </div>

                </div>
                <div className="w-full lg:flex-1 min-w-0">
                    <div className="w-full card-gradient border-[1.5px] py-2 sm:py-4 lg:py-8 px-1.5 sm:px-3 lg:px-6 rounded-3xl overflow-hidden">
                        <div className="">
                            <div className="flex justify-end items-center mb-2">
                                    <div className="card-gradient border border-gray-600 rounded-full">
                                    <select
                                    className="bg-transparent text-white p-1 sm:p-1.5 lg:p-3 outline-none text-xs sm:text-sm font-bold cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(90deg, #1e1e1e, #2a2a2a)',
                                        borderRadius: '9999px',
                                    }}
                                    >
                                    <option className="bg-[#1e1e1e] text-white" value="">24 hours</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">1 week</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">3 month</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">6 month</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">1 year</option>
                                    <option className="bg-[#1e1e1e] text-white" value="">All time</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-3 sm:gap-4 lg:gap-9 relative z-[1] min-w-0">
                            <div className="relative z-[1] w-full min-w-0 overflow-hidden">
                                <LeafLetMap />
                            </div>
                            {/* <div className="absolute left-0 bottom-2">
                                <button className='py-3.5 px-11 bg-[#57430D] text-sm font-bold text-white rounded-2xl' type='button'>
                                    View More
                                </button>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full card-gradient border-[1.5px] py-2 sm:py-4 lg:py-8 px-1.5 sm:px-3 lg:px-6 rounded-3xl overflow-hidden">
                <div className="">
                    {/* <div className="flex justify-between items-center mb-16">
                        <p className='text-white font-bold text-base'>
                            Reviews
                        </p>
                        <div className="card-gradient border-[1.5px] px-2 rounded-full">
                            <select className=' text-white p-3 outline-0'>
                                <option value="">July 2025</option>
                                <option value="">June 2025</option>
                                <option value="">May 2025</option>
                            </select>
                        </div>
                    </div> */}
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[250px] sm:min-w-[600px] max-h-[350px] overflow-y-auto">
                            <table className="w-full bg-transparent border-0 rounded-lg shadow-sm">
                                <thead>
                                    <tr className="bg-[rgba(0,0,0,0.02)] text-left text-xs sm:text-sm font-bold text-[#838383]">
                                        <th className="px-2 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">Service Launch </th>
                                    <th className="px-2 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">Total Item Sold</th>
                                    <th className="px-2 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">TOTAL PROFITS</th>
                                    <th className="px-2 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">COMPLETION</th>
                                    <th className="px-2 sm:px-6 py-3 border-b border-[#323232] w-10 whitespace-nowrap">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm text-gray-600">
                                {data?.map((row) => (
                                    <tr key={row.id} className="hover:bg-[255,255,255,0.2]">
                                        <td className="px-2 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className="flex items-center gap-2 sm:gap-6">
                                                <div className="bg-[#D9D9D9] w-8 h-8 sm:w-[3.563rem] sm:h-[3.25rem] rounded-lg"></div>
                                                <div className='text-[#D4BC6D] font-bold'>
                                                    <div className="text-xs sm:text-sm">{row.name}</div>
                                                    <p className='text-[#838383] font-bold text-xs'>
                                                        Branded Stripe
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className='text-[#D4BC6D] font-bold text-xs sm:text-sm'>
                                                {row.item}
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className='text-[#D4BC6D] font-bold text-xs sm:text-sm'>
                                                {row.profit}
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className='text-[#D4BC6D] font-bold mb-0.5 text-xs sm:text-sm'>
                                                {row.completion}
                                            </div>
                                            <div className='h-[8px] sm:h-[10px] w-[120px] sm:w-[150px] bg-[#282828] rounded-full'>
                                                <div className="h-full bg-[#D4BC6D] rounded-full" style={{ width: row?.completion }} />
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className="flex gap-2 sm:gap-3">
                                                <Trash type='button' className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <EyeIcon type='button' className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <EllipsisVertical type='button' className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Cash Out Modal */}
            {isCashOutModalOpen && (
                <CashOutModal
                    isOpen={isCashOutModalOpen}
                    onClose={() => setIsCashOutModalOpen(false)}
                />
            )}
        </div>
    )
}

// Cash Out Modal Component
const CashOutModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = React.useState('');

    const cashOutMutation = useMutation({
        mutationFn: (data) => postRequest('/store-cashout', data),
        onSuccess: (response) => {
            console.log('Cash out request successful:', response);
            toast.success(response?.message || `Cash out request for $${amount} has been submitted successfully!`);
            setAmount('');
            onClose();
        },
        onError: (error) => {
            console.error('Cash out request failed:', error);
            toast.error('Failed to submit cash out request. Please try again.');
        }
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        if (parseFloat(amount) < 10) {
            toast.error('Minimum withdrawal amount is $10.00');
            return;
        }

        // Convert amount to number and send to API
        const amountNumber = parseFloat(amount);
        cashOutMutation.mutate({ amount: amountNumber });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#282828] card-gradient border-[1.5px] rounded-3xl p-4 sm:p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Cash Out Request</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={cashOutMutation.isPending}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-sm font-medium text-white mb-2">
                            Amount to Withdraw
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4BC6D] font-semibold">
                                $
                            </span>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="w-full pl-8 pr-4 py-3 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4BC6D] text-lg"
                                required
                                disabled={cashOutMutation.isPending}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Minimum withdrawal amount: $10.00
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            disabled={cashOutMutation.isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-[#57430D] text-white rounded-lg hover:bg-[#ab965d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cashOutMutation.isPending || !amount || parseFloat(amount) < 10}
                        >
                            {cashOutMutation.isPending ? 'Processing...' : 'Request Cash Out'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dashboard
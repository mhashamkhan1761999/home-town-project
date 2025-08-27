import { useQuery } from '@tanstack/react-query';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest } from '../../api';

const SuperAdminDashboard = () => {
    const user = useSelector((state) => state.authenticate.user);


    const { data, isLoading, error } = useQuery({
        queryKey: ['admin-dashboard'],
        queryFn: () => getRequest('/admin/get-dashboard'),
        onError: (error) => {
            console.log('Backend not available, using fallback data');
        }
    });

    console.log("SuperAdminDashboard data", data);

    // State for filter periods
    const [salesTimeFilter, setSalesTimeFilter] = useState('1week');
    const [productsTimeFilter, setProductsTimeFilter] = useState('1week');

    // Mock analytics data - replace with real API calls
    const analyticsData = {
        totalSales: 125000,
        salesGrowth: 12.5
    };

    const topProducts = [
        // { name: "Cotton T-Shirt", sales: 125, revenue: "$3,247.50" },
        // { name: "Hoodie", sales: 89, revenue: "$4,092.11" },
        // { name: "Baseball Cap", sales: 76, revenue: "$1,519.24" },
        // { name: "Jersey", sales: 54, revenue: "$3,563.46" },
        // { name: "Sweatpants", sales: 43, revenue: "$1,547.57" }
    ];

    // Hardcoded sales data for chart
    const salesData = [
        { day: 'Mon', sales: 12000, label: 'Aug 12' },
        { day: 'Tue', sales: 19000, label: 'Aug 13' },
        { day: 'Wed', sales: 15000, label: 'Aug 14' },
        { day: 'Thu', sales: 23000, label: 'Aug 15' },
        { day: 'Fri', sales: 28000, label: 'Aug 16' },
        { day: 'Sat', sales: 35000, label: 'Aug 17' },
        { day: 'Sun', sales: 31000, label: 'Aug 18' }
    ];

    const maxSales = Math.max(...salesData.map(d => d.sales));

    const timeFilterOptions = [
        { value: '1week', label: '1 Week' },
        { value: '1month', label: '1 Month' },
        { value: '3months', label: '3 Months' },
        { value: '6months', label: '6 Months' },
        { value: '1year', label: '1 Year' }
    ];

    const days = {
        0: 'monday',
        1: 'tuesday',
        2: 'wednesday',
        3: 'thursday',
        4: 'friday',
        5: 'saturday',
        6: 'sunday'
    }

    return (
        <>
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {/* Total Sales */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-xs sm:text-sm font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                            +{data?.total_sale_percentage || 12.5}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Sales</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            ${data?.total_sale}
                        </h3>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-xs sm:text-sm font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                            +{data?.total_orders_percentage || 8.3}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Orders</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {data?.total_orders.toLocaleString()}
                        </h3>
                    </div>
                </div>

                {/* Total Customers */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-xs sm:text-sm font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                            +{data?.total_customers_percentage || 15.7}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Customers</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {data?.total_customers || '1,248'}
                        </h3>
                    </div>
                </div>

                {/* Total Products */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-xs sm:text-sm font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                            +{data?.total_products_percentage || 3.2}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Products</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {data?.total_products || '89'}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Charts & Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {/* Sales Chart */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                        <h3 className="text-white font-bold text-lg">Sales Over Time</h3>
                        <select
                            className="bg-[#282828] text-white p-2 rounded-lg text-sm border border-[#4B4C46] focus:outline-none focus:border-[#D4BC6D]"
                            value={salesTimeFilter}
                            onChange={(e) => setSalesTimeFilter(e.target.value)}
                        >
                            {timeFilterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="h-48 sm:h-64 bg-[#1a1a1a] rounded-lg p-3 sm:p-4">
                        <div className="h-full flex items-end justify-between gap-2 sm:gap-3">
                            {salesData.map((datas, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center group relative">
                                    {/* Bar */}
                                    {data?.days?.[`${days?.[`${index}`]}`]}
                                    <div
                                        className="w-full bg-gradient-to-t from-[#D4BC6D] to-[#b89f4e] rounded-t-lg transition-all duration-300 hover:opacity-80 relative"
                                        style={{
                                            height: `${(data?.days?.[`${days?.[`${index}`]}`] / maxSales) * 100}%`,
                                            minHeight: `${Math.min((data?.days?.[`${days?.[`${index}`]}`] / maxSales) * 100, 90)}px`
                                        }}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                            ${datas.sales.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Day label */}
                                    <div className="mt-2 text-center">
                                        <div className="text-white text-xs sm:text-sm font-medium">{datas.day}</div>
                                        <div className="text-[#838383] text-xs hidden sm:block">{datas.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                        <h3 className="text-white font-bold text-lg">Top Selling Products</h3>
                        <select
                            className="bg-[#282828] text-white p-2 rounded-lg text-sm border border-[#4B4C46] focus:outline-none focus:border-[#D4BC6D]"
                            value={productsTimeFilter}
                            onChange={(e) => setProductsTimeFilter(e.target.value)}
                        >
                            {timeFilterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
                        {topProducts?.length > 0 ? (
                            <>
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#D4BC6D] rounded-lg flex items-center justify-center text-black font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-medium text-sm sm:text-base truncate">{product.name}</p>
                                                <p className="text-[#838383] text-xs sm:text-sm">{product.sales} sales</p>
                                            </div>
                                        </div>
                                        <p className="text-[#D4BC6D] font-bold text-sm sm:text-base ml-2">{product.revenue}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <Package className="w-12 h-12 text-[#4B4C46] mx-auto mb-3" />
                                <p className='text-[#838383] text-sm'>No products found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperAdminDashboard;
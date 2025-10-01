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

    // console.log("SuperAdminDashboard data", data);
    console.log("SuperAdminDashboard data", data);

    // Extract the actual data from the API response
    const apiData = data || {};

    // State for filter periods
    const [salesTimeFilter, setSalesTimeFilter] = useState('1week');
    const [productsTimeFilter, setProductsTimeFilter] = useState('1week');

    // Mock analytics data - replace with real API calls
    const analyticsData = {
        totalSales: 125000,
        salesGrowth: 12.5
    };

    const topProducts = apiData?.top_products || [];

    // Transform API data for chart display with robust number parsing and validation
    const parseApiValue = (value) => {
        if (value === null || value === undefined || value === '') return 0;
        const parsed = Number(value);
        return isNaN(parsed) || parsed < 0 ? 0 : parsed;
    };
    
    const salesData = [
        { day: 'Mon', sales: parseApiValue(apiData?.days?.monday) },
        { day: 'Tue', sales: parseApiValue(apiData?.days?.tuesday) },
        { day: 'Wed', sales: parseApiValue(apiData?.days?.wednesday) },
        { day: 'Thu', sales: parseApiValue(apiData?.days?.thursday) },
        { day: 'Fri', sales: parseApiValue(apiData?.days?.friday) },
        { day: 'Sat', sales: parseApiValue(apiData?.days?.saturday) },
        { day: 'Sun', sales: parseApiValue(apiData?.days?.sunday) }
    ];
    console.log("Raw API Data - days:", apiData?.days);
    console.log("Processed salesData:", salesData);

    // Calculate max sales for proportional scaling
    const allSalesValues = salesData.map(d => d.sales).filter(val => !isNaN(val) && val >= 0);
    const maxSales = allSalesValues.length > 0 ? Math.max(...allSalesValues) : 1;
    const minSales = allSalesValues.length > 0 ? Math.min(...allSalesValues) : 0;
    
    // Use maxSales for proportional calculation
    const finalMaxSales = maxSales > 0 ? maxSales : 1;
    console.log("Chart calculations - maxSales:", finalMaxSales, "minSales:", minSales, "allSalesValues:", allSalesValues);

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
                            +{apiData?.total_sale_percentage?.toLocaleString() || 0}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Sales</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            ${apiData?.total_sale?.toFixed(2) || '0.00'}
                        </h3>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Orders</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {apiData?.total_orders?.toLocaleString() || '0'}
                        </h3>
                    </div>
                </div>

                {/* Total Customers */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Customers</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {apiData?.total_customers?.toLocaleString() || '0'}
                        </h3>
                    </div>
                </div>

                {/* Total Products */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4BC6D]" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[#838383] text-xs sm:text-sm font-medium mb-1">Total Products</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {apiData?.total_products?.toLocaleString() || '0'}
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
                        {/* <select
                            className="bg-[#282828] text-white p-2 rounded-lg text-sm border border-[#4B4C46] focus:outline-none focus:border-[#D4BC6D]"
                            value={salesTimeFilter}
                            onChange={(e) => setSalesTimeFilter(e.target.value)}
                        >
                            {timeFilterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select> */}
                    </div>
                    <div className="h-48 sm:h-64 bg-[#1a1a1a] rounded-lg p-3 sm:p-4">
                        <div className="h-full flex items-end justify-between gap-2 sm:gap-3 relative">
                            {salesData.map((dayData, index) => {
                                const salesValue = dayData.sales;
                                
                                // Calculate height percentage with direct proportional scaling
                                let heightPercentage = 0;
                                
                                if (salesValue > 0 && finalMaxSales > 0) {
                                    // Simple proportional calculation: (value / max) * 100
                                    heightPercentage = (salesValue / finalMaxSales) * 100;
                                    
                                    // Ensure minimum visibility for very small values
                                    if (heightPercentage < 5) {
                                        heightPercentage = 5;
                                    }
                                } else {
                                    heightPercentage = 0;
                                }
                                
                                console.log(`${dayData.day}: sales=$${salesValue}, heightPercentage=${heightPercentage}%`);
                                
                                return (
                                    <div key={index} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                                        {/* Bar Container */}
                                        <div 
                                            className="w-full flex flex-col justify-end items-center relative"
                                            style={{ height: '100%' }}
                                        >
                                            {/* Actual Bar */}
                                            <div
                                                className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 relative ${
                                                    salesValue > 0 
                                                        ? 'bg-gradient-to-t from-[#D4BC6D] to-[#b89f4e]' 
                                                        : 'bg-gray-600'
                                                }`}
                                                style={{
                                                    height: salesValue > 0 ? `${heightPercentage}%` : '2px',
                                                    minHeight: salesValue > 0 ? '8px' : '2px'
                                                }}>

                                                {/* Tooltip */}
                                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                                    ${salesValue.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Day label */}
                                        <div className="mt-2 text-center">
                                            <div className="text-white text-xs sm:text-sm font-medium">{dayData.day}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="card-gradient border-[1.5px] border-[#4B4C46] p-4 sm:p-6 rounded-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                        <h3 className="text-white font-bold text-lg">Top Selling Products</h3>
                        {/* <select
                            className="bg-[#282828] text-white p-2 rounded-lg text-sm border border-[#4B4C46] focus:outline-none focus:border-[#D4BC6D]"
                            value={productsTimeFilter}
                            onChange={(e) => setProductsTimeFilter(e.target.value)}
                        >
                            {timeFilterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select> */}
                    </div>
                    <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
                        {topProducts?.length > 0 ? (
                            <>
                                {topProducts.map((product, index) => (
                                    <div key={product.product_id || index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#D4BC6D] rounded-lg flex items-center justify-center text-black font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-medium text-sm sm:text-base truncate">{product.name}</p>
                                                <p className="text-[#838383] text-xs sm:text-sm">{product.total_sold} sales</p>
                                            </div>
                                        </div>
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
import { DollarSign } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SuperAdminDashboard = () => {
    const user = useSelector((state) => state.authenticate.user);
    
    // State for filter periods
    const [salesTimeFilter, setSalesTimeFilter] = useState('1week');
    const [productsTimeFilter, setProductsTimeFilter] = useState('1week');

    // Mock analytics data - replace with real API calls
    const analyticsData = {
        totalSales: 125000,
        salesGrowth: 12.5
    };

    const topProducts = [
        { name: "Cotton T-Shirt", sales: 125, revenue: "$3,247.50" },
        { name: "Hoodie", sales: 89, revenue: "$4,092.11" },
        { name: "Baseball Cap", sales: 76, revenue: "$1,519.24" },
        { name: "Jersey", sales: 54, revenue: "$3,563.46" },
        { name: "Sweatpants", sales: 43, revenue: "$1,547.57" }
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

    return (
        <>
            {/* Key Metrics Cards - Only Total Sales for Super Admin */}
            <div className="gap-6 mb-8 max-w-screen">
                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <DollarSign className="w-6 h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-sm font-semibold">+{analyticsData.salesGrowth}%</span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-sm font-medium mb-1">Total Sales</p>
                        <h3 className="text-2xl font-bold text-[#D4BC6D]">${analyticsData.totalSales.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            {/* Charts & Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Sales Chart */}
                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">Sales Over Time</h3>
                        <select 
                            className="bg-[#282828] text-white p-2 rounded-lg text-sm"
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
                    <div className="h-64 bg-[#1a1a1a] rounded-lg p-4">
                        <div className="h-full flex items-end justify-between gap-3">
                            {salesData.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center group relative">
                                    {/* Bar */}
                                    <div 
                                        className="w-full bg-gradient-to-t from-[#D4BC6D] to-[#b89f4e] rounded-t-lg transition-all duration-300 hover:opacity-80 relative"
                                        style={{ 
                                            height: `${(data.sales / maxSales) * 100}%`,
                                            minHeight: `${Math.min((data.sales / maxSales) * 100, 90)}px`
                                        }}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                            ${data.sales.toLocaleString()}
                                        </div>
                                    </div>
                                    
                                    {/* Day label */}
                                    <div className="mt-2 text-center">
                                        <div className="text-white text-sm font-medium">{data.day}</div>
                                        <div className="text-[#838383] text-xs">{data.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">Top Selling Products</h3>
                        <select 
                            className="bg-[#282828] text-white p-2 rounded-lg text-sm"
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
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#D4BC6D] rounded-lg flex items-center justify-center text-black font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{product.name}</p>
                                        <p className="text-[#838383] text-sm">{product.sales} sales</p>
                                    </div>
                                </div>
                                <p className="text-[#D4BC6D] font-bold">{product.revenue}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperAdminDashboard;
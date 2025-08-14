import { EllipsisVertical, EyeIcon, Trash, TrendingUp, Users, DollarSign, Package } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

const SuperAdminDashboard = () => {
    const user = useSelector((state) => state.authenticate.user);

    // Mock analytics data - replace with real API calls
    const analyticsData = {
        totalSales: 125000,
        totalOrders: 542,
        totalCustomers: 1248,
        totalProducts: 89,
        salesGrowth: 12.5,
        ordersGrowth: 8.3,
        customersGrowth: 15.7,
        productsGrowth: 3.2
    };

    const recentOrders = [
        { id: 1, customer: "John Doe", product: "Cotton T-Shirt", amount: "$25.99", status: "completed", date: "2025-08-14" },
        { id: 2, customer: "Jane Smith", product: "Hoodie", amount: "$45.99", status: "pending", date: "2025-08-14" },
        { id: 3, customer: "Mike Johnson", product: "Baseball Cap", amount: "$19.99", status: "completed", date: "2025-08-13" },
        { id: 4, customer: "Sarah Wilson", product: "Jersey", amount: "$65.99", status: "processing", date: "2025-08-13" },
        { id: 5, customer: "Tom Brown", product: "Sweatpants", amount: "$35.99", status: "completed", date: "2025-08-12" }
    ];

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

    const getTierLevel = (amount) => {
        if (amount <= 250) return 16.6666666667; // Bronze
        if (amount <= 1000) return 33.3333333334; // Silver
        if (amount <= 2500) return 50.0000000001; // Gold
        if (amount <= 10000) return 66.6666666668; // Emerald
        if (amount <= 20000) return 83.3333333335; // Diamond
        if (amount > 20000) return 100; // Royal
        return 0; // No tier
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-400';
            case 'pending': return 'text-yellow-400';
            case 'processing': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <>
            {/* Admin Tier Progress */}
            <div className="flex items-center mb-8">
                <div className="grow">
                </div>
                <div className="w-[20%] flex justify-end items-center">
                    <button
                        className={`text-white text-lg font-medium py-3 px-6 rounded-xl bg-[#57430D] hover:bg-[#ab965d] transition duration-300`}
                        type='button'
                    >
                        Cash Out
                    </button>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <Package className="w-6 h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-sm font-semibold">+{analyticsData.ordersGrowth}%</span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-sm font-medium mb-1">Total Orders</p>
                        <h3 className="text-2xl font-bold text-[#D4BC6D]">{analyticsData.totalOrders.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <Users className="w-6 h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-sm font-semibold">+{analyticsData.customersGrowth}%</span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-sm font-medium mb-1">Total Customers</p>
                        <h3 className="text-2xl font-bold text-[#D4BC6D]">{analyticsData.totalCustomers.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#57430D] rounded-xl">
                            <TrendingUp className="w-6 h-6 text-[#D4BC6D]" />
                        </div>
                        <span className="text-green-400 text-sm font-semibold">+{analyticsData.productsGrowth}%</span>
                    </div>
                    <div>
                        <p className="text-[#838383] text-sm font-medium mb-1">Total Products</p>
                        <h3 className="text-2xl font-bold text-[#D4BC6D]">{analyticsData.totalProducts}</h3>
                    </div>
                </div>
            </div>
            {/* Charts & Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Sales Chart */}
                <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">Sales Over Time</h3>
                        <select className="bg-[#282828] text-white p-2 rounded-lg text-sm">
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 3 months</option>
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
                        <select className="bg-[#282828] text-white p-2 rounded-lg text-sm">
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
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

            {/* Recent Activity Section */}
            <div className="card-gradient border-[1.5px] p-6 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-lg">Recent Orders</h3>
                    <div className="flex gap-3">
                        <button className="bg-[#57430D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ab965d] transition">
                            View All Orders
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm font-bold text-[#838383] border-b border-[#323232]">
                                <th className="pb-3">ORDER ID</th>
                                <th className="pb-3">CUSTOMER</th>
                                <th className="pb-3">PRODUCT</th>
                                <th className="pb-3">AMOUNT</th>
                                <th className="pb-3">STATUS</th>
                                <th className="pb-3">DATE</th>
                                {/* <th className="pb-3">ACTION</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b border-[#323232] hover:bg-[rgba(255,255,255,0.02)]">
                                    <td className="py-4 text-[#D4BC6D] font-medium">#{order.id.toString().padStart(4, '0')}</td>
                                    <td className="py-4 text-white">{order.customer}</td>
                                    <td className="py-4 text-white">{order.product}</td>
                                    <td className="py-4 text-[#D4BC6D] font-bold">{order.amount}</td>
                                    <td className="py-4">
                                        <span className={`capitalize ${getStatusColor(order.status)} font-medium`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-[#838383]">{order.date}</td>
                                    {/* <td className="py-4">
                                        <div className="flex gap-2">
                                            <button className="p-1 text-[#838383] hover:text-[#D4BC6D] transition">
                                                <EyeIcon size={16} />
                                            </button>
                                            <button className="p-1 text-[#838383] hover:text-red-500 transition">
                                                <Trash size={16} />
                                            </button>
                                            <button className="p-1 text-[#838383] hover:text-[#D4BC6D] transition">
                                                <EllipsisVertical size={16} />
                                            </button>
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SuperAdminDashboard
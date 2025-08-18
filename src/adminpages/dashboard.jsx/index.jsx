import { EllipsisVertical, EyeIcon, Trash } from 'lucide-react';
import React from 'react'
import LeafLetMap from './LeafLetMap';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector((state) => state.authenticate.user);

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
        <div className="px-1 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-8 gap-2 sm:gap-4">
                <div className="grow w-full sm:w-auto">

                    <div className='h-[35px] sm:h-[50px] w-full bg-[#282828] rounded-full relative z-[1]'>
                        <div className="h-full bg-[#D4BC6D] rounded-full absolute left-0 z-[2]" style={{ width: `${getTierLevel(user?.total_sale)}%` }} />
                        <div className="h-full w-full grid grid-cols-6 items-center overflow-hidden relative z-[2] text-center">
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[7px] sm:text-sm px-0.5'>
                                Bronze
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[7px] sm:text-sm px-0.5'>
                                Silver
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[7px] sm:text-sm px-0.5'>
                                Gold
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[7px] sm:text-sm px-0.5'>
                                Emerald
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full border-r flex items-center justify-center grow text-[7px] sm:text-sm px-0.5'>
                                Diamond
                            </div>
                            <div className='text-white font-bold mb-0.5 h-full flex items-center justify-center grow text-[7px] sm:text-sm px-0.5'>
                                Royal
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-[20%] flex justify-center sm:justify-end items-center">
                    <button
                        className={`text-white text-sm sm:text-lg font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-[#57430D] hover:bg-[#ab965d] transition duration-300`}
                        type='button'
                    >
                        Cash Out
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4">
                <div className="w-full lg:w-[27.313rem] overflow-y-auto card-gradient border-[1.5px] py-4 sm:py-8 px-3 sm:px-6 rounded-3xl">
                    <div className="">
                       <div className="flex justify-end items-center mb-2">
                                <div className="card-gradient border border-gray-600 rounded-full">
                                    <select
                                    className="bg-transparent text-white p-3 outline-none text-sm font-bold cursor-pointer"
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
                    <div className="flex flex-col w-full gap-6 sm:gap-9">
                        <div className="">
                            <p className='font-bold text-sm text-[#838383]'>
                                Total Storefront Revenue
                            </p>
                            <h1 className='text-3xl sm:text-[4.563rem] font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-[1]'>
                                $3.6m
                            </h1>
                        </div>
                        <div className="">
                            <p className='font-bold text-sm text-[#838383]'>
                                Total Cashouts
                            </p>
                            <h1 className='text-3xl sm:text-[4.563rem] font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-[1]'>
                                $25k
                            </h1>
                        </div>
                        <div className="">
                            <p className='font-bold text-sm text-[#838383]'>
                                Storefront Views
                            </p>
                            <h1 className='text-3xl sm:text-[4.563rem] font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-[1]'>
                                100 k
                            </h1>
                        </div>
                        <div className="text-center">
                            {/* <button className='py-3.5 px-11 bg-[#57430D] text-sm font-bold text-white rounded-2xl' type='button'>
                                View More
                            </button> */}
                        </div>
                    </div>

                </div>
                <div className="grow">
                    <div className="w-full overflow-y-auto card-gradient border-[1.5px] py-8 px-6 rounded-3xl">
                        <div className="">
                            <div className="flex justify-end items-center mb-2">
                                    <div className="card-gradient border border-gray-600 rounded-full">
                                    <select
                                    className="bg-transparent text-white p-3 outline-none text-sm font-bold cursor-pointer"
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
                        <div className="flex flex-col w-full gap-9 relative z-[1]">
                            <div className="relative z-[1]">
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
            <div className="card-gradient border-[1.5px] py-6 sm:py-8 px-2 sm:px-14 rounded-3xl">
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
                        <div className="min-w-[600px] max-h-[350px] overflow-y-auto">
                            <table className="w-full bg-transparent border-0 rounded-lg shadow-sm">
                                <thead>
                                    <tr className="bg-[rgba(0,0,0,0.02)] text-left text-xs sm:text-sm font-bold text-[#838383]">
                                        <th className="px-3 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">Service Launch </th>
                                    <th className="px-3 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">Total Item Sold</th>
                                    <th className="px-3 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">TOTAL PROFITS</th>
                                    <th className="px-3 sm:px-6 py-3 border-b border-[#323232] whitespace-nowrap">COMPLETION</th>
                                    <th className="px-3 sm:px-6 py-3 border-b border-[#323232] w-10 whitespace-nowrap">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm text-gray-600">
                                {data?.map((row) => (
                                    <tr key={row.id} className="hover:bg-[255,255,255,0.2]">
                                        <td className="px-3 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className="flex items-center gap-3 sm:gap-6">
                                                <div className="bg-[#D9D9D9] w-10 h-10 sm:w-[3.563rem] sm:h-[3.25rem] rounded-lg"></div>
                                                <div className='text-[#D4BC6D] font-bold'>
                                                    <div className="text-xs sm:text-sm">{row.name}</div>
                                                    <p className='text-[#838383] font-bold text-xs'>
                                                        Branded Stripe
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className='text-[#D4BC6D] font-bold text-xs sm:text-sm'>
                                                {row.item}
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-6 py-4 border-b border-[#323232]">
                                            <div className='text-[#D4BC6D] font-bold text-xs sm:text-sm'>
                                                {row.profit}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[#323232]">
                                            <div className='text-[#D4BC6D] font-bold mb-0.5'>
                                                {row.completion}
                                            </div>
                                            <div className='h-[10px] w-[150px] bg-[#282828] rounded-full'>
                                                <div className="h-full bg-[#D4BC6D] rounded-full" style={{ width: row?.completion }} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-[#323232]">
                                            <div className="flex gap-3">
                                                <Trash type='button' />
                                                <EyeIcon type='button' />
                                                <EllipsisVertical type='button' />
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
        </div>
    )
}

export default Dashboard
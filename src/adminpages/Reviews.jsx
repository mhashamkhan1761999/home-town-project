import { useQuery } from '@tanstack/react-query';
import { Delete, EllipsisVertical, EyeIcon, Trash } from 'lucide-react';
import React from 'react'
import { getRequest } from '../api';

const Reviews = () => {
    const { data: cate, isLoading, error } = useQuery({
        queryKey: ['category'], // Unique key for caching
        queryFn: () => getRequest('/products/1'), // Fetch function
    });


    console.log('categoriesad', cate, isLoading, error);


    const data = [
        {
            id: 1, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 2, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 3, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 4, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 5, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 6, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 7, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            id: 8, name: "Bros warner", order: 'Graphic Tees', date: "07/10/2025",
            reply: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
    ];
    return (
        <>
            <div className="card-gradient border-[1.5px] px-8 py-9 rounded-3xl">
                <h2 className='text-white font-bold text-3xl mb-11'>
                    Storefront Reviews
                </h2>

                <div className="max-h-[72dvh] overflow-y-auto card-gradient border-[1.5px] py-8 px-14 rounded-3xl">
                    <div className="">
                        <div className="flex justify-between items-center mb-16">
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
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-transparent border-0 rounded-lg shadow-sm">
                                <thead>
                                    <tr className="bg-[rgba(0,0,0,0.02)] text-left text-sm font-bold text-[#838383]">
                                        <th className="px-6 py-3 border-b border-[#323232]">Name</th>
                                        <th className="px-6 py-3 border-b border-[#323232]">Order</th>
                                        <th className="px-6 py-3 border-b border-[#323232]">Date</th>
                                        <th className="px-6 py-3 border-b border-[#323232] w-lg">Reply</th>
                                        <th className="px-6 py-3 border-b border-[#323232] w-10">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-600">
                                    {data.map((row) => (
                                        <tr key={row.id} className="hover:bg-[255,255,255,0.2]">
                                            <td className="px-6 py-4 border-b border-[#323232]">
                                                <div className="flex items-center gap-6">
                                                    <div className="bg-[#D9D9D9] w-[3.563rem] h-[3.25rem] rounded-lg"></div>
                                                    <div className='text-[#D4BC6D] font-bold'>
                                                        {row.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 border-b border-[#323232]">
                                                <div className='text-[#D4BC6D] font-bold'>
                                                    {row.order}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 border-b border-[#323232]">
                                                <div className='text-[#D4BC6D] font-bold'>
                                                    {row.date}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 border-b border-[#323232]">{row.reply}</td>
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
            </div >
        </>
    )
}

export default Reviews
import React from 'react'
import { useParams } from 'react-router-dom';
import { getRequest } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const ForntDetail = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const params = useParams()
    const { data, isLoading, error } = useQuery({
        queryKey: ['products-details', params?.id], // Unique key for caching
        queryFn: () => getRequest(`/product-detail/${params?.id}`), // Fetch function
    });

    const [active, setActive] = React.useState('blue');


    const handleAddToCart = (data) => {
        const { id, name, description, price, color } = data;
        if (!isInCart) {
            dispatch(addToCart({ id, name, description, price, color }));
            toast?.success('Add to Cart Successfully');
        }
    };



    const detail = data?.[0] || {};
    const colors = data?.[0]?.colors ? JSON.parse(data?.[0]?.colors) : [];
    const isInCart = cartItems?.some(item => item.id == detail.id);


    console.log('Product Details:', isInCart);


    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left: Product Image */}
                <div className="w-full">
                    <img
                        src={detail?.images?.length > 0 ? `https://hometown.eagleeblaze.com/storage/app/public/${detail?.images?.[0]?.image}` : `/404.avif`}
                        alt="Product Image"
                        className="rounded-xl shadow-lg w-full object-cover border border-white/10"
                    />
                </div>
                {/* Right: Product Details */}
                <div className="space-y-6">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-[#D4BC6D]">
                        {detail?.name}
                    </h1>
                    {/* Price */}
                    <p className="text-2xl font-semibold text-green-600">$59.99</p>
                    {/* Description */}
                    <p className="text-white">
                        {detail?.description}
                    </p>
                    <div>
                        <label className="block mb-2 font-semibold text-white">
                            Product Type:
                        </label>
                        <div className="flex gap-3">
                            <p className="text-white">
                                {detail?.product_type?.name}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-white">
                            Category:
                        </label>
                        <div className="flex gap-3">
                            <p className="text-white">
                                {detail?.category?.name}
                            </p>
                        </div>
                    </div>
                    {/* Select Color */}
                    <div>
                        <label className="block mb-2 font-semibold text-white">
                            Select Color:
                        </label>
                        <div className="flex gap-3">
                            {/* {colors?.length > 0 && colors?.map((color, idx) => (
                                <button key={idx} className="w-8 h-8 rounded-full border-2 border-gray-300 bg-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none" />
                            ))} */}

                            <button className="w-8 h-8 rounded-full border-2 border-gray-300 bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                            <button className="w-8 h-8 rounded-full border-2 border-gray-300 bg-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none" />
                        </div>
                    </div>
                    {/* Add to Cart */}
                    <button
                        className={`mt-6 bg-black text-white text-lg font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition ${isInCart ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => handleAddToCart({ id: detail?.id, name: detail?.name, description: detail?.description, price: detail?.price, color: active })}
                    >
                        {isInCart ? 'Already in Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div >

        </>
    )
}

export default ForntDetail
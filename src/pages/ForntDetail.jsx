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

    const [active, setActive] = React.useState(null);
    const [showSizeChart, setShowSizeChart] = React.useState(false);

    const handleAddToCart = (data) => {
        const { id, name, description, price, color } = data;
        if (!isInCart) {
            // Find the selected color object to get both name and code
            const selectedColorObj = colors.find(c => c.code === color) || { name: 'Unknown', code: color };
            dispatch(addToCart({ 
                id, 
                name, 
                description, 
                price, 
                color: color,
                colorName: selectedColorObj.name
            }));
            toast?.success('Add to Cart Successfully');
        }
    };

    const detail = data?.[0] || {};
    
    // Parse colors with support for new format {name, code} and old format [string]
    const parseColors = (colorsData) => {
        if (!colorsData) return [];
        
        try {
            const parsedColors = JSON.parse(colorsData);
            
            if (Array.isArray(parsedColors)) {
                // Check if it's the new format with objects {name, code}
                if (parsedColors.length > 0 && typeof parsedColors[0] === 'object' && parsedColors[0].name && parsedColors[0].code) {
                    return parsedColors; // New format: array of {name, code} objects
                } else {
                    // Old format: array of color strings - convert to new format with fallback colors
                    const colorMapping = {
                        black: "#000000", white: "#FFFFFF", red: "#FF0000", blue: "#0000FF",
                        green: "#008000", yellow: "#FFFF00", purple: "#800080", orange: "#FFA500",
                        pink: "#FFC0CB", gray: "#808080", grey: "#808080", brown: "#A52A2A",
                        navy: "#000080", gold: "#FFD700", silver: "#C0C0C0"
                    };
                    return parsedColors.map(color => ({
                        name: color,
                        code: colorMapping[color.toLowerCase().trim()] || '#CCCCCC'
                    }));
                }
            }
        } catch (e) {
            console.warn('Failed to parse colors:', colorsData);
        }
        
        return [];
    };
    
    const colors = parseColors(detail?.colors);
    
    // Set initial active color when colors are loaded
    React.useEffect(() => {
        if (colors.length > 0 && !active) {
            setActive(colors[0].code);
        } else if (colors.length === 0 && !active) {
            setActive('blue'); // fallback for products without colors
        }
    }, [colors, active]);
    const isInCart = cartItems?.some(item => item.id == detail.id);


    // console.log('Product Details:', isInCart);


    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left: Product Image */}
                        <div className="w-full">
                            <img
                                src={detail?.images?.length > 0 ? `https://admin.hometownheroagency.com/storage/app/public/${detail?.images?.[0]?.image}` : `/404.avif`}
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
                    <p className="text-2xl font-semibold text-green-600">{detail?.price}</p>
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
                        <div className="flex gap-3 flex-wrap">
                            {colors.length > 0 ? (
                                colors.map((colorObj, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            active === colorObj.code
                                                ? 'border-[#D4BC6D] ring-2 ring-[#D4BC6D] ring-opacity-50'
                                                : 'border-gray-300 hover:border-gray-200'
                                        } focus:outline-none`}
                                        style={{ backgroundColor: colorObj.code }}
                                        title={`${colorObj.name} (${colorObj.code})`}
                                        onClick={() => setActive(colorObj.code)}
                                    />
                                ))
                            ) : (
                                <div className="flex gap-3">
                                    <button 
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            active === 'blue' ? 'border-[#D4BC6D] ring-2 ring-[#D4BC6D] ring-opacity-50' : 'border-gray-300'
                                        } bg-blue-500 focus:outline-none`}
                                        onClick={() => setActive('blue')}
                                        title="Blue"
                                    />
                                    <button 
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            active === 'green' ? 'border-[#D4BC6D] ring-2 ring-[#D4BC6D] ring-opacity-50' : 'border-gray-300'
                                        } bg-green-500 focus:outline-none`}
                                        onClick={() => setActive('green')}
                                        title="Green"
                                    />
                                </div>
                            )}
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
            </div>

            {/* Size Chart Section */}
            <div className="max-w-6xl mx-auto px-4 pb-10">
                <div className="flex justify-start mb-6">
                    <button
                        onClick={() => setShowSizeChart(!showSizeChart)}
                        className="bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 font-medium transition-all duration-300 text-white hover:text-[#D4BC6D] hover:border-[#D4BC6D]/50"
                    >
                        {showSizeChart ? 'Hide Size Chart' : 'Show Size Chart'}
                    </button>
                </div>
                
                {showSizeChart && (
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6 text-center">Size Chart</h2>
                            {detail?.images?.length > 1 && detail?.images?.[1]?.image ? (
                                <img
                                    src={`https://admin.hometownheroagency.com/storage/app/public/${detail?.images?.[1]?.image}`}
                                    alt="Size Chart"
                                    className="rounded-xl shadow-lg w-full object-contain border border-white/10 bg-white/5"
                                />
                            ) : (
                                <div className="bg-black/30 border border-white/10 rounded-xl p-8 text-center">
                                   <img
                                    src={"/size.png"}
                                    alt="Size Chart"
                                    className="rounded-xl shadow-lg w-full object-contain border border-white/10 bg-white/5"
                                />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default ForntDetail
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
    const [showWarnings, setShowWarnings] = React.useState(false);
    const [showMaterial, setShowMaterial] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

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

    // Image carousel functions
    const images = detail?.images || [];
    const totalImages = images.length;

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === totalImages - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? totalImages - 1 : prevIndex - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Reset image index when product changes
    React.useEffect(() => {
        setCurrentImageIndex(0);
    }, [detail?.id]);

    // console.log('Product Details:', isInCart);


    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left: Product Image Carousel */}
                        <div className="w-full">
                            <div className="relative">
                                {/* Main Image */}
                                <div className="relative group">
                                    <img
                                        src={totalImages > 0 ? `https://admin.hometownheroagency.com/storage/app/public/${images[currentImageIndex]?.image}` : `/404.avif`}
                                        alt={`Product Image ${currentImageIndex + 1}`}
                                        className="rounded-xl shadow-lg w-full object-cover border border-white/10"
                                    />
                                    
                                    {/* Navigation Arrows - Only show if more than 1 image */}
                                    {totalImages > 1 && (
                                        <>
                                            {/* Left Arrow */}
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-70"
                                                aria-label="Previous image"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            
                                            {/* Right Arrow */}
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-70"
                                                aria-label="Next image"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                    
                                    {/* Image Counter */}
                                    {totalImages > 1 && (
                                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                            {currentImageIndex + 1} / {totalImages}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Dot Indicators - Only show if more than 1 image */}
                                {totalImages > 1 && (
                                    <div className="flex justify-center mt-4 space-x-2">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToImage(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                    index === currentImageIndex 
                                                        ? 'bg-[#D4BC6D] ring-2 ring-[#D4BC6D]/50' 
                                                        : 'bg-gray-400 hover:bg-gray-300'
                                                }`}
                                                aria-label={`Go to image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
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

            {/* Size Chart, Material, and Warnings Section */}
            <div className="max-w-6xl mx-auto px-4 pb-10">
                <div className="flex justify-start gap-4 mb-6 flex-wrap">
                    {detail?.product_type?.size_chart && (<button
                        onClick={() => {
                            setShowSizeChart(!showSizeChart);
                            setShowMaterial(false);
                            setShowWarnings(false);
                        }}
                        className="bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 font-medium transition-all duration-300 text-white hover:text-[#D4BC6D] hover:border-[#D4BC6D]/50"
                    >
                        {showSizeChart ? 'Hide Size Chart' : 'Show Size Chart'}
                    </button>)}

                    {detail?.product_type?.material && (<button
                        onClick={() => {setShowMaterial(!showMaterial); setShowSizeChart(false); setShowWarnings(false);}}
                        className="bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 font-medium transition-all duration-300 text-white hover:text-[#D4BC6D] hover:border-[#D4BC6D]/50"
                    >
                        {showMaterial ? 'Hide Material' : 'Show Material'}
                    </button>)}
                    {detail?.warning && (<button
                        onClick={() => {setShowWarnings(!showWarnings); setShowMaterial(false); setShowSizeChart(false);}}
                        className="bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 font-medium transition-all duration-300 text-white hover:text-[#D4BC6D] hover:border-[#D4BC6D]/50"
                    >
                        {showWarnings ? 'Hide Warnings' : 'Show Warnings'}
                    </button>)}
                </div>
                
                {showSizeChart && detail?.product_type?.size_chart && (
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6 text-center">Size Chart</h2>
                            {detail?.product_type?.size_chart ? (
                                <img
                                    src={`https://admin.hometownheroagency.com/storage/app/public/${detail?.product_type?.size_chart}`}
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
                
                {showMaterial && detail?.product_type?.material && (
                    <div className="flex justify-center mt-8">
                        <div className="w-full max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6 text-center">Material & Care Instructions</h2>
                            <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                                {detail?.product_type?.material ? (
                                    <div className="text-white text-sm leading-relaxed">
                                        <div className="flex items-start gap-3">
                                            <div className="text-[#D4BC6D] mt-1">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <strong className="text-[#D4BC6D]">Material & Care:</strong>
                                                <div className="mt-2 whitespace-pre-line">
                                                    {detail.product_type.material}
                                                </div>
                                                {detail?.product_type?.weight && (
                                                    <div className="mt-3">
                                                        <strong className="text-[#D4BC6D]">Weight:</strong> {detail.product_type.weight}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-white text-sm leading-relaxed text-center">
                                        <div className="text-[#D4BC6D] mb-2">
                                            <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Material information is not available for this product.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {showWarnings && detail?.warning && (
                    <div className="flex justify-center mt-8">
                        <div className="w-full max-w-4xl">
                            <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6 text-center">Product Warnings</h2>
                            {detail?.warning ? (
                                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="text-red-400 mt-1">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-sm leading-relaxed">
                                            {detail.warning}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="text-yellow-400 mt-1">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-sm leading-relaxed">
                                            <strong>General Safety Warnings:</strong>
                                            <ul className="mt-2 space-y-1 list-disc list-inside">
                                                <li>Please follow washing instructions carefully</li>
                                                <li>Keep away from direct heat sources</li>
                                                <li>Check product size before use</li>
                                                <li>Not suitable for children under 3 years</li>
                                                <li>May contain small parts - choking hazard</li>
                                            </ul>
                                        </div>
                                    </div>
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
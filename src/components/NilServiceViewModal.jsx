import { X } from 'lucide-react'
import React from 'react'

const NilServiceViewModal = ({ onClose, product }) => {
    // Enhanced color handling with fallback for both colors_data and colors fields
    const getColors = () => {
        // First try colors_data field (new format)
        if (product?.colors_data) {
            try {
                const parsedColorsData = typeof product.colors_data === "string" 
                    ? JSON.parse(product.colors_data) 
                    : product.colors_data;
                
                if (Array.isArray(parsedColorsData) && parsedColorsData.length > 0) {
                    return parsedColorsData.map(color => {
                        if (typeof color === 'object' && color.name && color.code) {
                            return color;
                        }
                        return { name: color, code: color };
                    });
                }
            } catch (error) {
                console.warn('Error parsing colors_data:', error);
            }
        }
        
        // Fallback to colors field (legacy format)
        if (product?.colors) {
            try {
                const parsedColors = typeof product.colors === "string" 
                    ? JSON.parse(product.colors) 
                    : product.colors;
                
                if (Array.isArray(parsedColors) && parsedColors.length > 0) {
                    return parsedColors.map(color => {
                        if (typeof color === 'object' && color.name && color.code) {
                            return color;
                        }
                        // Convert string colors to hex using fallback mapping
                        const colorMapping = {
                            'red': '#FF0000',
                            'blue': '#0000FF',
                            'green': '#008000',
                            'yellow': '#FFFF00',
                            'orange': '#FFA500',
                            'purple': '#800080',
                            'pink': '#FFC0CB',
                            'brown': '#A52A2A',
                            'black': '#000000',
                            'white': '#FFFFFF',
                            'gray': '#808080',
                            'grey': '#808080',
                            'navy': '#000080',
                            'maroon': '#800000',
                            'lime': '#00FF00',
                            'aqua': '#00FFFF',
                            'teal': '#008080',
                            'silver': '#C0C0C0',
                            'fuchsia': '#FF00FF',
                            'olive': '#808000'
                        };
                        
                        const colorName = String(color).toLowerCase();
                        const colorCode = colorMapping[colorName] || color;
                        return { name: color, code: colorCode };
                    });
                }
            } catch (error) {
                console.warn('Error parsing colors:', error);
            }
        }
        
        return [];
    };

    const colors = getColors();

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-xl font-bold mb-4">Product Details</h2>

                    <div className="space-y-3">
                        <div><strong>ID:</strong> {product.id}</div>
                        <div><strong>Name:</strong> {product.name}</div>
                        <div><strong>Description:</strong> {product.description}</div>
                        <div><strong>Price:</strong> ${product.price}</div>
                        <div><strong>Status:</strong> {product.status}</div>
                        <div><strong>Category:</strong> {product.category.name}</div>
                        <div>
                            <strong>Colors:</strong>
                            <div className="flex gap-2 mt-1">
                                {Array.isArray(colors) && colors.length > 0 ? (
                                    colors.map((color, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div
                                                className="w-6 h-6 rounded-full border"
                                                style={{ backgroundColor: color.code }}
                                                title={color.name}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <span>No colors</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-right">
                        <button
                            onClick={onClose}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NilServiceViewModal
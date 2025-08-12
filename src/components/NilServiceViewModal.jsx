import { X } from 'lucide-react'
import React from 'react'

const NilServiceViewModal = ({ onClose, product }) => {
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
                        <div><strong>Id:</strong> {product.id}</div>
                        <div><strong>Name:</strong> {product.name}</div>
                        <div><strong>Description:</strong> {product.description}</div>
                        <div><strong>Price:</strong> ${product.price}</div>
                        <div><strong>Status:</strong> {product.status}</div>
                        <div><strong>Category:</strong> {product.category.name}</div>
                        <div><strong>Product Type:</strong> {product.product_type.name}</div>
                        <div>
                            <strong>Colors:</strong>
                            <div className="flex gap-2 mt-1">
                                {console.log(product)}
                                {/* {product?.colors?.length > 0 && product?.colors?.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className="w-6 h-6 rounded-full border"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))} */}
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
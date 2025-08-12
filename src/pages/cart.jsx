import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';


function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(addToCart(item));
    };

    const handleDecrease = () => {
        dispatch(removeFromCart(item.id));
    };

    return (
        <div className="flex justify-between items-center p-6 border-b border-[#D4BC6D] border-[1.5px] my-5 rounded-2xl">
            <div>
                <h4 className="text-white text-xl font-semibold">{item.name}</h4>
                <p className="text-white text-xl">Price: ${item?.price ? parseFloat(item?.price).toFixed(2) : '0.00'}</p>
                <p className="text-white text-xl">Quantity: {item.quantity}</p>
                <div className="flex items-center mt-1">
                    <button
                        onClick={handleDecrease}
                        className="bg-gray-300 text-gray-800 px-2 py-1 rounded-l hover:bg-gray-400"
                        type='button'
                    >
                        -
                    </button>
                    <div className="w-12 text-center text-lg text-white border-0">
                        {item.quantity}
                    </div>
                    <button
                        onClick={handleIncrease}
                        className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r hover:bg-gray-400"
                        type='button'
                    >
                        +
                    </button>
                </div>
                <p className="text-white text-xl">Total: ${item.total ? parseFloat(item.total).toFixed(2) : '0.00'}</p>
            </div>
            <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                type='button'
            >
                Remove
            </button>
        </div>
    );
}

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();


    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrease = (item) => {
        dispatch(removeFromCart(item.id));
    };


    return (
        <>
            <section className="py-[100px] md:py-[120px] lg:py-[142px] bg-black px-4">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex gap-10 items-center justify-center">
                        <div className='w-auto'>
                            <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.875rem] font-bold capitalize tracking-tight bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent text-center md:text-left">
                                Your Shopping Cart
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-[#111]">
                <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {cart?.items?.length === 0 ? (
                        <div className="border border-[#D4BC6D] w-full rounded-2xl p-6 col-span-full">
                            <p className="text-white text-xl text-center">Your cart is currently empty.</p>
                        </div>
                    ) : (
                        <>
                            {/* Left: Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="overflow-x-auto border border-[#D4BC6D] rounded-2xl">
                                    <table className="min-w-full divide-y divide-gray-700 text-white text-sm md:text-base">
                                        <thead className="bg-[#1b1b1b] text-[#D4BC6D]">
                                            <tr>
                                                <th className="px-6 py-4 text-left">Product</th>
                                                <th className="px-6 py-4 text-center">Quantity</th>
                                                <th className="px-6 py-4 text-center">Price</th>
                                                <th className="px-6 py-4 text-center">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {cart.items.map(item => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4">{item.name}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                className="bg-[#D4BC6D] text-black rounded px-2 text-sm"
                                                                type='button'
                                                                onClick={() => handleDecrease(item)}
                                                            >−</button>
                                                            <span className="min-w-[24px] text-center">{item.quantity}</span>
                                                            <button
                                                                className="bg-[#D4BC6D] text-black rounded px-2 text-sm"
                                                                type='button'
                                                                onClick={() => handleIncrease(item)}
                                                            >+</button>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">${parseFloat(item.price).toFixed(2)}</td>
                                                    <td className="px-6 py-4 text-center">${(item.quantity * item.price).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Right: Order Summary */}
                            <div className="border border-[#D4BC6D] rounded-2xl p-6 bg-[#1b1b1b] h-fit">
                                <h3 className="text-[#D4BC6D] text-2xl font-semibold mb-4 text-center">Order Summary</h3>
                                <div className="text-white space-y-3">
                                    <div className="flex justify-between">
                                        <span>Total Items:</span>
                                        <span>{cart?.totalQuantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Price:</span>
                                        <span>${parseFloat(cart?.totalPrice).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex flex-col gap-3">
                                    <button
                                        onClick={() => dispatch(clearCart())}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 text-sm rounded"
                                        type="button"
                                    >
                                        Clear Cart
                                    </button>
                                    {cart.items?.length > 0 && (
                                        <Link
                                            to="/checkout"
                                            className="bg-[#D4BC6D] hover:bg-[#c3a741] text-black font-semibold py-2 text-sm rounded inline-flex items-center justify-center"
                                            type="button"
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    )}

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>


        </>
    )
}



export default Cart

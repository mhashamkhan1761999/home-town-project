import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { postRequest } from '../api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'
import { getNames } from 'country-list'

const countries = getNames();

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Calculate shipping and tax
  const subtotal = parseFloat(cart?.totalPrice || 0);
  const totalQuantity = cart?.totalQuantity || 0;
  const shipping = totalQuantity < 2 ? 5 : 0;
  const tax = (subtotal * 0.029) + 1.30; // 2.9% of subtotal
  const grandTotal = subtotal + shipping + tax;



  const mutation = useMutation({
    mutationKey: ['add-place-order'],
    mutationFn: (form) => postRequest('/order-place', form),
    onSuccess: (data) => {
      setIsLoading(false);
      if (data?.statusCode == 200) {
        toast?.success(data?.message);
        navigate('/thank-you')
        dispatch(clearCart())
      }
    },
    onError: (error) => {
      setIsLoading(false);
      toast?.error(error?.message || 'Payment failed. Please try again.');
    }
  })



  const onSubmit = async (data) => {
    if (isLoading) return; // Prevent double submission
    
    setIsLoading(true);
    
    data['items'] = cart?.items?.map((val => ({ 
      product_id: val?.id, 
      quantity: val?.quantity, 
      price: val?.price,
      color: {
        name: val?.colorName || 'Unknown',
        code: val?.color || '#000000'
      }
    }))) || [];

    // Handle USA special case for country
    if (data.country && (data.country.toLowerCase().includes('united states') || data.country.toLowerCase().includes('usa') || data.country === 'United States of America')) {
      data.country = 'USA';
    }

    // Add shipping and tax to the order data
    data['shipping'] = shipping;
    data['tax'] = tax;

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const card = elements.getElement(CardElement)
    const { error, token } = await stripe.createToken(card)

    if (error) {
      setIsLoading(false);
      toast?.error(error.message);
    } else {
      data['stripe_token'] = token?.id
      mutation.mutate(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: Billing Form */}
        <div className="border border-[#D4BC6D] rounded-2xl p-8 bg-[#1b1b1b] shadow-sm text-white">
          <h3 className="text-3xl font-bold mb-6">Billing Details</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id='billing-form'>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                required
                {...register('full_name', { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                required
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                placeholder="123 Street Name"
                className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                required
                {...register('address', { required: true })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                  required
                  {...register('city', { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                  required
                  {...register('postal_code', { required: true })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                required
                {...register('country', { required: true })}
              >
                <option value="">Select your country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* RIGHT: Order Summary & Stripe */}
        <div className="border border-[#D4BC6D] rounded-2xl p-8 bg-[#1b1b1b] shadow-sm flex flex-col justify-between text-white h-full">
          <div>
            <h3 className="text-3xl font-bold mb-6">Order Summary</h3>
            <ul className="space-y-3">
              {cart?.items?.map(item => (
                <li key={`${item.id}-${item.color}`} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span>{item.name} × {item.quantity}</span>
                    {item.color && item.colorName && (
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-xs text-gray-300">{item.colorName}</span>
                      </div>
                    )}
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="flex justify-between border-t pt-4 mt-4">
                <span>Subtotal ({cart?.totalQuantity} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>VAT</span>
                <span>${tax.toFixed(2)}</span>
              </li>
                <span className='text-xs text-gray-300'> A processing fee of 2.9% + $1.30 applies to each order (charged by our payment processor)</span>
              <li className="flex justify-between font-semibold border-t pt-4 mt-4 text-lg">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </li>
            </ul>
          </div>
          {/* Stripe Form */}
          <div className="mt-10">

            <div className="border border-gray-300 rounded p-4 mb-4">
              <CardElement options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': { color: '#a0aec0' },
                  },
                  invalid: { color: '#ef4444' },
                },
              }} />
            </div>
            <button
              type="submit"
              className={`w-full bg-[#D4BC6D] text-black py-3 px-6 rounded font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 ${(!stripe || isLoading) ? '!cursor-not-allowed opacity-70' : '!cursor-pointer'}`}
              disabled={!stripe || isLoading}
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm

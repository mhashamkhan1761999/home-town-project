import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { postRequest } from '../api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const mutation = useMutation({
    mutationKey: ['add-place-order'],
    mutationFn: (form) => postRequest('/order-place', form),
    onSuccess: (data) => {
      if (data?.statusCode == 200) {
        toast?.success(data?.message);
        navigate('/thank-you')
        dispatch(clearCart())
      }
    }
  })



  const onSubmit = async (data) => {
    data['items'] = cart?.items?.map((val => ({ product_id: val?.id, quantity: val?.quantity, price: val?.price }))) || [];

    if (!stripe || !elements) return

    const card = elements.getElement(CardElement)
    const { error, token } = await stripe.createToken(card)

    if (error) {
      console.error(error)
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
              <input
                type="text"
                placeholder="Country"
                className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                required
                {...register('country', { required: true })}
              />
            </div>
          </form>
        </div>

        {/* RIGHT: Order Summary & Stripe */}
        <div className="border border-[#D4BC6D] rounded-2xl p-8 bg-[#1b1b1b] shadow-sm flex flex-col justify-between text-white h-full">
          <div>
            <h3 className="text-3xl font-bold mb-6">Order Summary</h3>
            <ul className="space-y-3">
              {cart?.items?.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="flex justify-between font-semibold border-t pt-4 mt-4 text-lg">
                <span>Total ({cart?.totalQuantity} items)</span>
                <span>${parseFloat(cart?.totalPrice || 0).toFixed(2)}</span>
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
              className={`w-full bg-[#D4BC6D] text-black py-3 px-6 rounded font-semibold hover:opacity-90 transition ${stripe ? '!cursor-pointer' : '!cursor-not-allowed'}`}
              // form='billing-form'
              disabled={!stripe}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm

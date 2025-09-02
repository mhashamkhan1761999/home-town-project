import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postRequest } from '../../api';
import { queryClient } from '../../main';
import toast from 'react-hot-toast';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';





const AddSubscriptionModal = ({ onClose, isEdit, mutate }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // Remove the internal purchaseMutation and use the passed mutate function
    const handleSuccess = (data) => {
        if (data?.statusCode === 200) {
            toast.success(data?.message);
            setShowSuccessModal(true);
            setIsProcessing(false);
        }
    }

    const handleError = (error) => {
        toast.error(error?.message || 'Payment failed');
        setIsProcessing(false);
    }



    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('=== AddSubscriptionModal onSubmit called ===');
        
        if (!stripe || !elements) return
        
        setIsProcessing(true);
        const card = elements.getElement(CardElement)
        const { error, token } = await stripe.createToken(card)

        if (error) {
            console.error(error)
            toast?.error(error.message);
            setIsProcessing(false);
        } else {
            const data = {
                package_id: isEdit?.id,
                stripe_token: token?.id
            }
            
            console.log('AddSubscriptionModal - Form data prepared:', data);
            console.log('AddSubscriptionModal - Calling mutate function');
            
            // Call the mutate function passed from parent
            if (mutate) {
                mutate(data);
            } else {
                console.error('No mutate function provided to AddSubscriptionModal');
                setIsProcessing(false);
            }
        }
    }


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[rgba(217,217,217,0.03)] p-6 rounded-lg max-w-2xl w-full">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#D4BC6D]">Add Subscription</h2>
                        <button onClick={onClose} className="text-[#D4BC6D] text-2xl">&times;</button>
                    </div>

                    {/* Time Input Field */}
                    <form onSubmit={onSubmit} id="timing-form" className='h-[400px] overflow-y-auto'>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Payment Details
                            </label>


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

                        </div>
                    </form>


                    {/* Modal Footer */}
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-gray-600 text-white py-2 px-4 rounded-full mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#D4BC6D] text-white py-2 px-4 rounded-full"
                            type='submit'
                            form='timing-form'
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
                    <div className="bg-[#282828] border border-[#4B4C46] rounded-3xl p-8 max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold text-[#D4BC6D] mb-4">Thanks for purchasing</h2>
                        <p className="text-white mb-6">Your bundle has been bought successfully.</p>
                        <button
                            className="py-2 px-6 bg-[#57430D] text-white rounded-lg font-medium hover:bg-[#ab965d] transition-colors"
                            onClick={() => {
                                setShowSuccessModal(false);
                                onClose();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}



export default AddSubscriptionModal
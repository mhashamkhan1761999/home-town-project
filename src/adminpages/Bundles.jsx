import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddSubscriptionModal from '../components/subscriptions/AddSubscriptionModal';
import { queryClient } from '../main';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useModalHistory } from '../hooks/useModalHistory';
import { toast } from 'react-hot-toast';


const stripePromise = loadStripe('pk_test_51REvJgR0EqcqzPLH5CL2723m2l8hkmEjNQ6Qkm3b3EJEVziLUIJsTOg2ehrSdsXqMEKwi6OaFaivlZpX9N3rg6Eu00GZHqnM7X');
// const stripePromise = loadStripe('pk_live_51REvJXJie2PUnhtx7uy53YLEKNxXqSqb6Fa8BdN2KGsoK7CzmfURna8ekI7q72P6dg5OocNOf243wpTsODrTqtUQ00Fds6auka');


const Bundles = () => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = React.useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = React.useState(false);
    const [currentBundle, setCurrentBundle] = React.useState(null);
    const [formData, setFormData] = React.useState([]);
    const [currentDescriptionIndex, setCurrentDescriptionIndex] = React.useState(0);
    const formDataRef = useRef([]); // Add ref to store form data (content + images)
    
    // Modal history management
    const bundleModal = useModalHistory('bundleModal', isShow !== false, () => setIsShow(false));

    // Handle modal state restoration from URL
    useEffect(() => {
        if (bundleModal.shouldOpenModal) {
            const modalData = bundleModal.getModalData();
            if (modalData?.bundle) {
                setIsShow(modalData.bundle);
            }
        }
    }, [bundleModal.shouldOpenModal]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-bundles'], // Unique key for caching
        queryFn: () => getRequest('/bundles'), // Fetch function
    });

    const mutation = useMutation({
        mutationKey: ['add-subscription'],
        mutationFn: (form) => {
            // Check if form is FormData (contains files)
            const isFormData = form instanceof FormData;
            console.log('Mutation - Is FormData:', isFormData);
            return postRequest('/buy-bundles', form, isFormData);
        },
        onSuccess: (data) => {
            // console.log('Mutation success:', data);
            if (data?.statusCode === 200) {
                toast.success(data?.message);
                setIsShow(false);
                // Reset states
                setShowDescriptionModal(false);
                setCurrentBundle(null);
                setFormData([]);
                setCurrentDescriptionIndex(0);
                formDataRef.current = []; // Reset ref
                // queryClient.invalidateQueries({ queryKey: ['get-packages'] });
                navigate("/athlete/my-subscription")
            }
        },
        onError: (error) => {
            console.log('Mutation error:', error);
            toast.error(error?.message || 'Payment failed');
        }
    })


    const getColor = (type) => {
        switch (type) {
            case 'free': return 'bg-green-500';
            case 'monthly': return 'bg-blue-500';
            case 'yearly': return 'bg-purple-500';
            default: return 'bg-gray-400';
        }
    };

    const handleGetStarted = (item) => {
        if (item?.type == 'free') {
            mutation.mutate({ package_id: item?.id });
        } else {
            // Start description collection process
            setCurrentBundle(item);
            const graphicCount = parseInt(item?.graphic || 1);
            const initialFormData = new Array(graphicCount).fill({ content: '', image: null });
            setFormData(initialFormData);
            formDataRef.current = initialFormData; // Initialize ref
            setCurrentDescriptionIndex(0);
            setShowDescriptionModal(true);
        }
    }

    const handleDescriptionNext = (formEntry) => {
        const newFormData = [...formData];
        newFormData[currentDescriptionIndex] = formEntry || { content: '', image: null };
        setFormData(newFormData);
        formDataRef.current = newFormData; // Update ref immediately

        if (currentDescriptionIndex < formData.length - 1) {
            // Move to next description
            setCurrentDescriptionIndex(currentDescriptionIndex + 1);
        } else {
            // All descriptions collected, close description modal and open payment modal
            setShowDescriptionModal(false);
            setIsShow(currentBundle);
            bundleModal.openModal({ bundle: currentBundle });
        }
    }

    const handleDescriptionSkip = () => {
        handleDescriptionNext({ content: '', image: null });
    }

    const handleDescriptionBack = () => {
        if (currentDescriptionIndex > 0) {
            setCurrentDescriptionIndex(currentDescriptionIndex - 1);
        } else {
            // Close description modal if at first step
            setShowDescriptionModal(false);
            setCurrentBundle(null);
            setFormData([]);
            setCurrentDescriptionIndex(0);
            formDataRef.current = []; // Reset ref
        }
    }


    return (
        <>
            <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
                <h2 className='text-white font-bold text-3xl mb-16'>
                    Bundles
                </h2>

                <div className="max-h-[75dvh] overflow-y-auto">
                    <div className="mb-24">
                        <div className="flex flex-wrap gap-7">
                            {data?.filter(item => item?.title!= "Growth Bundles").map((item) => (
                                <div key={item?.id} className="relative px-8 pt-16 pb-10 card-gradient !border-[1.5px] rounded-3xl w-[25.375rem]">
                                    {/* <div className={`absolute top-5 right-0 -translate-x-1/2 text-white text-base capitalize font-semibold px-4 py-1 rounded-full shadow-md ${getColor(item?.type)}`}>
                                        {item?.type}
                                    </div> */}
                                    <div className="">
                                        <h4 className='text-white font-semibold text-2xl capitalize mb-2'>
                                            {item?.title}
                                        </h4>
                                        <p className='text-white font-normal text-sm mb-4'>
                                            {item?.description.split('(')[0]}
                                        </p>
                                        <img src="/line2.svg" alt="line" className='w-full mb-11' />
                                    </div>
                                    <div className="my-9">
                                        <p className='text-5xl font-medium text-white mb-2'>
                                            ${item?.price}
                                            {/* <span className='font-normal text-sm'>
                                            /per {item?.duration_in_days} days
                                        </span> */}
                                        </p>
                                    </div>
                                    <button
                                        type='button'
                                        className='bg-[rgba(255,255,255,0.05)] border border-[#828282] text-white font-normal text-sm px-7 py-2 rounded-full'
                                        onClick={() => handleGetStarted(item)}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            {isShow && (
                <Elements stripe={stripePromise}>
                    <AddSubscriptionModal
                        onClose={() => {
                            bundleModal.closeModal();
                            setIsShow(false);
                            // Reset description states when payment modal is closed
                            setShowDescriptionModal(false);
                            setCurrentBundle(null);
                            setFormData([]);
                            setCurrentDescriptionIndex(0);
                            formDataRef.current = []; // Reset ref
                        }}
                        isEdit={isShow}
                        mutate={(formData) => {
                            
                            // Use ref to get the most current form data
                            const finalFormData = formDataRef.current;
                            console.log('Final form data being sent:', finalFormData);
                            console.log('Form data received:', formData);
                            
                            // Check if there are any files to upload
                            const hasFiles = finalFormData.some(item => item.image && item.image instanceof File);
                            
                            if (hasFiles) {
                                // Use FormData for file uploads
                                const dataWithContent = new FormData();
                                
                                // Add basic payment info
                                dataWithContent.append('package_id', formData.package_id || currentBundle?.id);
                                dataWithContent.append('stripe_token', formData.stripe_token);
                                
                                // Add each graphic's data
                                finalFormData.forEach((item, index) => {
                                    // Add content
                                    dataWithContent.append(`data[${index}][content]`, item.content || '');
                                    
                                    // Add image file if exists
                                    if (item.image && item.image instanceof File) {
                                        dataWithContent.append(`data[${index}][image]`, item.image);
                                    }
                                });
                                
                                // Add any other properties from formData
                                Object.keys(formData).forEach(key => {
                                    if (!['package_id', 'stripe_token'].includes(key)) {
                                        dataWithContent.append(key, formData[key]);
                                    }
                                });

                                console.log('=== FormData contents ===');
                                for (let [key, value] of dataWithContent.entries()) {
                                    console.log(`${key}:`, value);
                                }

                                mutation.mutate(dataWithContent);
                            } else {
                                // No files, use regular JSON
                                const dataWithContent = {
                                    package_id: formData.package_id || currentBundle?.id,
                                    stripe_token: formData.stripe_token,
                                    data: finalFormData.map(item => ({
                                        content: item.content || '',
                                        image: null
                                    }))
                                };
                                
                                // Add any other properties from formData
                                Object.keys(formData).forEach(key => {
                                    if (!['package_id', 'stripe_token'].includes(key)) {
                                        dataWithContent[key] = formData[key];
                                    }
                                });

                                console.log('=== JSON payload ===');
                                console.log(dataWithContent);

                                mutation.mutate(dataWithContent);
                            }
                        }}
                    />
                </Elements>
            )}

            {/* Description Collection Modal */}
            {showDescriptionModal && currentBundle && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-lg">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#D4BC6D] mb-2">
                                Graphic Details
                            </h2>
                            <p className="text-gray-300 text-sm">
                                Graphic {currentDescriptionIndex + 1} of {formData.length} for {currentBundle?.title}
                            </p>
                            <div className="mt-4 bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-[#D4BC6D] h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${((currentDescriptionIndex + 1) / formData.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="mb-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Description for Graphic {currentDescriptionIndex + 1} (Optional)
                                </label>
                                <textarea
                                    placeholder="Enter description for this graphic or leave empty to skip..."
                                    defaultValue={formData[currentDescriptionIndex]?.content || ''}
                                    className="w-full p-3 border border-[#4B4C46] rounded-lg bg-transparent text-white focus:border-[#D4BC6D] outline-none resize-none"
                                    rows="4"
                                    id="description-input"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Upload Image for Graphic {currentDescriptionIndex + 1} (Optional)
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-input"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                // Preview the selected image
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    const preview = document.getElementById('image-preview');
                                                    if (preview) {
                                                        preview.src = e.target.result;
                                                        preview.classList.remove('hidden');
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label 
                                        htmlFor="image-input"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#4B4C46] rounded-lg cursor-pointer hover:border-[#D4BC6D] transition-colors bg-transparent"
                                    >
                                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="text-sm text-gray-400">Click to upload image</span>
                                    </label>
                                    
                                    {/* Image Preview */}
                                    <img 
                                        id="image-preview" 
                                        className="hidden mt-2 max-w-full h-32 object-cover rounded-lg border border-[#4B4C46]" 
                                        alt="Preview" 
                                    />
                                </div>
                            </div>
                            
                            <p className="text-xs text-gray-400">
                                Both description and image are optional. You can skip either or both and continue.
                            </p>
                        </div>

                        <div className="flex justify-between gap-3">
                            <button
                                onClick={handleDescriptionBack}
                                className="px-4 py-2 bg-[#4B4C46] text-white rounded-lg hover:bg-[#5a5b54] transition"
                            >
                                {currentDescriptionIndex === 0 ? 'Cancel' : 'Back'}
                            </button>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDescriptionSkip}
                                    className="px-4 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={() => {
                                        const input = document.getElementById('description-input');
                                        const imageInput = document.getElementById('image-input');
                                        const formEntry = {
                                            content: input.value || '',
                                            image: imageInput.files[0] || null
                                        };
                                        handleDescriptionNext(formEntry);
                                    }}
                                    className="px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#b89f4e] transition font-medium"
                                >
                                    {currentDescriptionIndex === formData.length - 1 ? 'Continue to Payment' : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Bundles
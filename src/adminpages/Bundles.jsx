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


const stripePromise = loadStripe('pk_test_51LO709EoIN0qcO1SAQ6hl12BkCOI93FAQ8u9n2cnVA4kuz4YIpx0c50TeUJHHGUFiZnniCvwal7FS1ZM5EHyCy8400wxefrAoU');

const Bundles = () => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = React.useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = React.useState(false);
    const [currentBundle, setCurrentBundle] = React.useState(null);
    const [descriptions, setDescriptions] = React.useState([]);
    const [currentDescriptionIndex, setCurrentDescriptionIndex] = React.useState(0);
    const descriptionsRef = useRef([]); // Add ref to store descriptions
    
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
            // console.log('=== MUTATION FUNCTION CALLED ===');
            // console.log('Mutation received data:', form);
            // console.log('Data type:', typeof form);
            // console.log('Data keys:', Object.keys(form));
            // console.log('Content field exists:', 'content' in form);
            // console.log('Content value:', form.content);
            // console.log('=== END MUTATION LOG ===');
            return postRequest('/buy-bundles', form);
        },
        onSuccess: (data) => {
            // console.log('Mutation success:', data);
            if (data?.statusCode === 200) {
                toast.success(data?.message);
                setIsShow(false);
                // Reset states
                setShowDescriptionModal(false);
                setCurrentBundle(null);
                setDescriptions([]);
                setCurrentDescriptionIndex(0);
                descriptionsRef.current = []; // Reset ref
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
            const initialDescriptions = new Array(graphicCount).fill('');
            setDescriptions(initialDescriptions);
            descriptionsRef.current = initialDescriptions; // Initialize ref
            setCurrentDescriptionIndex(0);
            setShowDescriptionModal(true);
        }
    }

    const handleDescriptionNext = (description) => {
        const newDescriptions = [...descriptions];
        newDescriptions[currentDescriptionIndex] = description || null;
        setDescriptions(newDescriptions);
        descriptionsRef.current = newDescriptions; // Update ref immediately

        if (currentDescriptionIndex < descriptions.length - 1) {
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
        handleDescriptionNext('');
    }

    const handleDescriptionBack = () => {
        if (currentDescriptionIndex > 0) {
            setCurrentDescriptionIndex(currentDescriptionIndex - 1);
        } else {
            // Close description modal if at first step
            setShowDescriptionModal(false);
            setCurrentBundle(null);
            setDescriptions([]);
            setCurrentDescriptionIndex(0);
            descriptionsRef.current = []; // Reset ref
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
                            setDescriptions([]);
                            setCurrentDescriptionIndex(0);
                            descriptionsRef.current = []; // Reset ref
                        }}
                        isEdit={isShow}
                        mutate={(formData) => {
                            
                            // Use ref to get the most current descriptions
                            const finalDescriptions = descriptionsRef.current;
                            // console.log('Final descriptions being sent:', finalDescriptions);
                            // console.log('Form data received:', formData);
                            // console.log('Form data type:', typeof formData);
                            // console.log('Is FormData:', formData instanceof FormData);
                            // console.log('Current bundle:', currentBundle);
                            
                            // Handle both FormData and regular object
                            let dataWithContent;
                            
                            if (formData instanceof FormData) {
                                // If it's FormData, append content to it
                                console.log('Handling as FormData');
                                dataWithContent = new FormData();
                                
                                // Copy existing FormData entries
                                for (let [key, value] of formData.entries()) {
                                    dataWithContent.append(key, value);
                                }
                                
                                // Add content as JSON string
                                dataWithContent.append('content', JSON.stringify(finalDescriptions));
                                
                                for (let [key, value] of dataWithContent.entries()) {
                                    console.log(`${key}:`, value);
                                }
                            } else {
                                // If it's a regular object
                                // console.log('Handling as regular object');
                                dataWithContent = {
                                    package_id: formData.package_id || currentBundle?.id,
                                    stripe_token: formData.stripe_token,
                                    content: finalDescriptions
                                };
                                
                                // Add any other properties from formData
                                Object.keys(formData).forEach(key => {
                                    if (!['package_id', 'stripe_token'].includes(key)) {
                                        dataWithContent[key] = formData[key];
                                    }
                                });

                                // console.log('Complete payload being sent:', dataWithContent);
                                // console.log('Payload keys:', Object.keys(dataWithContent));
                            }

                            // console.log('=== CALLING MUTATION ===');
                            mutation.mutate(dataWithContent);
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
                                Graphic Description
                            </h2>
                            <p className="text-gray-300 text-sm">
                                Graphic {currentDescriptionIndex + 1} of {descriptions.length} for {currentBundle?.title}
                            </p>
                            <div className="mt-4 bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-[#D4BC6D] h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${((currentDescriptionIndex + 1) / descriptions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-white mb-2">
                                Description for Graphic {currentDescriptionIndex + 1} (Optional)
                            </label>
                            <textarea
                                placeholder="Enter description for this graphic or leave empty to skip..."
                                defaultValue={descriptions[currentDescriptionIndex] || ''}
                                className="w-full p-3 border border-[#4B4C46] rounded-lg bg-transparent text-white focus:border-[#D4BC6D] outline-none resize-none"
                                rows="4"
                                id="description-input"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                You can leave this empty and continue to the next graphic.
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
                                        handleDescriptionNext(input.value);
                                    }}
                                    className="px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#b89f4e] transition font-medium"
                                >
                                    {currentDescriptionIndex === descriptions.length - 1 ? 'Continue to Payment' : 'Next'}
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
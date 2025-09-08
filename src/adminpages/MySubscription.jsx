import React, { useState } from 'react'
import { getRequest, postRequest } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddSubscriptionModal from '../components/subscriptions/AddSubscriptionModal';
import { queryClient } from '../main';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';


const MySubscription = () => {
    // State for bundle details modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBundle, setSelectedBundle] = useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['my-packages'], // Unique key for caching
        queryFn: () => getRequest('/my-subscriptions'), // Fetch function
    });

    // Add the my-bundles API call
    const { data: bundlesData, isLoading: bundlesLoading, error: bundlesError } = useQuery({
        queryKey: ['my-bundles'], // Unique key for caching
        queryFn: () => getRequest('/my-bundles'), // Fetch function
    });

    const getColor = (type) => {
        switch (type) {
            case 'free': return 'bg-green-500';
            case 'monthly': return 'bg-blue-500';
            case 'yearly': return 'bg-purple-500';
            default: return 'bg-gray-400';
        }
    };

    // Mutation for updating bundle content
    const updateBundleMutation = useMutation({
        mutationFn: ({ bundle_id, content }) => postRequest('/update-bundle', { bundle_id, content }),
        onSuccess: (response) => {
            toast.success(response?.message || 'Bundle updated successfully!');
            setIsModalOpen(false);
            // Refetch the bundles data to show updated content
            queryClient.invalidateQueries(['my-bundles']);
        },
        onError: (error) => {
            console.error('Error updating bundle:', error);
            toast.error(error?.response?.data?.message || 'Failed to update bundle. Please try again.');
        }
    });

    // Function to handle opening the details modal
    const handleViewDetails = (bundle) => {
        setSelectedBundle(bundle);
        setIsModalOpen(true);
    };

    // console.log('My Subscription Data:', data);
    // console.log('My Bundles Data:', bundlesData);
    // console.log('Bundles Loading:', bundlesLoading);
    // console.log('Bundles Error:', bundlesError);

    return (
        <>
            <div className="card-gradient !border-[1.5px] p-3 sm:p-6 rounded-3xl">
                <h2 className='text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-12 lg:mb-16'>
                    My Subscriptions
                </h2>

                <div className="w-full">
                    {/* Existing Subscriptions Section */}
                    <div className="mb-12 sm:mb-16 lg:mb-24">
                        <h3 className='text-white font-bold text-lg sm:text-xl lg:text-2xl mb-6'>
                            My Subscriptions
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">{data?.map((item) => (
                            item?.package?.is_active == 1 && (
                                <div key={item?.id} className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 card-gradient !border-[1.5px] rounded-3xl w-full min-w-0">
                                    <div className={`absolute top-3 sm:top-4 lg:top-5 right-4 sm:right-0 sm:-translate-x-1/2 text-white text-sm sm:text-base capitalize font-semibold px-3 sm:px-4 py-1 rounded-full shadow-md ${getColor(item?.type)}`}>
                                        {item?.package?.type}
                                    </div>
                                    <div className="">
                                        <h4 className='text-white font-semibold text-lg sm:text-xl lg:text-2xl mb-2'>
                                            {item?.package?.name}
                                        </h4>
                                        <p className='text-white font-normal text-xs sm:text-sm mb-3 sm:mb-4'>
                                            {item?.package?.description}
                                        </p>
                                        <img src="/line2.svg" alt="line" className='w-full mb-6 sm:mb-8 lg:mb-11' />
                                    </div>
                                    <div className="flex gap-3 sm:gap-4 lg:gap-5 flex-col">
                                        <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                                            <div className="">
                                                <svg
                                                    width={'1.2rem'}
                                                    height={'1.2rem'}
                                                    className="sm:w-[1.5rem] sm:h-[1.5rem] lg:w-[1.813rem] lg:h-[1.813rem]"
                                                    viewBox="0 0 29 29"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width={29} height={29} rx={10} fill="#D4BC6D" />
                                                    <path
                                                        d="M17.8594 12.5156C18.0312 12.6875 18.1172 12.8958 18.1172 13.1406C18.1172 13.3854 18.0312 13.5964 17.8594 13.7734L14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141C13.2839 16.7422 13.1953 16.5326 13.1953 16.2852C13.1953 16.0378 13.2839 15.8281 13.4609 15.6562L16.6016 12.5156C16.7734 12.3385 16.9831 12.25 17.2305 12.25C17.4779 12.25 17.6875 12.3385 17.8594 12.5156ZM14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141L11.5703 15.0312C11.3984 14.8542 11.3125 14.6432 11.3125 14.3984C11.3125 14.1536 11.3984 13.9453 11.5703 13.7734C11.7474 13.5964 11.9583 13.5078 12.2031 13.5078C12.4479 13.5078 12.6562 13.5964 12.8281 13.7734L14.7188 15.6562C14.8906 15.8281 14.9766 16.0378 14.9766 16.2852C14.9766 16.5326 14.8906 16.7422 14.7188 16.9141Z"
                                                        fill="white"
                                                    />
                                                </svg>

                                            </div>
                                            <p className='text-white font-normal text-xs sm:text-sm'>
                                                30+ Features
                                            </p>
                                        </div>
                                        <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                                            <div className="">
                                                <svg
                                                    width={'1.2rem'}
                                                    height={'1.2rem'}
                                                    className="sm:w-[1.5rem] sm:h-[1.5rem] lg:w-[1.813rem] lg:h-[1.813rem]"
                                                    viewBox="0 0 29 29"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width={29} height={29} rx={10} fill="#D4BC6D" />
                                                    <path
                                                        d="M17.8594 12.5156C18.0312 12.6875 18.1172 12.8958 18.1172 13.1406C18.1172 13.3854 18.0312 13.5964 17.8594 13.7734L14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141C13.2839 16.7422 13.1953 16.5326 13.1953 16.2852C13.1953 16.0378 13.2839 15.8281 13.4609 15.6562L16.6016 12.5156C16.7734 12.3385 16.9831 12.25 17.2305 12.25C17.4779 12.25 17.6875 12.3385 17.8594 12.5156ZM14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141L11.5703 15.0312C11.3984 14.8542 11.3125 14.6432 11.3125 14.3984C11.3125 14.1536 11.3984 13.9453 11.5703 13.7734C11.7474 13.5964 11.9583 13.5078 12.2031 13.5078C12.4479 13.5078 12.6562 13.5964 12.8281 13.7734L14.7188 15.6562C14.8906 15.8281 14.9766 16.0378 14.9766 16.2852C14.9766 16.5326 14.8906 16.7422 14.7188 16.9141Z"
                                                        fill="white"
                                                    />
                                                </svg>

                                            </div>
                                            <p className='text-white font-normal text-xs sm:text-sm'>
                                                Priority Support
                                            </p>
                                        </div>
                                        <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                                            <div className="">
                                                <svg
                                                    width={'1.2rem'}
                                                    height={'1.2rem'}
                                                    className="sm:w-[1.5rem] sm:h-[1.5rem] lg:w-[1.813rem] lg:h-[1.813rem]"
                                                    viewBox="0 0 29 29"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width={29} height={29} rx={10} fill="#D4BC6D" />
                                                    <path
                                                        d="M17.8594 12.5156C18.0312 12.6875 18.1172 12.8958 18.1172 13.1406C18.1172 13.3854 18.0312 13.5964 17.8594 13.7734L14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141C13.2839 16.7422 13.1953 16.5326 13.1953 16.2852C13.1953 16.0378 13.2839 15.8281 13.4609 15.6562L16.6016 12.5156C16.7734 12.3385 16.9831 12.25 17.2305 12.25C17.4779 12.25 17.6875 12.3385 17.8594 12.5156ZM14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141L11.5703 15.0312C11.3984 14.8542 11.3125 14.6432 11.3125 14.3984C11.3125 14.1536 11.3984 13.9453 11.5703 13.7734C11.7474 13.5964 11.9583 13.5078 12.2031 13.5078C12.4479 13.5078 12.6562 13.5964 12.8281 13.7734L14.7188 15.6562C14.8906 15.8281 14.9766 16.0378 14.9766 16.2852C14.9766 16.5326 14.8906 16.7422 14.7188 16.9141Z"
                                                        fill="white"
                                                    />
                                                </svg>

                                            </div>
                                            <p className='text-white font-normal text-xs sm:text-sm'>
                                                4 Team Members
                                            </p>
                                        </div>
                                        <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                                            <div className="">
                                                <svg
                                                    width={'1.2rem'}
                                                    height={'1.2rem'}
                                                    className="sm:w-[1.5rem] sm:h-[1.5rem] lg:w-[1.813rem] lg:h-[1.813rem]"
                                                    viewBox="0 0 29 29"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width={29} height={29} rx={10} fill="#373737" />
                                                    <path
                                                        d="M17.8594 12.5156C18.0312 12.6875 18.1172 12.8958 18.1172 13.1406C18.1172 13.3854 18.0312 13.5964 17.8594 13.7734L14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141C13.2839 16.7422 13.1953 16.5326 13.1953 16.2852C13.1953 16.0378 13.2839 15.8281 13.4609 15.6562L16.6016 12.5156C16.7734 12.3385 16.9831 12.25 17.2305 12.25C17.4779 12.25 17.6875 12.3385 17.8594 12.5156ZM14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141L11.5703 15.0312C11.3984 14.8542 11.3125 14.6432 11.3125 14.3984C11.3125 14.1536 11.3984 13.9453 11.5703 13.7734C11.7474 13.5964 11.9583 13.5078 12.2031 13.5078C12.4479 13.5078 12.6562 13.5964 12.8281 13.7734L14.7188 15.6562C14.8906 15.8281 14.9766 16.0378 14.9766 16.2852C14.9766 16.5326 14.8906 16.7422 14.7188 16.9141Z"
                                                        fill="#9E9E9E"
                                                    />
                                                </svg>


                                            </div>
                                            <p className='text-white font-normal text-xs sm:text-sm'>
                                                Premium Features
                                            </p>
                                        </div>
                                        <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                                            <div className="">
                                                <svg
                                                    width={'1.2rem'}
                                                    height={'1.2rem'}
                                                    className="sm:w-[1.5rem] sm:h-[1.5rem] lg:w-[1.813rem] lg:h-[1.813rem]"
                                                    viewBox="0 0 29 29"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width={29} height={29} rx={10} fill="#373737" />
                                                    <path
                                                        d="M17.8594 12.5156C18.0312 12.6875 18.1172 12.8958 18.1172 13.1406C18.1172 13.3854 18.0312 13.5964 17.8594 13.7734L14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141C13.2839 16.7422 13.1953 16.5326 13.1953 16.2852C13.1953 16.0378 13.2839 15.8281 13.4609 15.6562L16.6016 12.5156C16.7734 12.3385 16.9831 12.25 17.2305 12.25C17.4779 12.25 17.6875 12.3385 17.8594 12.5156ZM14.7188 16.9141C14.5417 17.0859 14.3307 17.1719 14.0859 17.1719C13.8411 17.1719 13.6328 17.0859 13.4609 16.9141L11.5703 15.0312C11.3984 14.8542 11.3125 14.6432 11.3125 14.3984C11.3125 14.1536 11.3984 13.9453 11.5703 13.7734C11.7474 13.5964 11.9583 13.5078 12.2031 13.5078C12.4479 13.5078 12.6562 13.5964 12.8281 13.7734L14.7188 15.6562C14.8906 15.8281 14.9766 16.0378 14.9766 16.2852C14.9766 16.5326 14.8906 16.7422 14.7188 16.9141Z"
                                                        fill="#9E9E9E"
                                                    />
                                                </svg>


                                            </div>
                                            <p className='text-white font-normal text-xs sm:text-sm'>
                                                Data Insights
                                            </p>
                                        </div>
                                    </div>
                                    <div className="my-6 sm:my-7 lg:my-9">
                                        <p className='text-2xl sm:text-3xl lg:text-5xl font-medium text-white mb-2'>
                                            ${item?.package?.price}
                                            <span className='font-normal text-xs sm:text-sm'>
                                                /per {item?.package?.duration_in_days} days
                                            </span>
                                        </p>
                                    </div>
                                    {/* <button
                                            type='button'
                                            className='bg-[rgba(255,255,255,0.05)] border border-[#828282] text-white font-normal text-sm px-7 py-2 rounded-full'
                                            onClick={() => handleGetStarted(item)}
                                        >
                                            Get Started
                                        </button> */}
                                </div>
                            )
                        ))}
                        </div>
                    </div>

                    {/* My Bundles Section */}
                    <div className="mb-12 sm:mb-16 lg:mb-24">
                        <h3 className='text-white font-bold text-lg sm:text-xl lg:text-2xl mb-6'>
                            My Bundles/Packages
                        </h3>

                        {bundlesLoading && (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4BC6D] mx-auto mb-4"></div>
                                <p className="text-gray-400">Loading bundles...</p>
                            </div>
                        )}

                        {bundlesError && (
                            <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 mb-6">
                                <p className="text-red-400">Error loading bundles: {bundlesError.message}</p>
                            </div>
                        )}

                        {bundlesData && Array.isArray(bundlesData) && bundlesData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full">
                                {bundlesData?.map((bundle) => (
                                    <div
                                        key={bundle.id}
                                        className="relative px-4 sm:px-6 pt-8 sm:pt-10 pb-6 sm:pb-8 card-gradient !border-[1.5px] rounded-2xl sm:rounded-3xl hover:scale-105 transition-transform duration-300 w-full min-w-0"
                                    >
                                        {/* Bundle ID Badge */}
                                        <div className="absolute top-3 right-3 bg-[#D4BC6D] text-black text-xs font-semibold px-2 py-1 rounded-full">
                                            ID: {bundle.id}
                                        </div>

                                        {/* Bundle Title */}
                                        <div className="mb-4">
                                            <h4 className='text-white font-semibold text-lg sm:text-xl mb-2'>
                                                {bundle.package?.title || 'Bundle Package'}
                                            </h4>

                                            {/* Package Description */}
                                            <div className='text-gray-300 font-normal text-xs sm:text-sm mb-4 leading-relaxed'>
                                                {bundle.package?.description ? (
                                                    bundle.package.description.split('\r\n').map((line, index) => (
                                                        line.trim() && (
                                                            <div key={index} className="mb-1">
                                                                {line.trim()}
                                                            </div>
                                                        )
                                                    ))
                                                ) : (
                                                    'No description available'
                                                )}
                                            </div>

                                            <img src="/line2.svg" alt="line" className='w-full mb-4' />
                                        </div>

                                        {/* Purchase Details */}
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-[#D4BC6D] rounded-full"></div>
                                                <p className='text-white font-normal text-xs sm:text-sm'>
                                                    <span className="text-gray-400">Package No:</span> {bundle.package_id}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <p className='text-white font-normal text-xs sm:text-sm'>
                                                    <span className="text-gray-400">Purchased:</span> {new Date(bundle.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="mb-4">
                                            <div className="flex items-baseline gap-2">
                                                <p className='text-2xl sm:text-3xl font-bold text-[#D4BC6D]'>
                                                    ${bundle.package?.price}
                                                </p>
                                                <span className='text-gray-400 text-xs sm:text-sm font-normal'>
                                                    per bundle
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status and Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-green-400 text-xs sm:text-sm font-medium">Active</span>
                                            </div>

                                            <button
                                                onClick={() => handleViewDetails(bundle)}
                                                className="bg-[#D4BC6D] hover:bg-[#C4AC5D] text-black font-medium text-xs sm:text-sm px-3 py-1.5 rounded-lg transition-colors duration-200"
                                            >
                                                View Details
                                            </button>
                                        </div>

                                        <div className="text-xs text-gray-400 mt-2 text-center">
                                            Updated: {new Date(bundle.updated_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mb-4">
                                    <svg
                                        className="mx-auto h-16 w-16 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-white font-medium text-lg mb-2">No Bundles Found</h4>
                                <p className="text-gray-400 text-sm">
                                    You haven't purchased any bundles yet. Browse our packages to get started.
                                </p>
                            </div>
                        )}
                    </div>


                </div>
            </div>

            {/* Bundle Details Modal */}
            {isModalOpen && selectedBundle && (
                <BundleDetailsModal
                    bundle={selectedBundle}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedBundle(null);
                    }}
                    onUpdate={updateBundleMutation.mutate}
                    isUpdating={updateBundleMutation.isPending}
                />
            )}
        </>
    )
}

// Bundle Details Modal Component
const BundleDetailsModal = ({ bundle, isOpen, onClose, onUpdate, isUpdating }) => {
    const [editingContent, setEditingContent] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // Initialize editing content when modal opens
    React.useEffect(() => {
        if (bundle?.content) {
            setEditingContent([...bundle.content]);
        }
    }, [bundle]);

    const handleContentChange = (index, value) => {
        const newContent = [...editingContent];
        newContent[index] = value;
        setEditingContent(newContent);
    };

    const handleSaveChanges = () => {
        // Filter out null/empty values and send to API
        const filteredContent = editingContent.filter(item => item !== null && item !== undefined && item.trim() !== '');
        onUpdate({
            bundle_id: bundle.id,
            content: filteredContent
        });
        setIsEditing(false);
    };

    const addContentField = () => {
        setEditingContent([...editingContent, '']);
    };

    const removeContentField = (index) => {
        const newContent = editingContent.filter((_, i) => i !== index);
        setEditingContent(newContent);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#282828] card-gradient border-[1.5px] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">
                        Bundle Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isUpdating}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Bundle Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Bundle ID</label>
                                <p className="text-white text-lg font-semibold">#{bundle.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Package Title</label>
                                <p className="text-white text-lg">{bundle.package?.title || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Price</label>
                                <p className="text-[#D4BC6D] text-xl font-bold">${bundle.package?.price}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Graphics Count</label>
                                <p className="text-white text-lg">{bundle.package?.graphic} Graphics</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Purchased Date</label>
                                <p className="text-white text-lg">
                                    {new Date(bundle.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <p className="text-white text-sm">{bundle.package?.description || 'No description available'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Details */}
                    <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-[#D4BC6D] flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Content Details
                            </h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-[#D4BC6D] hover:bg-[#C4AC5D] text-black font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                                    disabled={isUpdating}
                                >
                                    Edit Content
                                </button>
                            )}
                        </div>

                        <div className="text-sm text-gray-400 mb-4">
                            {editingContent.filter(item => item !== null && item !== undefined && item.trim() !== '').length} / {bundle.package?.graphic} Items
                        </div>

                        <div className="space-y-3">
                            {isEditing ? (
                                <>
                                    {editingContent.map((content, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-xs text-gray-400 mb-1">Content #{index + 1}</label>
                                                <div className="flex gap-2">
                                                    <textarea
                                                        value={content || ''}
                                                        onChange={(e) => handleContentChange(index, e.target.value)}
                                                        placeholder={`Enter content ${index + 1}...`}
                                                        className="flex-1 min-h-[80px] p-3 bg-[#282828] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] resize-none"
                                                        disabled={isUpdating}
                                                    />
                                                    <button
                                                        onClick={() => removeContentField(index)}
                                                        className="self-start mt-6 text-red-400 hover:text-red-300 p-1"
                                                        disabled={isUpdating}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {editingContent.length < parseInt(bundle.package?.graphic) && (
                                        <button
                                            onClick={addContentField}
                                            className="w-full border-2 border-dashed border-gray-600 hover:border-[#D4BC6D] text-gray-400 hover:text-[#D4BC6D] py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            disabled={isUpdating}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Content Field
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    {editingContent.map((content, index) => (
                                        <div key={index} className="bg-[#282828] rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-400">Content #{index + 1}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    content && content.trim() !== '' 
                                                        ? 'bg-green-600 text-green-100' 
                                                        : 'bg-yellow-600 text-yellow-100'
                                                }`}>
                                                    {content && content.trim() !== '' ? 'Submitted' : 'Pending'}
                                                </span>
                                            </div>
                                            <div className="text-white">
                                                {content && content.trim() !== '' ? (
                                                    <p className="whitespace-pre-wrap">{content}</p>
                                                ) : (
                                                    <p className="text-gray-500 italic">No content submitted</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                {isEditing && (
                    <div className="flex gap-3 p-4 sm:p-6 border-t border-gray-700">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                // Reset to original content
                                setEditingContent([...bundle.content]);
                            }}
                            className="flex-1 py-3 px-4 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            disabled={isUpdating}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            className="flex-1 py-3 px-4 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#C4AC5D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                                    Saving...
                                </div>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySubscription
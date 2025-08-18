import React from 'react'
import { getRequest, postRequest } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddSubscriptionModal from '../components/subscriptions/AddSubscriptionModal';
import { queryClient } from '../main';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51LO709EoIN0qcO1SAQ6hl12BkCOI93FAQ8u9n2cnVA4kuz4YIpx0c50TeUJHHGUFiZnniCvwal7FS1ZM5EHyCy8400wxefrAoU');

const Subscription = () => {
    const [isShow, setIsShow] = React.useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['get-packages'], // Unique key for caching
        queryFn: () => getRequest('/packages'), // Fetch function
    });

    const mutation = useMutation({
        mutationKey: ['add-subscription'],
        mutationFn: (form) => postRequest('/subscriptions', form),
        onSuccess: (data) => {
            if (data?.statusCode === 200) {
                toast.success(data?.message);
                setIsShow(false);
                queryClient.invalidateQueries({ queryKey: ['get-packages'] });
            }
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
            setIsShow(item);
        }
    }

    return (
        <>
            <div className="card-gradient !border-[1.5px] p-3 sm:p-6 rounded-3xl">
                <h2 className='text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-12 lg:mb-16'>
                    Subscription Breakdown
                </h2>

                <div className="max-h-[75dvh] overflow-y-auto">
                    <div className="mb-12 sm:mb-16 lg:mb-24">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7">{data?.map((item) => (
                                item?.is_active == 1 && (
                                    <div key={item?.id} className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 card-gradient !border-[1.5px] rounded-3xl w-full sm:w-[25.375rem]">
                                        <div className={`absolute top-3 sm:top-4 lg:top-5 right-4 sm:right-0 sm:-translate-x-1/2 text-white text-sm sm:text-base capitalize font-semibold px-3 sm:px-4 py-1 rounded-full shadow-md ${getColor(item?.type)}`}>
                                            {item?.type}
                                        </div>
                                        <div className="">
                                            <h4 className='text-white font-semibold text-lg sm:text-xl lg:text-2xl capitalize mb-2'>
                                                {item?.name}
                                            </h4>
                                            <p className='text-white font-normal text-xs sm:text-sm mb-3 sm:mb-4'>
                                                {item?.description}
                                            </p>
                                            <img src="/line2.svg" alt="line" className='w-full mb-6 sm:mb-8 lg:mb-11' />
                                        </div>
                                        <div className="flex gap-3 sm:gap-4 lg:gap-5 flex-col">
                                            {item?.points?.replaceAll('•', '')?.replaceAll(',', '')?.split('\n').map(item => item.trim())?.map((point, index) => (
                                                <div key={index} className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
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
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="my-6 sm:my-7 lg:my-9">
                                            <p className='text-2xl sm:text-3xl lg:text-5xl font-medium text-white mb-2'>
                                                ${item?.price}
                                                <span className='font-normal text-xs sm:text-sm'>
                                                    /per {item?.duration_in_days} days
                                                </span>
                                            </p>
                                        </div>
                                        <button
                                            type='button'
                                            className='bg-[rgba(255,255,255,0.05)] border border-[#828282] text-white font-normal text-xs sm:text-sm px-5 sm:px-6 lg:px-7 py-2 rounded-full w-full sm:w-auto'
                                            onClick={() => handleGetStarted(item)}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>


                </div>
            </div>


            {isShow && (
                <Elements stripe={stripePromise}>
                    <AddSubscriptionModal
                        onClose={() => setIsShow(false)}
                        isEdit={isShow}
                        mutate={mutation.mutate}
                    />
                </Elements>
            )}
        </>
    )
}

export default Subscription
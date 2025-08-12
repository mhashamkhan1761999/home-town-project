import React from 'react'
import { getRequest, postRequest } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddSubscriptionModal from '../components/subscriptions/AddSubscriptionModal';
import { queryClient } from '../main';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const MySubscription = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['my-packages'], // Unique key for caching
        queryFn: () => getRequest('/my-subscriptions'), // Fetch function
    });



    const getColor = (type) => {
        switch (type) {
            case 'free': return 'bg-green-500';
            case 'monthly': return 'bg-blue-500';
            case 'yearly': return 'bg-purple-500';
            default: return 'bg-gray-400';
        }
    };

    console.log('My Subscription Data:', data);

    return (
        <>
            <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
                <h2 className='text-white font-bold text-3xl mb-16'>
                    My Subscriptions
                </h2>

                <div className="max-h-[75dvh] overflow-y-auto">
                    <div className="mb-24">
                        <div className="flex gap-7">
                            {data?.map((item) => (
                                item?.package?.is_active == 1 && (
                                    <div key={item?.id} className="relative px-8 pt-16 pb-10 card-gradient !border-[1.5px] rounded-3xl w-[25.375rem]">
                                        <div className={`absolute top-5 right-0 -translate-x-1/2 text-white text-base capitalize font-semibold px-4 py-1 rounded-full shadow-md ${getColor(item?.type)}`}>
                                            {item?.package?.type}
                                        </div>
                                        <div className="">
                                            <h4 className='text-white font-semibold text-2xl mb-2'>
                                                {item?.package?.name}
                                            </h4>
                                            <p className='text-white font-normal text-sm mb-4'>
                                                {item?.package?.description}
                                            </p>
                                            <img src="/line2.svg" alt="line" className='w-full mb-11' />
                                        </div>
                                        <div className="flex gap-5 flex-col">
                                            <div className="flex gap-5 items-center">
                                                <div className="">
                                                    <svg
                                                        width={'1.813rem'}
                                                        height={'1.813rem'}
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
                                                <p className='text-white font-normal text-sm'>
                                                    30+ Features
                                                </p>
                                            </div>
                                            <div className="flex gap-5 items-center">
                                                <div className="">
                                                    <svg
                                                        width={'1.813rem'}
                                                        height={'1.813rem'}
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
                                                <p className='text-white font-normal text-sm'>
                                                    Priority Support
                                                </p>
                                            </div>
                                            <div className="flex gap-5 items-center">
                                                <div className="">
                                                    <svg
                                                        width={'1.813rem'}
                                                        height={'1.813rem'}
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
                                                <p className='text-white font-normal text-sm'>
                                                    4 Team Members
                                                </p>
                                            </div>
                                            <div className="flex gap-5 items-center">
                                                <div className="">
                                                    <svg
                                                        width={'1.813rem'}
                                                        height={'1.813rem'}
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
                                                <p className='text-white font-normal text-sm'>
                                                    Premium Features
                                                </p>
                                            </div>
                                            <div className="flex gap-5 items-center">
                                                <div className="">
                                                    <svg
                                                        width={'1.813rem'}
                                                        height={'1.813rem'}
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
                                                <p className='text-white font-normal text-sm'>
                                                    Data Insights
                                                </p>
                                            </div>
                                        </div>
                                        <div className="my-9">
                                            <p className='text-5xl font-medium text-white mb-2'>
                                                ${item?.package?.price}
                                                <span className='font-normal text-sm'>
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


                </div>
            </div>


        </>
    )
}

export default MySubscription
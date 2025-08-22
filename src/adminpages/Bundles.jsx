import React from 'react'
import { getRequest, postRequest } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddSubscriptionModal from '../components/subscriptions/AddSubscriptionModal';
import { queryClient } from '../main';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51LO709EoIN0qcO1SAQ6hl12BkCOI93FAQ8u9n2cnVA4kuz4YIpx0c50TeUJHHGUFiZnniCvwal7FS1ZM5EHyCy8400wxefrAoU');

const Bundles = () => {
    const [isShow, setIsShow] = React.useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['get-bundles'], // Unique key for caching
        queryFn: () => getRequest('/bundles'), // Fetch function
    });

    const mutation = useMutation({
        mutationKey: ['add-subscription'],
        mutationFn: (form) => postRequest('/buy-bundles', form),
        onSuccess: (data) => {
            if (data?.statusCode === 200) {
                toast.success(data?.message);
                setIsShow(false);
                // queryClient.invalidateQueries({ queryKey: ['get-packages'] });
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

    console.log(data, "data");

    return (
        <>
            <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
                <h2 className='text-white font-bold text-3xl mb-16'>
                    Bundles
                </h2>

                <div className="max-h-[75dvh] overflow-y-auto">
                    <div className="mb-24">
                        <div className="flex flex-wrap gap-7">
                            {data?.map((item) => (
                                <div key={item?.id} className="relative px-8 pt-16 pb-10 card-gradient !border-[1.5px] rounded-3xl w-[25.375rem]">
                                    {/* <div className={`absolute top-5 right-0 -translate-x-1/2 text-white text-base capitalize font-semibold px-4 py-1 rounded-full shadow-md ${getColor(item?.type)}`}>
                                        {item?.type}
                                    </div> */}
                                    <div className="">
                                        <h4 className='text-white font-semibold text-2xl capitalize mb-2'>
                                            {item?.title}
                                        </h4>
                                        <p className='text-white font-normal text-sm mb-4'>
                                            {item?.description}
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
                        onClose={() => setIsShow(false)}
                        isEdit={isShow}
                        mutate={mutation.mutate}
                    />
                </Elements>
            )}
        </>
    )
}

export default Bundles
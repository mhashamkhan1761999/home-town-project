import React, { useState } from 'react'
import AddTimingModal from './AddTimingModal'
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../api';

const StoreSetting = () => {
    const [isShow, setIsShow] = useState(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-timing'], // Unique key for caching
        queryFn: () => getRequest('/get-store-hours'), // Fetch function
    });

    const openModal = (values) => setIsShow(values);
    const closeModal = () => setIsShow(false);


    const formatedData = (scheduleData) => {
        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        const formatted = weekdays.reduce((acc, day) => {
            const value = scheduleData[day];
            if (value) {
                const [start, end] = value.split(' - ');
                acc[day] = [start, end];
            }
            return acc;
        }, {});

        return formatted;
    }

    return (
        <>
            <h2 className='text-white font-bold text-xl mb-6'>
                Store Settings
            </h2>
            <div className="border border-[#D4BC6D] py-7 px-9 rounded-3xl mb-4">
                <div className="flex justify-between">
                    <h2 className='text-white font-black text-base mb-6'>
                        Operating Hours
                    </h2>
                    {/* <div className="">
                        <button
                            className={`bg-[#D4BC6D] py-3.5 px-12 text-sm font-bold rounded-full text-white`}
                            type='button'
                            onClick={() => openModal(data)}
                        >
                            Edit
                        </button>
                    </div> */}
                </div>
                <p className='text-white font-medium text-base mb-7'>
                    Let your customers know when you are open.
                </p>
                <div className="flex gap-40">
                    <div className="!w-[17.813rem] flex flex-col gap-5">
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Monday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Tuesday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Wednesday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Thursday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                    </div>
                    <div className="!w-[17.813rem] flex flex-col gap-5">
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Friday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Saturday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                        <div className="flex w-full justify-between">
                            <h5 className='text-white font-bold text-base'>
                                Sunday
                            </h5>
                            <h5 className='text-[#D4BC6D] font-bold text-base'>
                                9 Am to 9 Pm
                            </h5>
                        </div>
                    </div>
                </div>

            </div>





            {isShow && (
                <AddTimingModal
                    onClose={closeModal}
                    isEdit={formatedData(isShow)}
                />
            )}

        </>
    )
}

export default StoreSetting
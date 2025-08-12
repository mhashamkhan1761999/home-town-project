import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { postRequest } from '../../api';
import { queryClient } from '../../main';

const AddTimingModal = ({ onClose, isEdit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            monday: isEdit?.monday,
            tuesday: isEdit?.tuesday,
            wednesday: isEdit?.wednesday,
            thursday: isEdit?.thursday,
            friday: isEdit?.friday,
            saturday: isEdit?.saturday,
            sunday: isEdit?.sunday,
        }
    });

    const mutation = useMutation({
        mutationKey: ['add-timing'],
        mutationFn: (form) => postRequest('/store-hours', form),
        onSuccess: () => {
            onClose();
            queryClient.invalidateQueries({ queryKey: ['get-timing'] });
        }
    })


    const onSubmit = (values) => {
        let data = {}
        Object.entries(values)?.map(([day, [time1, time2]]) => {
            data[`${day}`] = `${time1} - ${time2}`
        })

        mutation.mutate(data)

    }


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[rgba(217,217,217,0.03)] p-6 rounded-lg max-w-xl w-full">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#D4BC6D]">Store Edit</h2>
                        <button onClick={onClose} className="text-[#D4BC6D] text-2xl">&times;</button>
                    </div>

                    {/* Time Input Field */}
                    <form onSubmit={handleSubmit(onSubmit)} id="timing-form" className='h-[400px] overflow-y-auto'>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Monday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('monday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('monday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Tuesday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('tuesday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('tuesday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Wednesday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('wednesday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('wednesday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Thursday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('thursday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('thursday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Friday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('friday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('friday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Saturday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('saturday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('saturday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-6">
                            <label className="text-lg font-semibold text-[#D4BC6D] mb-2 inline-block">
                                Sunday Timing
                            </label>
                            <div className="flex">
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('sunday[0]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grow flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V5z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="time"
                                            {...register('sunday[1]')}
                                            className="h-full w-full border-0 outline-0 text-[#D4BC6D] bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
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
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTimingModal
import React from 'react';
import { useForm } from 'react-hook-form';

const Signup2 = ({ next, setData, goBack }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setData(prev => ({ ...prev, ...data }))
        console.log('Form Data:', data);
        setTimeout(() => {
            next()
        }, 500)
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[87.5rem] w-full mx-auto px-4 sm:px-6'>
                <h2 className='text-lg sm:text-xl font-bold text-center text-[#D4BC6D] mb-6'>Referral Code</h2>

                <div className="max-h-[37.5rem]">
                    <div className="mb-12">
                        <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 inline-block'>
                            Referral Code
                        </label>

                        <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                            <div className="p-4 invisible">
                                {/* SVG remains the same */}
                                <svg
                                    fill="none"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    {/* ... SVG Path */}
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <input
                                    {...register('referral_code')}
                                    type="text"
                                    placeholder='Enter Your Referral Code (Optional)'
                                    className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] text-sm sm:text-base p-4'
                                />
                            </div>
                        </div>

                        {errors?.referral_code && (
                            <p className="text-red-500 text-sm mt-2">{errors.referral_code.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex sm:flex-row gap-4 sm:gap-6">
                    <button
                        type='button'
                        onClick={goBack}
                        className="border-2 border-[#D4BC6D] text-[#D4BC6D] text-base sm:text-lg font-bold py-3 px-6 rounded-full w-full shadow-lg transition-colors"
                    >
                        Back
                    </button>

                    <button
                        type='submit'
                        className="bg-[#D4BC6D] text-black text-base sm:text-lg font-bold py-3 px-6 rounded-full w-full shadow-lg transition-colors"
                    >
                        Next
                    </button>
                </div>
            </form>

        </>
    )
}

export default Signup2
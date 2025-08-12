import React from 'react';
import { useForm } from 'react-hook-form';


const Signup1 = ({ next, setData }) => {
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
            <>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-[#D4BC6D] mb-6">
                        Contact Details
                    </h2>

                    <div className="max-h-[37.5rem]">
                        {/* Phone Field */}
                        <div className="mb-8 sm:mb-12">
                            <label className="text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block">
                                Phone Number
                            </label>
                            <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                <div className="p-4">
                                    {/* Phone Icon */}
                                    {/* ... (same SVG) */}
                                </div>
                                <div className="flex-grow">
                                    <input
                                        {...register('phone', { required: 'Phone Number is required' })}
                                        type="text"
                                        placeholder="Enter Your Phone Number"
                                        className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                            {errors?.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="mb-8 sm:mb-12">
                            <label className="text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block">
                                Email
                            </label>
                            <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                <div className="p-4">
                                    {/* Email Icon */}
                                    {/* ... (same SVG) */}
                                </div>
                                <div className="flex-grow">
                                    <input
                                        {...register('email', { required: 'Email is required' })}
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                            {errors?.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="mb-8 sm:mb-12">
                            <label className="text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block">
                                Create Password
                            </label>
                            <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                <div className="p-4">
                                    {/* Email Icon */}
                                    {/* ... (same SVG) */}
                                </div>
                                <div className="flex-grow">
                                    <input
                                        {...register('password', { required: 'Password is required' })}
                                        type="password"
                                        placeholder="Enter Your Password"
                                        className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                            {errors?.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Button Group */}
                    <div className="flex sm:flex-row gap-4 sm:gap-6 mt-4">
                        <button
                            type="button"
                            className="border-2 border-[#D4BC6D] text-[#D4BC6D] text-base sm:text-lg font-bold py-3 px-6 rounded-full w-full shadow-lg transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-[#D4BC6D] text-black text-base sm:text-lg font-bold py-3 px-6 rounded-full w-full shadow-lg transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </form>


            </>
        </>
    )
}

export default Signup1
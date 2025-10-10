import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const Signup1 = ({ next, setData }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const watchPassword = watch('password', '');

    const onSubmit = (data) => {
        setData(prev => ({ ...prev, ...data }))
        // console.log('Form Data:', data);
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
                                    {/* Password Icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10C19.1046 10 20 10.8954 20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12C4 10.8954 4.89543 10 6 10ZM8 8V10H16V8C16 6.89543 15.1046 6 14 6H10C8.89543 6 8 6.89543 8 8Z" fill="#6B6B6B"/>
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <input
                                        {...register('password', { 
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters long'
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                                                message: 'Password must contain at least one capital letter and one number'
                                            }
                                        })}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Your Password"
                                        className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm sm:text-base pr-12"
                                    />
                                </div>
                                <div className="p-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[#6B6B6B] hover:text-[#D4BC6D] transition-colors focus:outline-none"
                                    >
                                        {showPassword ? (
                                            /* Eye Slash Icon (Hide Password) */
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5M12.999 9.00078C13.5519 9.00078 14.0688 9.12935 14.5204 9.35716" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ) : (
                                            /* Eye Icon (Show Password) */
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.45703 12C3.73128 7.94291 7.52159 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C20.2672 16.0571 16.4769 19 11.9992 19C7.52159 19 3.73128 16.0571 2.45703 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors?.password && (
                                <div className="mt-2">
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                </div>
                            )}
                            {/* Password Requirements - Only show when typing */}
                            {watchPassword && watchPassword.length > 0 && (
                                <div className="mt-2 text-xs">
                                    <p className="text-[#6B6B6B] mb-2">Password requirements:</p>
                                    <ul className="space-y-1">
                                        <li className={`flex items-center gap-2 ${watchPassword.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="text-xs">
                                                {watchPassword.length >= 8 ? '✓' : '✗'}
                                            </span>
                                            At least 8 characters
                                        </li>
                                        <li className={`flex items-center gap-2 ${/[A-Z]/.test(watchPassword) ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="text-xs">
                                                {/[A-Z]/.test(watchPassword) ? '✓' : '✗'}
                                            </span>
                                            At least one capital letter
                                        </li>
                                        <li className={`flex items-center gap-2 ${/\d/.test(watchPassword) ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="text-xs">
                                                {/\d/.test(watchPassword) ? '✓' : '✗'}
                                            </span>
                                            At least one number
                                        </li>
                                    </ul>
                                </div>
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
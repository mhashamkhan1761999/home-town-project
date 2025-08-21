import React from 'react';
import { useForm } from 'react-hook-form';
import { postRequest } from '../api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveAuthenticated } from '../redux/slices/authSlice';

const AdminLoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const mutation = useMutation({
        mutationKey: ['admin-login'],
        mutationFn: (form) => postRequest('/auth/admin-login', form),
        onSuccess: (data) => {
            console.log('Login Response:', data);
            if (data?.statusCode == 200) {
                console.log('Login Successful:', data);

                dispatch(saveAuthenticated(data?.response?.data))
                toast?.success(data?.message);
                navigate('/admin/products')



            }
        }
    })


    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#D4BC6D] mb-10">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="max-h-[37.5rem]">
                    {/* Email Field */}
                    <div className="mb-8 sm:mb-12">
                        <label className="text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block">
                            Email
                        </label>
                        <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                            <div className="p-4">
                                {/* Email Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D4BC6D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4m0 0l-4 4m4-4v8" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <input
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full h-full border-0 outline-0 bg-transparent text-[#6B6B6B] text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-8 sm:mb-12">
                        <label className="text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block">
                            Password
                        </label>
                        <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                            <div className="p-4">
                                {/* Password Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D4BC6D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2v2h4v-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 11V9a6 6 0 0112 0v2h1a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6a1 1 0 011-1h1z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <input
                                    {...register('password', { required: 'Password is required' })}
                                    type="password"
                                    placeholder="Enter Your Password"
                                    className="w-full h-full border-0 outline-0 bg-transparent text-[#6B6B6B] text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#D4BC6D] text-black font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;

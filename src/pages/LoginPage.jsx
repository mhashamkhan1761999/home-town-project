import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postRequest } from '../api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveAuthenticated } from '../redux/slices/authSlice';

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showVerifyCodeModal, setShowVerifyCodeModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        register: registerForgot,
        handleSubmit: handleSubmitForgot,
        formState: { errors: errorsForgot },
        reset: resetForgot
    } = useForm();

    const {
        register: registerVerify,
        handleSubmit: handleSubmitVerify,
        formState: { errors: errorsVerify },
        reset: resetVerify
    } = useForm();

    const {
        register: registerReset,
        handleSubmit: handleSubmitReset,
        formState: { errors: errorsReset },
        reset: resetResetForm
    } = useForm();


    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (form) => postRequest('/auth/login', form),
        onSuccess: (data) => {
            // console.log('Login Response:', data);
            if (data?.statusCode == 200) {
                // console.log('Login Successful:', data);

                dispatch(saveAuthenticated(data?.response?.data))
                toast?.success(data?.message);
                if (data?.response?.data?.user?.role == 'admin') {
                    navigate('/admin/my-products')
                } else {
                    navigate('/athlete/nil-service')
                }
            }
        }
    });

    const forgotPasswordMutation = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: (form) => postRequest('/auth/forgot-password', form),
        onSuccess: (data) => {
            // console.log('Forgot Password Response:', data);
            if (data?.statusCode == 200) {
                toast.success('Reset code sent to your email');
                setResetEmail(data?.email || resetEmail);
                setShowForgotPasswordModal(false);
                setShowVerifyCodeModal(true);
                resetForgot();
            }
        },
        onError: (error) => {
            console.error('Forgot Password Error:', error);
            toast.error(error?.response?.data?.message || 'Failed to send reset code');
        }
    });

    const verifyCodeMutation = useMutation({
        mutationKey: ['verify-code'],
        mutationFn: (form) => postRequest('/auth/verify-code', form),
        onSuccess: (data) => {
            // console.log('Verify Code Response:', data);
            if (data?.statusCode == 200) {
                toast.success('Code verified successfully');
                setShowVerifyCodeModal(false);
                setShowResetPasswordModal(true);
                resetVerify();
            }
        },
        onError: (error) => {
            // console.error('Verify Error:', error);
            toast.error(error?.response?.data?.message || 'Invalid verification code');
        }
    });

    const resetPasswordMutation = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: (form) => postRequest('/auth/reset-password', form),
        onSuccess: (data) => {
            // console.log('Reset Password Response:', data);
            if (data?.statusCode == 200) {
                toast.success('Password reset successfully');
                setShowResetPasswordModal(false);
                resetResetForm();
                setVerificationCode('');
                setResetEmail('');
            }
        },
        onError: (error) => {
            // console.error('Reset Password Error:', error);
            toast.error(error?.response?.data?.message || 'Failed to reset password');
        }
    });


    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const onForgotPasswordSubmit = (data) => {
        setResetEmail(data.email);
        forgotPasswordMutation.mutate(data);
    };

    const onVerifyCodeSubmit = (data) => {
        setVerificationCode(data.code);
        verifyCodeMutation.mutate({ code: parseInt(data.code) });
    };

    const onResetPasswordSubmit = (data) => {
        if (data.password !== data.confirm_password) {
            toast.error('Passwords do not match');
            return;
        }
        resetPasswordMutation.mutate({
            code: parseInt(verificationCode),
            password: data.password,
            confirm_password: data.confirm_password
        });
    };

    const closeAllModals = () => {
        setShowForgotPasswordModal(false);
        setShowVerifyCodeModal(false);
        setShowResetPasswordModal(false);
        setResetEmail('');
        setVerificationCode('');
        resetForgot();
        resetVerify();
        resetResetForm();
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
                        disabled={mutation.isLoading}
                        className="w-full py-3 bg-[#D4BC6D] text-black font-semibold text-lg rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {mutation.isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Forgot Password Button */}
                    <button
                        type="button"
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="w-full mt-4 py-2 text-[#D4BC6D] font-medium text-sm hover:opacity-80 transition-all"
                    >
                        Forgot Password?
                    </button>
                </form>

                {/* Forgot Password Modal */}
                {showForgotPasswordModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-[#D4BC6D]">Forgot Password</h3>
                                <button
                                    onClick={closeAllModals}
                                    className="text-[#D4BC6D] hover:opacity-80"
                                >
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleSubmitForgot(onForgotPasswordSubmit)}>
                                <div className="mb-6">
                                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                        Email Address
                                    </label>
                                    <input
                                        {...registerForgot('email', { 
                                            required: 'Email is required',
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full p-3 bg-[rgba(217,217,217,0.03)] border border-[#4B4C46] rounded-lg text-white placeholder-[#6B6B6B]"
                                    />
                                    {errorsForgot.email && (
                                        <p className="text-red-500 text-sm mt-1">{errorsForgot.email.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={forgotPasswordMutation.isLoading}
                                    className="w-full py-3 bg-[#D4BC6D] text-black font-semibold text-lg rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                                >
                                    {forgotPasswordMutation.isLoading ? 'Sending...' : 'Send Reset Code'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Verify Code Modal */}
                {showVerifyCodeModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-[#D4BC6D]">Verify Code</h3>
                                <button
                                    onClick={closeAllModals}
                                    className="text-[#D4BC6D] hover:opacity-80"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-[#6B6B6B] mb-6">
                                Please enter the verification code sent to your email.
                            </p>
                            <form onSubmit={handleSubmitVerify(onVerifyCodeSubmit)}>
                                <div className="mb-6">
                                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                        Verification Code
                                    </label>
                                    <input
                                        {...registerVerify('code', { 
                                            required: 'Verification code is required',
                                            pattern: {
                                                value: /^\d+$/,
                                                message: 'Code must be numbers only'
                                            }
                                        })}
                                        type="text"
                                        placeholder="Enter verification code"
                                        className="w-full p-3 bg-[rgba(217,217,217,0.03)] border border-[#4B4C46] rounded-lg text-white placeholder-[#6B6B6B]"
                                    />
                                    {errorsVerify.code && (
                                        <p className="text-red-500 text-sm mt-1">{errorsVerify.code.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={verifyCodeMutation.isLoading}
                                    className="w-full py-3 bg-[#D4BC6D] text-black font-semibold text-lg rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                                >
                                    {verifyCodeMutation.isLoading ? 'Verifying...' : 'Verify Code'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reset Password Modal */}
                {showResetPasswordModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-[#D4BC6D]">Reset Password</h3>
                                <button
                                    onClick={closeAllModals}
                                    className="text-[#D4BC6D] hover:opacity-80"
                                >
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleSubmitReset(onResetPasswordSubmit)}>
                                <div className="mb-6">
                                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                        New Password
                                    </label>
                                    <input
                                        {...registerReset('password', { 
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        type="password"
                                        placeholder="Enter new password"
                                        className="w-full p-3 bg-[rgba(217,217,217,0.03)] border border-[#4B4C46] rounded-lg text-white placeholder-[#6B6B6B]"
                                    />
                                    {errorsReset.password && (
                                        <p className="text-red-500 text-sm mt-1">{errorsReset.password.message}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                        Confirm Password
                                    </label>
                                    <input
                                        {...registerReset('confirm_password', { 
                                            required: 'Please confirm your password'
                                        })}
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full p-3 bg-[rgba(217,217,217,0.03)] border border-[#4B4C46] rounded-lg text-white placeholder-[#6B6B6B]"
                                    />
                                    {errorsReset.confirm_password && (
                                        <p className="text-red-500 text-sm mt-1">{errorsReset.confirm_password.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={resetPasswordMutation.isLoading}
                                    className="w-full py-3 bg-[#D4BC6D] text-black font-semibold text-lg rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                                >
                                    {resetPasswordMutation.isLoading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;

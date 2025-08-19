import { useMutation } from '@tanstack/react-query';
import { CalendarClock, CreditCard, Lock, User } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { postRequest } from '../api';
import Faqs from '../components/Faqs';
import { useDispatch } from 'react-redux';

const Settings = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = React.useState("tab2");

    const mutation = useMutation({
        mutationKey: ['close-account'],
        mutationFn: (form) => postRequest('/close-account', form),
        onSuccess: (data) => {
            if (data?.statusCode == 200) {
                toast.success(data?.message);
                // Clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('athleteUser');

                // Redux logout
                dispatch(logout());

                // Redirect
                navigate('/login');
            }
        }
    })

    const handleCloseAccount = (reason) => {
        mutation.mutate({ close_account: reason });
    }



    const tabs = [
        // {
        //     id: "tab1",
        //     label: "Store Hours",
        //     content: (
        //         <>
        //             {/* // <StoreSetting /> */}
        //         </>

        //     )
        // },
        {
            id: "tab2",
            label: "Store Policies",
            content: (
                <>
                    <h2 className='text-[#D4BC6D] font-black text-lg mb-2.5'>
                        Privay Policy:
                    </h2>
                    <div className='text-white font-medium text-sm mb-7 space-y-4'>
                        <p><strong>1. Introduction</strong><br />
                        Hometown Hero ("we," "us," or "our") operates a web and mobile app that connects athletes with fans and sells custom merchandise. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

                        <p><strong>2. What We Collect</strong><br />
                        We may collect the following types of information:<br />
                        - Personal details like your name, email address, and social media handles.<br />
                        - Information related to athletes and users such as clicks, interactions, and activity on the platform.<br />
                        - Technical data like your IP address, browser, and device type.</p>

                        <p><strong>3. How We Collect It</strong><br />
                        We gather information when you:<br />
                        - Fill out forms on our website or app<br />
                        - Interact with our platform (clicks, navigation, logins, etc.)<br />
                        - Use third-party tools (like Google Analytics or others we may integrate)<br />
                        - Receive cookies and tracking data from your browser</p>

                        <p><strong>4. Why We Collect It</strong><br />
                        We collect data to:<br />
                        - Process orders and deliver merchandise<br />
                        - Personalize your experience and recommend content<br />
                        - Improve our platform through analytics<br />
                        - Send updates, product news, and occasional promotions via email or in-app messages</p>

                        <p><strong>5. Who We Share It With</strong><br />
                        We don’t sell or rent your personal information.<br />
                        We only share necessary data with trusted service providers like payment processors, email tools, or shipping services — just to help us run the business.</p>

                        <p><strong>6. Your Rights</strong><br />
                        You have the right to:<br />
                        - View or update your personal info<br />
                        - Request your data be deleted<br />
                        - Opt out of marketing emails at any time</p>

                        <p><strong>7. How We Protect Your Info</strong><br />
                        We use secure servers, encrypted connections, and password protections to keep your data safe. Only authorized team members can access sensitive info.</p>

                        <p><strong>8. For All Ages</strong><br />
                        Hometown Hero is open to users of all ages. We do not knowingly collect personal information from kids under 13 without parental consent.</p>

                        <p><strong>9. Updates to This Policy</strong><br />
                        If anything changes in how we handle your data, we’ll notify you through in-app notifications or email.</p>

                        <p><strong>10. Contact Us</strong><br />
                        If you have any questions or concerns, reach out anytime through the NIL agent.</p>
                    </div>
                </>
            )

        },
        {
            id: "tab3",
            label: "Payment Info",
            content: (
                <>
                    <h2 className='text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6'>
                        Add Card Details
                    </h2>

                   <div className="w-full max-w-full">
                    <div className="mb-8 sm:mb-12">
                        <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block'>
                            Card Number
                        </label>
                        <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[3rem] sm:h-[4rem]">
                            <div className="p-2 sm:p-4">
                                <CreditCard color='#fff' className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="grow">
                                <input type="number" placeholder='123 **** **** ****' className='h-full w-full border-0 outline-0 text-[#D4BC6D] text-sm sm:text-base px-2 sm:px-0' />
                            </div>
                            <div className="p-1 sm:p-2">
                                <button className='bg-[#D4BC6D] py-1.5 sm:py-2 px-4 sm:px-8 text-xs sm:text-sm font-bold text-white rounded-full' type='button'>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                        <div className="mb-8 sm:mb-12 w-full sm:grow">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block'>
                                Expiration Date
                            </label>
                            <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[3rem] sm:h-[4rem]">
                                <div className="p-2 sm:p-4">
                                    <CalendarClock color='#fff' className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="grow">
                                    <input type="date" className='h-full w-full border-0 outline-0 text-[#D4BC6D] text-sm sm:text-base px-2 sm:px-0' />
                                </div>
                                <div className="p-1 sm:p-2">
                                    <button className='bg-[#D4BC6D] py-1.5 sm:py-2 px-4 sm:px-8 text-xs sm:text-sm font-bold text-white rounded-full' type='button'>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8 sm:mb-12 w-full sm:grow">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block'>
                                Security Code
                            </label>
                            <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[3rem] sm:h-[4rem]">
                                <div className="p-2 sm:p-4">
                                    <Lock color='#fff' className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="grow">
                                    <input type="number" placeholder='123' className='h-full w-full border-0 outline-0 text-[#D4BC6D] text-sm sm:text-base px-2 sm:px-0' />
                                </div>
                                <div className="p-1 sm:p-2">
                                    <button className='bg-[#D4BC6D] py-1.5 sm:py-2 px-4 sm:px-8 text-xs sm:text-sm font-bold text-white rounded-full' type='button'>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 sm:mb-12">
                        <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-3 sm:mb-5 inline-block'>
                            Card Holder Name
                        </label>
                        <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[3rem] sm:h-[4rem]">
                            <div className="p-2 sm:p-4">
                                <User color='#fff' className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="grow">
                                <input type="text" placeholder='Sam raye' className='h-full w-full border-0 outline-0 text-[#D4BC6D] text-sm sm:text-base px-2 sm:px-0' />
                            </div>
                            <div className="p-1 sm:p-2">
                                <button className='bg-[#D4BC6D] py-1.5 sm:py-2 px-4 sm:px-8 text-xs sm:text-sm font-bold text-white rounded-full' type='button'>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>

        {/* Notice */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-700 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
                <p className="text-xs sm:text-sm font-medium text-yellow-800">
                    We will never place any charges on cards without prior information and authorization.
                </p>
            </div>
</div>


                </>
            )
        },
        {
            id: "tab4",
            label: "Close Your Account",
            content: (
                <>
                    <h2 className='text-white font-bold text-xl mb-6'>
                        Close Your Account
                    </h2>
                    <h2 className='text-[#D4BC6D] font-black text-lg mb-2.5'>
                        Why are you closing your account?
                    </h2>
                    <p className='text-white font-medium text-sm mb-7'>
                        Before you go, we’d love to understand why you’re choosing to close your account. Please let us know below — your feedback helps us improve:
                    </p>
                    <div className='mb-7'>
                        <textarea
                            className='w-full h-32 p-3 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]'
                            placeholder='Please share your reason for closing your account'
                        ></textarea>
                    </div>
                    <h2 className='text-[#D4BC6D] font-black text-lg mb-2.5'>
                        Important Information
                    </h2>
                    <p className='text-white font-medium text-sm mb-7'>
                        If you choose to permanently delete your Hometown Hero account, please note the following:
                        <ul className='list-disc pl-5 mt-2'>
                            <li>Your storefront will be permanently removed from the platform</li>
                            <li>All sales data, commissions, and payout history will be deleted</li>
                            <li>Any active or past NIL deals associated with your account will be cleared</li>
                            <li>Your custom designs, product links, and profile page will no longer be accessible</li>
                            <li>Your account will no longer appear in brand searches or athlete listings</li>
                        </ul>
                    </p>
                    <p className='text-white font-medium text-sm mb-7'>
                        This action is permanent and cannot be undone. If you’re sure you’d like to proceed, we’ll begin the account closure process right away.
                    </p>
                    <div className="flex gap-7">
                        <button
                            className={`bg-[#D4BC6D] py-3.5 px-12 text-sm font-bold rounded-full text-white`}
                            type='button'
                            onClick={() => handleCloseAccount(document?.querySelector('textarea')?.value)}
                        >
                            Yes
                        </button>
                        <button
                            className={`border border-[#D4BC6D] py-3.5 px-12 text-sm font-bold rounded-full text-white`}
                            type='button'
                            onClick={() => setActiveTab("tab2")}
                        >
                            No
                        </button>
                    </div>

                </>
            )
        },
        {
            id: "tab5",
            label: "FAQ",
            content: (
                <>
                    <h2 className='text-white font-bold text-xl mb-6'>
                        FAQ
                    </h2>
                    <div className="">
                        <Faqs />
                    </div>
                </>
            )
        },
    ];


    return (
        <>
            <div className="border-2 border-[#D4BC6D] px-3 sm:px-6 lg:px-8 p-3 sm:p-6 rounded-3xl">
                <h2 className='text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-12 lg:mb-16'>
                    Settings
                </h2>

                <div className="max-h-[75dvh] max-w-full overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-9">
                        {tabs?.map((tab) => (
                            <button
                                key={tab?.id}
                                onClick={() => setActiveTab(tab?.id)}
                                className={`${activeTab == tab?.id ? 'bg-[#D4BC6D] px-2' : 'border border-[#D4BC6D]'} py-2 sm:py-3.5 px-2 md:px-10 text-xs sm:text-sm font-bold rounded-full text-white`}
                                type='button'
                            >
                                {tab?.label}
                            </button>
                        ))}
                    </div>


                    {tabs?.map((tab) => (
                        tab?.id == activeTab && (
                            <React.Fragment key={tab?.id}>
                                {tab?.content}
                            </React.Fragment>
                        )
                    ))}


                </div>
            </div>
        </>
    )
}

export default Settings
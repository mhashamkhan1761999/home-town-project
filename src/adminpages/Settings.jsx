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
                    <h2 className='text-white font-bold text-xl mb-6'>
                        Store Policies
                    </h2>
                    <h2 className='text-[#D4BC6D] font-black text-lg mb-2.5'>
                        Terms & Conditions:
                    </h2>
                    <p className='text-white font-medium text-sm mb-7'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <h2 className='text-[#D4BC6D] font-black text-lg mb-2.5'>
                        Privacy Policy:
                    </h2>
                    <p className='text-white font-medium text-sm mb-7'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </>
            )
        },
        {
            id: "tab3",
            label: "Payment Info",
            content: (
                <>
                    <h2 className='text-white font-bold text-xl mb-6'>
                        Store Settings
                    </h2>

                    <div className="w-[1440px]">
                        <div className="mb-12">
                            <label className='text-lg font-semibold text-[#D4BC6D] mb-5 inline-block'>
                                Card Number
                            </label>
                            <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                <div className="p-4">
                                    <CreditCard color='#fff' />
                                </div>
                                <div className="grow">
                                    <input type="number" placeholder='123 **** **** ****' className='h-full w-full border-0 outline-0 text-[#D4BC6D]' />
                                </div>
                                <div className="p-2">
                                    <button className='bg-[#D4BC6D] py-2 px-8 text-sm font-bold text-white rounded-full' type='button'>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 w-full">
                            <div className="mb-12 grow">
                                <label className='text-lg font-semibold text-[#D4BC6D] mb-5 inline-block'>
                                    Expiration Date
                                </label>
                                <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <CalendarClock color='#fff' />
                                    </div>
                                    <div className="grow">
                                        <input type="date" className='h-full w-full border-0 outline-0 text-[#D4BC6D]' />
                                    </div>
                                    <div className="p-2">
                                        <button className='bg-[#D4BC6D] py-2 px-8 text-sm font-bold text-white rounded-full' type='button'>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-12 grow">
                                <label className='text-lg font-semibold text-[#D4BC6D] mb-5 inline-block'>
                                    Security Code
                                </label>
                                <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                    <div className="p-4">
                                        <Lock color='#fff' />
                                    </div>
                                    <div className="grow">
                                        <input type="number" placeholder='123' className='h-full w-full border-0 outline-0 text-[#D4BC6D]' />
                                    </div>
                                    <div className="p-2">
                                        <button className='bg-[#D4BC6D] py-2 px-8 text-sm font-bold text-white rounded-full' type='button'>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12">
                            <label className='text-lg font-semibold text-[#D4BC6D] mb-5 inline-block'>
                                Card Holder Name
                            </label>
                            <div className="flex items-center rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] h-[4rem]">
                                <div className="p-4">
                                    <User color='#fff' />
                                </div>
                                <div className="grow">
                                    <input type="text" placeholder='Sam raye' className='h-full w-full border-0 outline-0 text-[#D4BC6D]' />
                                </div>
                                <div className="p-2">
                                    <button className='bg-[#D4BC6D] py-2 px-8 text-sm font-bold text-white rounded-full' type='button'>
                                        Edit
                                    </button>
                                </div>
                            </div>
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
            <div className="border-2 border-[#D4BC6D] px-8 p-6 rounded-3xl">
                <h2 className='text-white font-bold text-3xl mb-16'>
                    Settings
                </h2>

                <div className="max-h-[75dvh] overflow-y-auto">
                    <div className="flex gap-4 mb-9">
                        {tabs?.map((tab) => (
                            <button
                                key={tab?.id}
                                onClick={() => setActiveTab(tab?.id)}
                                className={`${activeTab == tab?.id ? 'bg-[#D4BC6D]' : 'border border-[#D4BC6D]'} py-3.5 px-10 text-sm font-bold rounded-full text-white`}
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
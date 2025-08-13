import React, { useEffect } from 'react';
import { logout } from '../redux/slices/authSlice.js';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BadgeDollarSign, Home, Image, Layers, LogOut, Settings, User } from "lucide-react";
import AdminModal from "../components/AdminModal.jsx";
import AdminModal2 from '../components/AdminModal2.jsx';

const user = JSON.parse(localStorage.getItem('athleteUser'));


const SuperAdminLayout = () => {
    const user = useSelector((state) => state.authenticate.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShow, setIsShow] = React.useState(false);
    const [isShow2, setIsShow2] = React.useState(false);

    const profileImage = user?.profile_picture_url ? user.profile_picture_url : '/default.jpg';

    const handleLogout = async () => {
        try {
            // Optional: Backend API logout call
            // await postRequest('/logout');

            // Clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('athleteUser');

            // Redux logout
            dispatch(logout());

            // Redirect
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);

            localStorage.removeItem('token');
            localStorage.removeItem('athleteUser');
            dispatch(logout());
            navigate('/login');
        }
    };



    useEffect(() => {
        if (user?.agree == 0) {
            setIsShow(true);
            console.log('User Agree: ', user?.agree);
        }
    }, [user?.agree])

    useEffect(() => {
        if (!user?.athlete_name) {
            setIsShow2(true);
            console.log('User Age: ', user?.age);
        }
    }, [user?.age])

    console.log('user', user)




    return (
        <>
            <div className="p-4 flex bg-black h-[100dvh] overflow-y-auto">
                <div className="w-[10rem] min-w-[10rem] max-w-[10rem] h-full flex flex-col bg-black card-gradient !border-[1.5px] rounded-3xl">
                    <img src="/admin-logo.svg" alt="Logo" className="w-[4.438rem] h-auto mt-6 mx-auto" />

                    <div className="mt-6 mb-4 flex justify-center">
                        <NavLink
                            to="/athlete/profile"
                            className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden border-[2px] border-[#CAB265]">
                            <img
                                src={profileImage}
                                alt="User Profile"
                                className="w-full h-full object-cover object-center"
                            />
                        </NavLink>
                    </div>
                    <div className="mb-[2.75rem] mt-[3.125rem]">
                        <img src="/line.svg" alt="line" className="h-[1px] w-full" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6 pb-4">
                        <NavLink to="/admin/dashboard"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <Home size={18} />
                            Home
                        </NavLink>

                        <NavLink to="/admin/my-products"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <Layers size={18} />
                            My Products
                        </NavLink>
                    </div>
                    <div className="mb-[2.75rem] mt-[3.125rem]">
                        <img src="/line.svg" alt="line" className="h-[1px] w-full" />
                    </div>
                    <div className="flex flex-col mt-auto items-center gap-6 mb-11">
                        <p
                            className="text-[#6A6A69] font-bold text-base cursor-pointer hover:text-red-600 transition flex items-center gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            Log Out
                        </p>
                    </div>
                </div>

                <div className="grow">
                    <div className="w-full p-4 flex items-center">
                        <img src="/hometown-logo.svg" alt="Header" className="w-[23.188rem] h-auto" />




                        <div className="flex items-center justify-end grow gap-5">

                            <NavLink
                                to="/"
                                type='button'
                                className="bg-[#d4bc6d] h-[40px] inline-flex items-center justify-center rounded-full uppercase px-6 py-3 text-black text-sm font-semibold"
                            >
                                Visit Your Storefront
                            </NavLink>




                            <>
                                {/* Header Container */}
                                <div className="relative flex items-center justify-end p-4 bg-white shadow-md rounded-full">
                                    {/* Notification Bell Icon */}
                                    <div className="relative group">
                                        <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                                            {/* Bell Icon (Lucide or Heroicons or Font Awesome) */}
                                            <svg
                                                className="w-6 h-6 text-gray-600"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V9a6 6 0 10-12 0v3c0 1.42-.79 2.79-1.595 3.595L3 17h5m7 0a3 3 0 01-6 0m6 0H9"
                                                />
                                            </svg>
                                            {/* Notification Dot */}
                                            <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                            <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full" />
                                        </button>
                                        {/* Dropdown */}
                                        <div className="hidden group-hover:block absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            <div className="p-4 font-semibold border-b">Notifications</div>
                                            <ul className="max-h-60 overflow-y-auto">
                                                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                                                    🛍️ New order placed by John Doe
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                                                    📩 You received a new message
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                                                    🚀 Your campaign is now live!
                                                </li>
                                            </ul>
                                            <div className="p-2 text-center border-t text-sm text-blue-600 hover:underline cursor-pointer">
                                                View All
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>


                            <div className="relative w-[4.563rem] h-[4.563rem]">
                                {/* Avatar Image */}
                                <img
                                    src="/alek.jpeg"
                                    onError={(e) => (e.target.src = '/default-avatar.png')}
                                    alt="Admin Avatar"
                                    className="w-full h-full object-cover object-center rounded-full border border-gray-300"
                                />

                                {/* Notification Badge */}
                                <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-md">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>


            {/* {isShow && (
                <AdminModal onClose={() => setIsShow(false)} />
            )} */}

            {/* {isShow2 && (
                <AdminModal2 onClose={() => setIsShow2(false)} />
            )} */}

        </>
    );
};

export default SuperAdminLayout;

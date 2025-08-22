import React, { useEffect } from 'react';
import { logout } from '../redux/slices/authSlice';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BadgeDollarSign, Home, Image, Layers, LogOut, Settings, User } from "lucide-react";
import AdminModal from "../components/AdminModal.jsx";
import AdminModal2 from '../components/AdminModal2.jsx';

const user = JSON.parse(localStorage.getItem('athleteUser'));


const MasterLayout = () => {
    const user = useSelector((state) => state.authenticate.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShow, setIsShow] = React.useState(false);
    const [isShow2, setIsShow2] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
            <div className="p-2 md:p-4 flex bg-black h-[100dvh] overflow-y-auto">
                <div className="hidden md:flex w-[10rem] min-w-[10rem] max-w-[10rem] h-full flex-col bg-black card-gradient !border-[1.5px] rounded-3xl">
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
                        {/* <NavLink to="/athlete/profile"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <User size={18} />
                            Profile
                        </NavLink> */}
                        <NavLink to="/athlete/dashboard"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <Home size={18} />
                            Home
                        </NavLink>
                        <NavLink to="/athlete/nil-service"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <Layers size={18} />
                            Nil Service
                        </NavLink>
                        {/* <NavLink to="/athlete/graphic"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <Image size={18} />
                            Graphic
                        </NavLink> */}
                        <NavLink to="/athlete/subscription"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <BadgeDollarSign size={18} />
                            Subscription
                        </NavLink>
                        <NavLink to="/athlete/settings"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <Settings size={18} />
                            Settings
                        </NavLink>
                        <NavLink to="/athlete/my-subscription"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <BadgeDollarSign size={18} />
                            My Subscription
                        </NavLink>

                        <NavLink to="/athlete/my-products"
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
                        {/* Mobile: Small logo + hamburger */}
                        <div className="flex md:hidden items-center justify-between w-full">
                            <img src="/hometown-logo.svg" alt="Header" className="w-24 h-auto" />
                            <button 
                                className="p-2 text-white hover:text-[#D4BC6D]"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop: Full header */}
                        <div className="hidden md:flex items-center w-full">
                            <img src="/hometown-logo.svg" alt="Header" className="w-[23.188rem] h-auto" />

                            <div className="flex items-center justify-end grow gap-5">

                            <NavLink
                                to="/"
                                type='button'
                                className="bg-[#d4bc6d] h-[40px] inline-flex items-center justify-center rounded-full uppercase px-6 py-3 text-black text-sm font-semibold"
                            >
                                Visit Your Storefront
                            </NavLink>

                            <div className="w-[4.563rem] h-[4.563rem] rounded-full overflow-hidden">
                                <img src="/bronze2.jpg" alt="Admin Avatar"
                                    className="w-full h-full object-cover object-center" />
                            </div>
                            <div className="flex flex-col w-auto justify-center">
                                <div className='text-[#D4BC6D] font-bold mb-0.5'>
                                    Bronze
                                </div>
                                <div className='h-[10px] w-[150px] bg-[#282828] rounded-full'>
                                    <div className="h-full bg-[#D4BC6D] rounded-full" style={{ width: '10%' }} />
                                </div>
                            </div>

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


                            <div className="relative w-[4.563rem] h-[4.563rem] cursor-pointer group">
                                {/* Outer animated gradient ring */}
                                <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-spin-slow">
                                    <div className="w-full h-full rounded-full bg-black"></div>
                                </div>

                                {/* Avatar Image */}
                                <img
                                    src="/alek.jpeg"
                                    onError={(e) => (e.target.src = '/default-avatar.png')}
                                    alt="Agent Avatar"
                                    className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] object-cover object-center rounded-full border border-gray-700 shadow-lg"
                                />

                                {/* Notification Badge */}
                                <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-md">
                                    1
                                </div>

                                {/* Hover Label */}
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                                    Chat Now
                                </div>
                                </div>

                                <style jsx>{`
                                @keyframes spin-slow {
                                    from { transform: rotate(0deg); }
                                    to { transform: rotate(360deg); }
                                }
                                .animate-spin-slow {
                                    animation: spin-slow 6s linear infinite;
                                }
                                `}</style>

                            </div>
                        </div>
                    </div>

                    <div className="p-1 md:p-4">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[9999]" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="fixed top-0 left-0 h-full w-80 bg-black card-gradient border-r-[1.5px] p-4 z-[10000]" onClick={(e) => e.stopPropagation()}>
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between mb-6">
                            <img src="/admin-logo.svg" alt="Logo" className="w-16 h-auto" />
                            <button 
                                className="p-2 text-white hover:text-[#D4BC6D]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* User Profile Section */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-[2px] border-[#CAB265] mb-3">
                                <img
                                    src={profileImage}
                                    alt="User Profile"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <div className="text-center">
                                <div className='text-[#D4BC6D] font-bold mb-1'>Diamond</div>
                                <div className='h-[8px] w-32 bg-[#282828] rounded-full mx-auto'>
                                    <div className="h-full bg-[#D4BC6D] rounded-full" style={{ width: '60%' }} />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-4 mb-6">
                            <NavLink 
                                to="/athlete/dashboard"
                                className={({ isActive }) => `${isActive ? 'text-[#CAB265] bg-[#CAB265]/10' : 'text-[#6A6A69]'} font-bold text-base flex items-center gap-3 p-3 rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home size={20} />
                                Home
                            </NavLink>
                            <NavLink 
                                to="/athlete/nil-service"
                                className={({ isActive }) => `${isActive ? 'text-[#CAB265] bg-[#CAB265]/10' : 'text-[#6A6A69]'} font-bold text-base flex items-center gap-3 p-3 rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Layers size={20} />
                                Nil Service
                            </NavLink>
                            <NavLink 
                                to="/athlete/subscription"
                                className={({ isActive }) => `${isActive ? 'text-[#CAB265] bg-[#CAB265]/10' : 'text-[#6A6A69]'} font-bold text-base flex items-center gap-3 p-3 rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <BadgeDollarSign size={20} />
                                Subscription
                            </NavLink>
                            <NavLink 
                                to="/athlete/settings"
                                className={({ isActive }) => `${isActive ? 'text-[#CAB265] bg-[#CAB265]/10' : 'text-[#6A6A69]'} font-bold text-base flex items-center gap-3 p-3 rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Settings size={20} />
                                Settings
                            </NavLink>
                            <NavLink 
                                to="/athlete/my-subscription"
                                className={({ isActive }) => `${isActive ? 'text-[#CAB265] bg-[#CAB265]/10' : 'text-[#6A6A69]'} font-bold text-base flex items-center gap-3 p-3 rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <BadgeDollarSign size={20} />
                                My Subscription
                            </NavLink>
                            <NavLink 
                                to="/athlete/my-products"
                                className={({ isActive }) => `${isActive ? 'text-[#CAB265] bg-[#CAB265]/10' : 'text-[#6A6A69]'} font-bold text-base flex items-center gap-3 p-3 rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Layers size={20} />
                                My Products
                            </NavLink>
                        </div>

                        {/* Header Options */}
                        <div className="border-t border-[#323232] pt-4 mb-6">
                            <NavLink
                                to="/"
                                className="bg-[#d4bc6d] h-[40px] w-full inline-flex items-center justify-center rounded-full uppercase text-black text-sm font-semibold mb-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Visit Your Storefront
                            </NavLink>
                            
                            {/* Notifications */}
                            <div className="bg-white/10 rounded-lg p-3 mb-4">
                                <div className="flex items-center gap-3 text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V9a6 6 0 10-12 0v3c0 1.42-.79 2.79-1.595 3.595L3 17h5m7 0a3 3 0 01-6 0m6 0H9" />
                                    </svg>
                                    <span className="font-semibold">Notifications</span>
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                                </div>
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-[#323232] pt-4 mt-auto">
                            <button
                                className="text-[#6A6A69] font-bold text-base hover:text-red-600 transition flex items-center gap-3 p-3 rounded-lg w-full"
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <LogOut size={20} />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* {isShow && (
                <AdminModal onClose={() => setIsShow(false)} />
            )} */}

            {isShow2 && (
                <AdminModal2 onClose={() => setIsShow2(false)} />
            )}

        </>
    );
};

export default MasterLayout;

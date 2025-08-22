import React, { useEffect } from 'react';
import { logout } from '../redux/slices/authSlice.js';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart3, Package, Home, LogOut, Users, ShoppingCart, Trophy, Menu, X, DollarSign } from "lucide-react";
import AdminModal from "../components/AdminModal.jsx";
import AdminModal2 from '../components/AdminModal2.jsx';

const user = JSON.parse(localStorage.getItem('athleteUser'));


const SuperAdminLayout = () => {
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
            {/* Mobile Header */}
            <div className="lg:hidden bg-black p-4 flex items-center justify-between relative z-[100]">
                <img src="/admin-logo.svg" alt="Logo" className="w-[3rem] h-auto" />
                
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white p-2"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[90]" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-black card-gradient border-r-[1.5px] transform transition-transform duration-300 z-[110] ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-4">
                    <img src="/admin-logo.svg" alt="Logo" className="w-[4.438rem] h-auto mx-auto mb-6" />
                    
                    <div className="mb-4 flex justify-center">
                        <NavLink
                            className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden border-[2px] border-[#CAB265]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <img
                                src={profileImage}
                                alt="User Profile"
                                className="w-full h-full object-cover object-center"
                            />
                        </NavLink>
                    </div>
                    
                    <div className="mb-6">
                        <img src="/line.svg" alt="line" className="h-[1px] w-full" />
                    </div>
                    
                    <div className="flex flex-col gap-6">
                        <NavLink to="/admin/dashboard"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <BarChart3 size={18} />
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/products"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Package size={18} />
                            Products
                        </NavLink>

                        <NavLink to="/admin/users"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Users size={18} />
                            Users
                        </NavLink>

                        <NavLink to="/admin/orders"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <ShoppingCart size={18} />
                            Orders
                        </NavLink>

                        <NavLink to="/admin/athletes"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Trophy size={18} />
                            Athletes
                        </NavLink>

                        <NavLink to="/admin/athlete-products"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Package size={18} />
                            Athlete Launch
                        </NavLink>

                        <NavLink to="/admin/manage-cashout"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <DollarSign size={18} />
                            Manage Cashout
                        </NavLink>

                        <NavLink to="/admin/graphic-queries"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex items-center gap-3' : 'text-[#6A6A69] font-bold text-base flex items-center gap-3'}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Package size={18} />
                            Graphic Form Queries
                        </NavLink>
                    </div>
                    
                    <div className="mt-8 mb-6">
                        <img src="/line.svg" alt="line" className="h-[1px] w-full" />
                    </div>
                    
                    <div className="flex justify-center">
                        <button
                            className="text-[#6A6A69] font-bold text-base hover:text-red-600 transition flex items-center gap-3"
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <LogOut size={18} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex bg-black min-h-[100dvh]">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex w-[10rem] min-w-[10rem] max-w-[10rem] h-fit sticky top-4 flex-col bg-black card-gradient !border-[1.5px] rounded-3xl m-4">
                    <img src="/admin-logo.svg" alt="Logo" className="w-[4.438rem] h-auto mt-6 mx-auto" />

                    <div className="mt-2 mb-1 flex justify-center">
                        <NavLink
                            className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden border-[2px] border-[#CAB265]">
                            <img
                                src={profileImage}
                                alt="User Profile"
                                className="w-full h-full object-cover object-center"
                            />
                        </NavLink>
                    </div>
                    <div className="mb-[2rem] mt-[3.125rem]">
                        <img src="/line.svg" alt="line" className="h-[1px] w-full" />
                    </div>
                    
                    <div className="flex flex-col items-center justify-center gap-6 pb-4">
                        <NavLink to="/admin/dashboard"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 flex-col'}>
                            <BarChart3 size={18} />
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/products"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <Package size={18} />
                            Products
                        </NavLink>

                        <NavLink to="/admin/users"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <Users size={18} />
                            Users
                        </NavLink>

                        <NavLink to="/admin/orders"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <ShoppingCart size={18} />
                            Orders
                        </NavLink>

                        <NavLink to="/admin/athletes"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <Trophy size={18} />
                            Athletes
                        </NavLink>

                        <NavLink to="/admin/athlete-products"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <Package size={18} />
                            Athlete Launch
                        </NavLink>

                        <NavLink to="/admin/manage-cashout"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <DollarSign size={18} />
                            Manage Cashout
                        </NavLink>

                        <NavLink to="/admin/graphic-queries"
                            className={({ isActive }) => isActive ? 'text-[#CAB265] font-bold text-base flex flex-col items-center gap-2 text-center' : 'text-[#6A6A69] font-bold text-base flex items-center gap-2 text-center flex-col'}>
                            <Package size={18} />
                            Graphic Queries
                        </NavLink>
                    </div>
                    
                    <div className="mb-[2.75rem] mt-[3.125rem]">
                        <img src="/line.svg" alt="line" className="h-[1px] w-full" />
                    </div>
                    <div className="flex flex-col items-center gap-6 pb-4">
                        <p
                            className="text-[#6A6A69] font-bold text-base cursor-pointer hover:text-red-600 transition flex items-center gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            Log Out
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex w-full p-4 items-center">
                        <img src="/hometown-logo.svg" alt="Header" className="w-[23.188rem] h-auto" />

                        <div className="flex items-center justify-end grow gap-5">
                            <NavLink
                                to="/"
                                type='button'
                                className="bg-[#d4bc6d] h-[40px] inline-flex items-center justify-center rounded-full uppercase px-6 py-3 text-black text-sm font-semibold"
                            >
                                Admin Panel
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

                    {/* Content Area */}
                    <div className="flex-1 p-2 lg:p-4">
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

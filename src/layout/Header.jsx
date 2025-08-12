import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const isAuthenticated = useSelector(state => state?.authenticate?.isAuthenticated);
  const cartItems = useSelector(state => state?.cart?.items);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'about',
      link: '/our-team',
    },
    {
      name: 'services',
      link: '/athletes',
    },
    {
      name: 'shop by',
      link: '/explore-athletes',
    },
    // {
    //   name: 'store front',
    //   link: '/store-front',
    // },
    {
      name: 'quick links',
      items: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Policy', href: '/policy' },
      ],
    },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="bg-black py-5 relative z-50">
      <div className="flex items-center justify-between 2xl:max-w-[1880px] lg:max-w-[1400px] px-4 mx-auto">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-16" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center bg-[#ffffff19] rounded-full gap-6 px-10 h-16">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.link ?? "#"}
                className="text-white text-base font-medium capitalize inline-flex items-center"
              >
                {item.name}
                {item.items?.length && (
                  openDropdown === item.name
                    ? <ChevronUp className="ml-1 text-[#d4bc6d]" size={16} />
                    : <ChevronDown className="ml-1 text-[#d4bc6d]" size={16} />
                )}
              </Link>

              {item.items && openDropdown === item.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 bg-black rounded-lg shadow-lg z-10">
                  {item.items.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-4 py-2 text-white hover:bg-[#d4bc6d] hover:text-black rounded-md transition"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4 items-center">
          <Link
            to="/cart"
            className="bg-[#D4BC6D] rounded-full uppercase px-6 py-3 text-black text-sm font-semibold flex items-center relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-base font-semibold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems?.length}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link
              to="/athlete/dashboard"
              className="bg-[#d4bc6d] rounded-full uppercase px-6 py-3 text-black text-sm font-semibold"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="border-2 border-[#d4bc6d] text-white rounded-full uppercase px-6 py-3 text-sm font-semibold"
              >
                Login
              </Link>
              <Link
                to="/athlete-signup"
                className="bg-[#d4bc6d] rounded-full uppercase px-6 py-3 text-black text-sm font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black px-4 pt-6 pb-8 space-y-5">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.items ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex justify-between items-center text-white text-base font-medium capitalize"
                  >
                    {item.name}
                    {openDropdown === item.name ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {openDropdown === item.name && (
                    <div className="mt-2 pl-4 space-y-2">
                      {item.items.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="block text-white text-sm hover:text-[#d4bc6d]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  className="block text-white text-base font-medium capitalize"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="/login"
              className="border border-[#d4bc6d] text-white rounded-full uppercase px-6 py-2 text-sm font-semibold text-center"
            >
              Login
            </a>
            <Link
              to="/athlete-signup"
              className="bg-[#d4bc6d] rounded-full uppercase px-6 py-2 text-black text-sm font-semibold text-center"
            >
              Sign Up As
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

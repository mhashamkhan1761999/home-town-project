import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="bg-[#100E08] py-10 px-4 sm:px-6">
                <div className="2xl:max-w-[1560px] lg:max-w-[1184px] mx-auto">
                    <img
                        src="/logo.png"
                        alt="footer-logo"
                        className="w-[200px] sm:w-[275px] h-auto mx-auto mb-10 sm:mb-14"
                    />

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between">
                        {/* Mission */}
                        <div className="max-w-full lg:max-w-[551px]">
                            <button className="bg-[#2e2e2e] rounded-full px-6 py-3 text-[#d4bc6d] font-medium text-sm mb-5 sm:mb-9">
                                Our Mission
                            </button>
                            <p className="text-base sm:text-lg font-medium text-white">
                                At Hometown Hero, our mission is to empower athletes with a bold, AI-driven platform
                                built to unlock real growth and real NIL earnings. We’re hands-on every step of the way —
                                from launching your brand to building your audience, locking in deals, and scaling your
                                success. With the highest profit share in the game and tools designed for creators who hustle,
                                we make it easy for athletes to own their story, monetize their name, and turn their grind into
                                long-term greatness.
                            </p>
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-10 justify-between w-full lg:max-w-[600px]">
                            {/* Explore */}
                            <div className="min-w-[120px]">
                                <h4 className="text-lg font-medium text-[#D4BC6D] mb-6">Explore</h4>
                                <div className="flex flex-col gap-5">
                                    <a href="/" className="text-base font-semibold text-white capitalize">Home</a>
                                    <a href="/explore-athletes" className="text-base font-semibold text-white capitalize">Shop by</a>
                                    <a href="/athletes" className="text-base font-semibold text-white capitalize">Services</a>
                                    <Link to="/our-team" className="text-base font-semibold text-white capitalize">About</Link>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="min-w-[120px]">
                                <h4 className="text-lg font-medium text-[#D4BC6D] mb-6">Quick Links</h4>
                                <div className="flex flex-col gap-5">
                                    <Link to="/faq" className="text-base font-semibold text-white capitalize">FAQs</Link>
                                    <Link to="/policy" className="text-base font-semibold text-white capitalize">Policy</Link>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="min-w-[120px]">
                                <h4 className="text-lg font-medium text-[#D4BC6D] mb-6">Social Media</h4>
                                <div className="flex flex-col gap-5">
                                    <a
                                        href="https://www.instagram.com/hometownheroagency?igsh=NGV5NWFsMWdsZnE5&utm_source=qr"
                                        className="text-base font-semibold text-white capitalize"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Join the Family CTA */}
                <div className="px-4 mt-16">
                    <Link
                        to="/athlete-signup"
                        className="w-full py-10 sm:py-[60px] px-6 sm:px-[85px] rounded-lg flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-between bg-gradient-to-r from-[#d4bc6d] to-[#57430d]"
                    >
                        <div className="text-xl sm:text-[1.669rem] font-medium text-white text-center sm:text-left">
                            Join the family
                        </div>
                        <div>
                            <svg
                                fill="none"
                                height="23"
                                viewBox="0 0 24 23"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.10052 21.3368L21.8995 1.53785M21.8995 1.53785L4.92894 1.53785M21.8995 1.53785L21.8995 18.5084"
                                    stroke="#ECEEEC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.66667"
                                />
                            </svg>
                        </div>
                    </Link>
                </div>

                {/* Bottom */}
                <div className="2xl:max-w-[1560px] lg:max-w-[1184px] mx-auto mt-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                        <p className="text-sm font-semibold text-white text-center sm:text-left">
                            © 2025 HOMETOWN HERO. All rights reserved.
                        </p>
                        <Link to="/policy" className="text-sm font-semibold text-white">
                            Policy
                        </Link>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
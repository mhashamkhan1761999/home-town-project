import React, { useRef } from 'react'
import CarouselSlider from '../components/CarouselSlider'
import { Link } from 'react-router-dom'

const Home = () => {
    const videoRef = useRef(null);

    const handlePlay = () => {
        videoRef.current?.play();
    };


    return (
        <>

            <section className="py-10 ">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-[16px] justify-center items-center px-4 text-center">
                    {['YOUR STORY', 'YOUR BRAND', 'YOUR LEGACY'].map((text, idx) => (
                        <h2
                            key={idx}
                            className="text-[40px] sm:text-[4rem] leading-tight font-extrabold bg-[url('/texture.png')] bg-no-repeat bg-center bg-cover bg-clip-text text-transparent"
                            >
                            {text}
                        </h2>
                    ))}
                    {/* <p className="text-base sm:text-lg md:text-xl text-center font-medium text-[#adadad] max-w-[95%] md:max-w-[1200px] mx-auto">
                        Launching your brand has never been this easy.
                    </p> */}
                </div>
            </section>

            <section className="pt-10 sm:pt-[195px] pb-10 sm:pb-[98px]">
                <div className="max-w-[95%] lg:max-w-[1284px] 2xl:max-w-[1764px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Text Section */}
                        <div className="px-4 lg:px-0">
                            <h2 className="text-3xl sm:text-5xl md:text-[4.588rem] leading-tight capitalize bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-6 sm:mb-10">
                                Launching your brand has never been this easy.
                            </h2>

                            <p className="text-base sm:text-[1.125rem] text-white mb-6 sm:mb-10">
                                At Hometown Hero, we handle everything — from the graphics to the setup to your personal storefront — so you can stay focused on the grind. Whether it’s merch, supplements, or any other NIL service, you’ll have access to over 300+ products to build, sell, and profit from.
                                <br className="block" />
                                <br className="block" />
                                With Hometown Hero, you gain the platform, resources, and support to maximize every opportunity. The possibilities are endless, and the only limit is how far you’re willing to take your brand. Are you ready to unleash the full potential of your NIL?
                                <br className="block" />
                                <br className="block" />
                                Lock in on the grind. We’ll unlock your growth
                            </p>

                            <Link
                                to="/athlete-signup"
                                className="inline-block bg-[#d4bc6d] rounded-full px-6 sm:px-[38px] py-3 sm:py-[13px] text-black font-medium text-sm sm:text-[0.875rem]"
                            >
                                Join the Family
                            </Link>
                        </div>

                        {/* Video Section */}
                        <div className="px-4 lg:px-0">
                            <div className="relative h-[250px] sm:h-[350px] lg:h-[500px] w-full rounded-2xl overflow-hidden flex items-center justify-center">
                                {/* Blurry gold gradient background */}
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#d4bc6d]/70 via-[#57430d]/60 to-[#d4bc6d]/80 blur-[32px]" />
                                {/* Optional: add a slight dark overlay for contrast */}
                                <div className="absolute inset-0 z-10 bg-black/30" />
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="relative z-20 max-h-full max-w-full object-contain"
                                >
                                    <source src="/video23.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-[60px] md:py-[80px] lg:py-[98px] bg-[url('/bg-texture.svg')] bg-no-repeat bg-center bg-[length:100%]">
                <div className="max-w-[90%] md:max-w-[95%] lg:max-w-[1284px] 2xl:max-w-[1764px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center text-center md:text-left">
                        <div>
                            <button className="bg-[#2e2e2e] rounded-full px-6 py-3 text-[#d4bc6d] font-medium text-sm md:text-[0.875rem] mb-6 md:mb-9">
                                Our Numbers
                            </button>
                            <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[4.588rem] font-bold capitalize bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent leading-tight">
                                We’re Proud To Have <br />
                                Athlete Success
                            </h2>
                        </div>

                         <div className="rounded-3xl p-6 md:p-12 text-white text-center max-w-3xl mx-auto shadow-lg border space-y-4">
                            <h2 className="text-5xl sm:text-6xl md:text-[100px] lg:text-[130px] font-semibold">
                                10,023
                            </h2>

                            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-extrabold bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent -mt-4">
                                Active Athletes
                            </h4>

                            <Link
                                to="explore-athletes"
                                className="inline-block bg-[#d4bc6d] text-black font-extrabold px-6 py-3 text-base sm:text-lg rounded-xl transition hover:bg-[#bcae5f] -mt-2"
                            >
                                View Athlete Marketplace
                            </Link>
                            </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20 lg:py-24 bg-black">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent mb-4">
                            Why Athletes Choose Hometown Hero
                        </h2>
                        <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
                            Everything you need to build, grow, and monetize your brand in one powerful platform
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                        
                        {/* Industry-Leading Profit Sharing */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                        Industry-Leading Profit Sharing
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                Unlike other platforms that offer athletes just 5-20% of profits, our platform provides athletes with up to <span className="text-[#d4bc6d] font-semibold">80% profit sharing</span>, reflecting our values that athletes should receive the benefits, not our platform.
                            </p>
                        </div>

                        {/* AI-Powered Analytics */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                        AI-Powered Analytics
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                Our platform is powered by <span className="text-[#d4bc6d] font-semibold">advanced AI technology</span>, delivering data-driven audience insights, smart recommendations to help influencers and athletes level of success.
                            </p>
                        </div>

                        {/* Social Media Promotion */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                        Social Media Promotion
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                We'll amplify your social media presence through our <span className="text-[#d4bc6d] font-semibold">strategic marketing</span>, optimizing your profiles, creating promotional content, and personal insights, to position you to grow your following and turn your viewer into value.
                            </p>
                        </div>

                        {/* NIL Services */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                        NIL Services
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                Launch a wide range of NIL services from <span className="text-[#d4bc6d] font-semibold">merch and supplements</span> and a licences. We bring the technical expertise that makes it Live. It's fast, simple, and designed for you to reach success on what matters most.
                            </p>
                        </div>

                    </div>

                    {/* Bottom Section */}
                    <div className="mt-12 sm:mt-16 lg:mt-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                            
                            {/* Hands On Management */}
                            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                            Hands On Management
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                    Every athlete on our platform gets paired with a <span className="text-[#d4bc6d] font-semibold">dedicated team of graphic NIL agents</span>, we handle the brand building so our athletes can stay focused on their game.
                                </p>
                            </div>

                            {/* Everything Free */}
                            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                            Everything Free
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                    <span className="text-[#d4bc6d] font-semibold">No upfront costs</span>. Your journey to NIL success begins without any financial barriers. Every service builds into your product every launch. Free. Every launch helps with building the brand.
                                </p>
                            </div>

                            {/* Instant Cashouts */}
                            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4bc6d]/20 rounded-xl p-6 sm:p-8 hover:border-[#d4bc6d]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#d4bc6d] to-[#57430d] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#d4bc6d] mb-2">
                                            Instant Cashouts
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                    When it comes time to get paid, our cashout is as <span className="text-[#d4bc6d] font-semibold">transparent, reliable access</span> to their earnings offering immediate and reliable access within reach.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <section className="py-18 bg-black px-4 sm:px-8">
                <div className="2xl:max-w-[1764px] lg:max-w-[1284px] mx-auto">
                    <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:gap-20 items-center">

                        {/* Left Text Content */}
                        <div>
                            <span className="inline-block bg-[#3b3b3b] text-[#d4bc6d] text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-md sm:rounded-[8px] mb-5 sm:mb-9 tracking-wider uppercase">
                                About Us
                            </span>

                            <h2 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] xl:text-[4.588rem] leading-tight capitalize bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent mb-6 sm:mb-10">
                                NIL Marketplace built for athletes, by athletes,
                            </h2>

                            <p className="text-sm sm:text-base text-white mb-6 sm:mb-10 leading-relaxed">
                                Hometown Hero is a platform built for athletes, by athletes, designed to empower players at every stage of their journey—whether they are building their brand for the future or actively monetizing their name, image, and likeness (NIL).
                                <br /><br />
                                For athletes currently earning through NIL, Hometown Hero offers a comprehensive, AI-powered platform that helps players monetize their talents and maximize their earning potential. With advanced tools for real-time earnings tracking, data-driven insights, and automated systems, we streamline the process of building and managing your NIL success. Whether it’s selling products through your storefront—such as online courses, player cards, and merchandise—or monetizing content, our platform provides athletes with all the tools they need to grow their brand, expand their influence, and take full control of their financial future. Take advantage of your playing years — this is your window to capitalize on NIL before the game ends.
                            </p>

                            <Link
                                to="/our-team"
                                className="inline-block bg-[#d4bc6d] rounded-full px-6 sm:px-[38px] py-3 sm:py-[13px] text-black font-medium text-sm sm:text-[0.875rem]"
                            >
                                Learn More
                            </Link>
                        </div>

                        {/* Right Image */}
                        {/* <div className="flex justify-center lg:justify-end">
                            <img
                                src="/alek.jpeg"
                                alt="about us"
                                className="w-full max-w-[500px] sm:max-w-[650px] h-auto object-cover rounded-xl sm:rounded-2xl"
                            />
                        </div> */}

                    </div>
                </div>
            </section>

            {/* first section */}
            <section className="bg-black min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                <CarouselSlider data={
                    [
                        {
                            name: "Coming Soon",
                            image: "/question-mark.jpeg",
                            // rating: 5,
                            // subTitle: "Seller",
                        },
                        {
                            name: "Coming Soon",
                            image: "/question-mark.jpeg",
                            // rating: 5,
                            // subTitle: "Seller",
                        },
                        {
                            name: "Coming Soon",
                            image: "/question-mark.jpeg",
                            // rating: 5,
                            // subTitle: "Seller",
                        },
                        {
                            name: "Coming Soon",
                            image: "/question-mark.jpeg",
                            // rating: 5,
                            // subTitle: "Seller",
                        },
                        {
                            name: "Coming Soon",
                            image: "/question-mark.jpeg",
                            // rating: 5,
                            // subTitle: "Seller",
                        },
                    ]
                } />

                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.875rem] text-center uppercase font-extrabold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-5 leading-tight">
                    Furious 5 Incoming...
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-center font-medium text-[#adadad] max-w-[95%] md:max-w-[1200px] mx-auto pb-8 md:pb-10">
                    The Furious 5 spotlights the top five earning athletes on our platform each month—those driving the highest NIL earnings share and setting the standard for success. Securing a spot isn’t just about recognition; it’s about proving you’re among the best and unlocking exclusive perks, elevated visibility, and a platform-wide spotlight on your brand. The Furious 5 rotates monthly, so who will rise, who will fall, and who will make it to the top? The race to the Furious 5 is on.
                </p>

                {/* <p className="text-base sm:text-lg md:text-xl text-center font-medium text-[#adadad] max-w-[95%] md:max-w-[1200px] mx-auto pb-8 md:pb-10">
                    Our top 5 earning athletes, leading in NIL. Members gain exclusive access to brand partnerships, priority NIL opportunities, and elevated exposure across the
                    <br className="hidden sm:block" />
                    platform. Our team reviews earnings monthly to ensure the top performers hold their place among the Furious 5.
                </p> */}

                {/* <h4 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.25rem] font-extrabold text-center bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent">
                    Athletes Partnered With
                </h4> */}

                {/* <h2 className="text-[3.5rem] sm:text-[5rem] md:text-[8rem] font-semibold text-white text-center mb-8 sm:mb-12 mt-[-10px] sm:mt-[-30px]">
                    10,023
                </h2> */}
            </section>



            {/* <section className="w-full h-[100dvh] bg-black px-4 sm:px-8">
                <div className="flex items-center justify-center h-full w-full">
                    <div className="text-center max-w-[1200px] mx-auto">
                        <span className="inline-block bg-[#3b3b3b] text-[#d4bc6d] text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-md mb-5 sm:mb-9 tracking-wider uppercase">
                            Why Join Us
                        </span>

                        <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7.5rem] leading-tight capitalize font-medium bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent mb-6 sm:mb-10">
                            Brand Marketplace <br className="hidden sm:block" />
                            coming soon
                        </h2>

                        <Link
                            to="/athlete-signup"
                            className="inline-block bg-[#d4bc6d] rounded-full px-6 sm:px-[38px] py-3 sm:py-[13px] text-black font-medium text-sm sm:text-[0.875rem]"
                        >
                            Join the Family
                        </Link>
                    </div>
                </div>
            </section> */}


            <section className="w-full h-[100dvh] relative hidden">
                <img src="/download-app.svg" alt="download" className="w-full h-full object-contain" />
                <div className="absolute right-[24px] bottom-[47px] z-10">
                    <a href="#" className="bg-black rounded-full px-[56px] inline-block py-[32px] text-[#d4bc6d] font-extrabold text-[1.25rem] mb-9">
                        Download the App
                    </a>
                </div>
            </section>



        </>
    )
}

export default Home
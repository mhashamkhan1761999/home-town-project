import React from 'react'
import CarouselSlider2 from '../components/CarouselSlider2'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ExploreAthletes = () => {
    return (
        <>
            <section className="bg-black flex flex-col items-center px-4 sm:px-6 py-8">
                <h1 className="text-4xl sm:text-6xl lg:text-[6.875rem] my-10 text-center uppercase font-extrabold bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent">
                    Explore Athletes
                </h1>

                {/* Filter Buttons */}
                <div className="w-full overflow-x-auto mb-10">
                    <div className="flex space-x-3 min-w-max md:justify-center">
                        {[
                            'All', 'Furious 5', 'Royal', 'Emerald', 'Diamond', 'Gold', 'Silver', 'Bronze', 'Trending'
                        ].map((label, idx) => (
                            <button
                                key={idx}
                                className={`${idx === 0 ? 'bg-[#D4BC6D] text-black' : 'bg-gray-800 text-[#D4BC6D]'
                                    } text-sm font-medium py-2.5 px-6 whitespace-nowrap rounded-full shadow-lg transition-colors`}
                                type="button"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter & Search Row */}
                <div className="w-full max-w-4xl px-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Filters Button */}
                        <button
                            className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-x-2.5 px-5 py-3 rounded-full bg-[#2d2d2d] text-[#D4BC6D] font-semibold text-sm hover:bg-[#3a3a3a] transition"
                            type="button"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 20 18"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 2H11" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                                <path d="M2 9H15" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                                <path d="M2 16H19" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                            <span>Filters</span>
                        </button>

                        {/* Search Input */}
                        <div className="relative w-full">
                            <div className="flex items-center w-full p-1 rounded-full bg-[#2d2d2d] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus-within:ring-[#D4BC6D] transition-all">
                                <input
                                    className="w-full pl-5 pr-3 py-2 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none text-base sm:text-sm"
                                    placeholder="Search by name"
                                    type="search"
                                />
                                <button
                                    className="flex-shrink-0 px-5 py-2.5 sm:px-8 rounded-full bg-[#D4BC6D] text-black font-semibold text-sm hover:bg-[#e0d1a6] transition"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='py-8 bg-black px-4 sm:px-6'>
                <h1 className='text-4xl sm:text-5xl lg:text-[6.875rem] text-center capitalize font-bold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-6'>
                    this month’s furious 5
                </h1>

                {/* Carousel Slider */}
                <CarouselSlider2
                    data={[
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                        },
                    ]}
                />
            </section>



            <section className="py-8 bg-black px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-[5rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-8 leading-normal">
                    Trending Athletes
                </h1>

                <CarouselSlider2
                    data={[
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                            rating: 5,
                            subTitle: "Seller",
                            isTrending: true,
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                            rating: 5,
                            subTitle: "Seller",
                            isTrending: true,
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                            rating: 5,
                            subTitle: "Seller",
                            isTrending: true,
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                            rating: 5,
                            subTitle: "Seller",
                            isTrending: true,
                        },
                        {
                            name: "",
                            image: "/question-mark.jpeg",
                            rating: 5,
                            subTitle: "Seller",
                            isTrending: true,
                        },
                    ]}
                />

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[96rem] mx-auto mt-12 mb-16">
                    {[
                        { title: "Bronze", img: "/bronze.png" },
                        { title: "Silver", img: "/Silver.png" },
                        { title: "Gold", img: "/Gold.png" },
                        { title: "Diamond", img: "/Diamond.png" },
                        { title: "Emerald", img: "/Emerlad.png" },
                        { title: "Royal", img: "/Royal.png" },
                    ].map((item) => (
                        <div key={item.title} className="text-center">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-32 sm:w-36 md:w-40 h-auto object-contain mx-auto"
                            />
                            <h4 className="text-2xl sm:text-3xl lg:text-[3rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-4">
                                {item.title}
                            </h4>
                            <button
                                className="bg-[#D4BC6D] text-black text-sm font-medium py-3 px-8 sm:px-10 rounded-full shadow-lg transition-colors duration-300 ease-in-out hover:text-black hover:bg-[#D4BC6D]"
                                type="button"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div> */}

                {/* Mobile Carousel */}
                <div className="sm:hidden mt-12 mb-20">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={1.15}
                        centeredSlides={true}
                        loop={true}
                        pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
                        modules={[Pagination]}
                        className="w-full"
                    >
                        {[
                            { title: "Bronze", img: "/bronze.png" },
                            { title: "Silver", img: "/Silver.png" },
                            { title: "Gold", img: "/Gold.png" },
                            { title: "Diamond", img: "/Diamond.png" },
                            { title: "Emerald", img: "/Emerlad.png" },
                            { title: "Royal", img: "/Royal.png" },
                        ].map((item) => (
                            <SwiperSlide key={item.title}>
                                <div className="text-center">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-56 h-auto object-contain mx-auto mb-4"
                                    />
                                    <h4 className="text-4xl font-bold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-6 capitalize">
                                        {item.title}
                                    </h4>
                                    <button
                                        className="bg-[#D4BC6D] text-black text-lg font-semibold py-5 px-14 rounded-full shadow-lg transition-colors duration-300 ease-in-out hover:text-black hover:bg-[#D4BC6D]"
                                        type="button"
                                    >
                                        View
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="custom-swiper-pagination flex justify-center mt-4" />
                </div>

                {/* Desktop Grid */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[96rem] mx-auto mt-12 mb-16">
                    {[
                        { title: "Bronze", img: "/bronze.png" },
                        { title: "Silver", img: "/Silver.png" },
                        { title: "Gold", img: "/Gold.png" },
                        { title: "Diamond", img: "/Diamond.png" },
                        { title: "Emerald", img: "/Emerlad.png" },
                        { title: "Royal", img: "/Royal.png" },
                    ].map((item) => (
                        <div key={item.title} className="text-center">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-32 sm:w-36 md:w-40 h-auto object-contain mx-auto"
                            />
                            <h4 className="text-2xl sm:text-3xl lg:text-[3rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-4">
                                {item.title}
                            </h4>
                            <button
                                className="bg-[#D4BC6D] text-black text-sm font-medium py-3 px-8 sm:px-10 rounded-full shadow-lg transition-colors duration-300 ease-in-out hover:text-black hover:bg-[#D4BC6D]"
                                type="button"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>


            </section>

        </>
    )
}

export default ExploreAthletes
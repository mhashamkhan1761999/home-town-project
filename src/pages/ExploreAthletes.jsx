import React, { useState, useMemo } from 'react'
import CarouselSlider2 from '../components/CarouselSlider2'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../api';
import { useNavigate } from 'react-router-dom';

const ExploreAthletes = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [showSeeMore, setShowSeeMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch athletes data
    const { data: athletesData, isLoading: isAthletesLoading, error: athletesError } = useQuery({
        queryKey: ['all-athletes'],
        queryFn: () => getRequest('/all-athletes'),
        onSuccess: (data) => {
            console.log('All athletes API response:', data);
        },
        onError: (error) => {
            console.error('Error fetching athletes:', error);
        }
    });

    // Handle athlete card click
    const handleAthleteClick = (athleteId) => {
        if (athleteId) {
            navigate(`/store-front/${athleteId}`);
        }
    };

    // Search functionality
    const handleSearch = (e) => {
        e.preventDefault();
        // Search logic is already handled by useMemo filteredAthletes
    };

    // Filter athletes based on search term and selected filter
    const filteredAthletes = useMemo(() => {
        if (!Array.isArray(athletesData)) return [];
        
        let filtered = athletesData;

        // Apply search filter
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(athlete => 
                (athlete?.store || athlete?.store_name || '').toLowerCase().includes(search) ||
                (athlete?.email || '').toLowerCase().includes(search) ||
                (athlete?.sport || '').toLowerCase().includes(search) ||
                (athlete?.team_name || '').toLowerCase().includes(search) ||
                (athlete?.school_name || '').toLowerCase().includes(search) ||
                (athlete?.country || '').toLowerCase().includes(search) ||
                (athlete?.city || '').toLowerCase().includes(search)
            );
        }

        // Apply category filter
        if (selectedFilter !== 'All') {
            if (selectedFilter === 'Furious 5') {
                // Show top 5 athletes
                filtered = filtered.slice(0, 5);
            } else if (selectedFilter === 'Trending') {
                // Show trending athletes
                filtered = filtered.filter(athlete => athlete?.isTrending);
                if (filtered.length === 0) {
                    // If no trending athletes, show from index 10-15
                    filtered = athletesData.slice(10, 15);
                }
            } else {
                // Filter by athlete level/tier
                filtered = filtered.filter(athlete => 
                    (athlete?.level_of_athlete || '').toLowerCase() === selectedFilter.toLowerCase() ||
                    (athlete?.tier || '').toLowerCase() === selectedFilter.toLowerCase()
                );
            }
        }

        return filtered;
    }, [athletesData, searchTerm, selectedFilter]);

    // Map filtered data to carousel format
    const mapAthleteData = (athletes) => {
        return athletes.map((athlete) => {
            const name = athlete?.store || athlete?.store_name || athlete?.email || '';
            const image = athlete?.profile_picture_url || athlete?.profile_picture || '/question-mark.jpeg';
            const subTitle = athlete?.sport || athlete?.level_of_athlete || athlete?.role || '';
            const team = athlete?.team_name || '';
            const school = athlete?.school_name || '';
            const country = athlete?.country || '';
            const city = athlete?.city || '';
            const bio = athlete?.bio || athlete?.description || '';
            const email = athlete?.email || '';
            const social = {
                instagram: athlete?.instagram,
                tiktok: athlete?.tiktok,
                twitter: athlete?.twitter,
                youtube: athlete?.youtube,
                twitch: athlete?.twitch,
                other: athlete?.other,
            };
            
            // Responsive, well-written description for the back of the card
            const backheading = name;
            const about = bio
                ? bio
                : `Meet ${name}, a dedicated athlete from ${city ? city + ', ' : ''}${country ? country : ''}${team ? ', team: ' + team : ''}${school ? ', school: ' + school : ''}. ${subTitle ? 'Level: ' + subTitle + '. ' : ''}Contact: ${email}.`;
            
            return {
                id: athlete?.id,
                name,
                image,
                rating: athlete?.rating || 0,
                subTitle,
                team,
                school,
                country,
                city,
                bio,
                email,
                social,
                backheading,
                about,
                isTrending: athlete?.isTrending || false,
                onCardClick: () => handleAthleteClick(athlete?.id),
            };
        });
    };

    // Map API data to carousel format (Furious 5)
    const furious5 = Array.isArray(athletesData)
        ? mapAthleteData(athletesData.slice(0, 5))
        : [
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', onCardClick: () => {} },
        ];

    // Map API data to carousel format (Trending Athletes)
    const trendingAthletes = Array.isArray(athletesData)
        ? mapAthleteData(athletesData.slice(10, 15))
        : [
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
            { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
        ];

    // Trending Athletes fallback if API returns none
    const trendingFallback = [
        { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
        { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
        { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
        { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
        { name: '', image: '/question-mark.jpeg', about: 'Athlete details coming soon.', isTrending: true, onCardClick: () => {} },
    ];
    const trendingAthletesToShow = trendingAthletes && trendingAthletes.length > 0 ? trendingAthletes : trendingFallback;

    // Filtered results for display
    const filteredResults = mapAthleteData(filteredAthletes);

    // Get all athletes for "See More" section (excluding those in Furious 5 and Trending)
    const allAthletesForSeeMore = useMemo(() => {
        if (!Array.isArray(athletesData)) return [];
        
        // Skip first 5 (Furious 5) and next 5 (Trending) = start from index 15
        const remainingAthletes = athletesData.slice(15);
        return mapAthleteData(remainingAthletes);
    }, [athletesData]);

    // Pagination logic for "See More" section
    const totalPages = Math.ceil(allAthletesForSeeMore.length / itemsPerPage);
    const paginatedAthletes = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allAthletesForSeeMore.slice(startIndex, endIndex);
    }, [allAthletesForSeeMore, currentPage, itemsPerPage]);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to see more section
        document.getElementById('see-more-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle "See More" button click
    const handleSeeMoreClick = () => {
        setShowSeeMore(true);
        setCurrentPage(1);
        setTimeout(() => {
            document.getElementById('see-more-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

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
                                className={`${selectedFilter === label ? 'bg-[#D4BC6D] text-black' : 'bg-gray-800 text-[#D4BC6D]'
                                    } text-sm font-medium py-2.5 px-6 whitespace-nowrap rounded-full shadow-lg transition-colors hover:bg-[#D4BC6D] hover:text-black`}
                                type="button"
                                onClick={() => setSelectedFilter(label)}
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
                            <form onSubmit={handleSearch} className="flex items-center w-full p-1 rounded-full bg-[#2d2d2d] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus-within:ring-[#D4BC6D] transition-all">
                                <input
                                    className="w-full pl-5 pr-3 py-2 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none text-base sm:text-sm"
                                    placeholder="Search by name, email, sport, team..."
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button
                                    className="flex-shrink-0 px-5 py-2.5 sm:px-8 rounded-full bg-[#D4BC6D] text-black font-semibold text-sm hover:bg-[#e0d1a6] transition"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtered Results Section - Show when search is active or filter is not "All" */}
            {(searchTerm || selectedFilter !== 'All') && (
                <section className="py-8 bg-black px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-[4rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-8 leading-normal">
                        {searchTerm 
                            ? `Search Results for "${searchTerm}"` 
                            : selectedFilter === 'All' 
                                ? 'All Athletes' 
                                : `${selectedFilter} Athletes`
                        }
                    </h1>
                    
                    {isAthletesLoading ? (
                        <div className="text-center text-white py-8">Loading athletes...</div>
                    ) : filteredResults.length > 0 ? (
                        <CarouselSlider2 data={filteredResults} />
                    ) : (
                        <div className="text-center text-white py-8">
                            <p className="text-lg">No athletes found matching your criteria.</p>
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedFilter('All');
                                }}
                                className="mt-4 bg-[#D4BC6D] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#e0d1a6] transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            )}


            <section className='py-8 bg-black px-4 sm:px-6'>
                <h1 className='text-4xl sm:text-5xl lg:text-[6.875rem] text-center capitalize font-bold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-6'>
                    this month’s furious 5
                </h1>

                {/* Carousel Slider */}
                <CarouselSlider2
                    data={furious5}
                />
            </section>



            <section className="py-8 bg-black px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-[5rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-8 leading-normal">
                    Trending Athletes
                </h1>

                <CarouselSlider2
                    data={trendingAthletesToShow}
                />

                {/* See More Button */}
                {!showSeeMore && allAthletesForSeeMore.length > 0 && (
                    <div className="text-center mt-12 mb-8">
                        <button
                            onClick={handleSeeMoreClick}
                            className="bg-[#D4BC6D] text-black text-lg font-semibold py-4 px-12 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-[#e0d1a6] hover:scale-105 transform"
                            type="button"
                        >
                            See More Athletes
                        </button>
                        <p className="text-gray-400 text-sm mt-3">
                            Discover {allAthletesForSeeMore.length} more talented athletes
                        </p>
                    </div>
                )}
            </section>

            {/* See More Athletes Section */}
            {showSeeMore && (
                <section id="see-more-section" className="py-12 bg-black px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                            <h1 className="text-3xl sm:text-4xl lg:text-[4rem] text-center sm:text-left capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-4 sm:mb-0 leading-normal">
                                All Athletes
                            </h1>
                            <button
                                onClick={() => setShowSeeMore(false)}
                                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Hide
                            </button>
                        </div>

                        {/* Athletes Cards Grid */}
                        {isAthletesLoading ? (
                            <div className="text-center text-white py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4BC6D] mx-auto mb-4"></div>
                                <p>Loading athletes...</p>
                            </div>
                        ) : paginatedAthletes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-12">
                                {paginatedAthletes.map((athlete, index) => (
                                    <div
                                        key={athlete.id || index}
                                        onClick={athlete.onCardClick}
                                        className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-6 hover:border-[#D4BC6D] transition-all duration-300 cursor-pointer group hover:scale-105 transform"
                                    >
                                        {/* Athlete Image */}
                                        <div className="relative mb-4 overflow-hidden rounded-xl">
                                            <img
                                                src={athlete.image}
                                                alt={athlete.name}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = '/question-mark.jpeg';
                                                }}
                                            />
                                            {athlete.isTrending && (
                                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    Trending
                                                </div>
                                            )}
                                        </div>

                                        {/* Athlete Info */}
                                        <div className="space-y-2">
                                            <h3 className="text-white font-bold text-lg group-hover:text-[#D4BC6D] transition-colors line-clamp-1">
                                                {athlete.name || 'Athlete Name'}
                                            </h3>
                                            
                                            {athlete.subTitle && (
                                                <p className="text-gray-400 text-sm">
                                                    {athlete.subTitle}
                                                </p>
                                            )}

                                            {(athlete.team || athlete.school) && (
                                                <p className="text-gray-500 text-xs">
                                                    {athlete.team && athlete.school 
                                                        ? `${athlete.team} • ${athlete.school}`
                                                        : athlete.team || athlete.school
                                                    }
                                                </p>
                                            )}

                                            {(athlete.city || athlete.country) && (
                                                <p className="text-gray-500 text-xs flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    {athlete.city && athlete.country 
                                                        ? `${athlete.city}, ${athlete.country}`
                                                        : athlete.city || athlete.country
                                                    }
                                                </p>
                                            )}

                                            {athlete.rating > 0 && (
                                                <div className="flex items-center gap-1 mt-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${i < athlete.rating ? 'text-[#D4BC6D]' : 'text-gray-600'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-400 text-xs ml-1">
                                                        ({athlete.rating})
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Click to view indicator */}
                                        <div className="mt-4 pt-4 border-t border-gray-700">
                                            <p className="text-[#D4BC6D] text-xs font-medium group-hover:text-white transition-colors">
                                                Click to view store →
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-white py-8">
                                <p className="text-lg">No more athletes available.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Page Info */}
                                <div className="text-gray-400 text-sm">
                                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, allAthletesForSeeMore.length)} of {allAthletesForSeeMore.length} athletes
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center space-x-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === 1
                                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-700 text-white hover:bg-[#D4BC6D] hover:text-black'
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex space-x-1">
                                        {[...Array(totalPages)].map((_, index) => {
                                            const page = index + 1;
                                            const isCurrentPage = page === currentPage;
                                            
                                            // Show first page, last page, current page, and pages around current
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                            isCurrentPage
                                                                ? 'bg-[#D4BC6D] text-black'
                                                                : 'bg-gray-700 text-white hover:bg-gray-600'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (
                                                page === currentPage - 2 ||
                                                page === currentPage + 2
                                            ) {
                                                return (
                                                    <span key={page} className="px-2 py-2 text-gray-500">
                                                        ...
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === totalPages
                                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-700 text-white hover:bg-[#D4BC6D] hover:text-black'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Tier System Section */}
            <section className="py-8 bg-black px-4 sm:px-6">
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
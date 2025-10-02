import React, { useState, useMemo } from 'react'
import CarouselSlider2 from '../components/CarouselSlider2'
import CarouselSliderNoFlip from '../components/CarouselSliderNoFlip'
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
    const [selectedTier, setSelectedTier] = useState('');
    const [showTierAthletes, setShowTierAthletes] = useState(false);
    const [tierCurrentPage, setTierCurrentPage] = useState(1);
    const itemsPerPage = 4;

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

    // Fetch furious athletes data
    const { data: furiousAthletesData, isLoading: isFuriousLoading, error: furiousError } = useQuery({
        queryKey: ['furious-athletes'],
        queryFn: () => getRequest('/furious-athletes'),
        onSuccess: (data) => {
            console.log('Furious athletes API response:', data);
        },
        onError: (error) => {
            console.error('Error fetching furious athletes:', error);
        }
    });

    // Handle athlete card click
    const handleAthleteClick = (athleteSlug) => {
        if (athleteSlug) {
            navigate(`/store-front/${athleteSlug}`);
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
                // Use the same data source as "This Month's Furious 5" section
                filtered = Array.isArray(furiousAthletesData) ? furiousAthletesData : [];
            } else if (selectedFilter === 'Trending') {
                // Show trending athletes
                filtered = filtered.filter(athlete => athlete?.isTrending);
                if (filtered.length === 0) {
                    // If no trending athletes, show from index 10-15
                    filtered = athletesData.slice(10, 15);
                }
            } else {
                // Filter by badge level (Bronze, Silver, Gold, Diamond, Emerald, Royal)
                const badgeLevels = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Emerald', 'Royal'];
                if (badgeLevels.includes(selectedFilter)) {
                    filtered = filtered.filter(athlete => 
                        athlete?.badge_level?.name === selectedFilter
                    );
                } else {
                    // Fallback to level_of_athlete or tier for other filters
                    filtered = filtered.filter(athlete => 
                        (athlete?.level_of_athlete || '').toLowerCase() === selectedFilter.toLowerCase() ||
                        (athlete?.tier || '').toLowerCase() === selectedFilter.toLowerCase()
                    );
                }
            }
        }

        return filtered;
    }, [athletesData, searchTerm, selectedFilter, furiousAthletesData]);

    // Map filtered data to carousel format
    const mapAthleteData = (athletes, defaultImage = '/logo1.png') => {
        console.log('Mapping athlete data:', athletes);
        return athletes.map((athlete) => {
            const name = athlete?.athlete_name || athlete?.store || athlete?.store_name || athlete?.email || '';
            const image = athlete?.profile_picture_url || athlete?.profile_picture || defaultImage;
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
                onCardClick: () => handleAthleteClick(athlete?.slug),
            };
        });
    };

    // Map API data to carousel format (Furious 5) - use logo1.png as default
    const furious5 = Array.isArray(furiousAthletesData) && furiousAthletesData.length > 0
        ? mapAthleteData(furiousAthletesData.slice(0, 5), '/coming-soon.png')
        : [];
        
    // Check if we should show TOP TALENT section
    const shouldShowTopTalent = furious5.length > 0;

    // Map API data to carousel format (Trending Athletes) - only show athletes with badge amounts
    const trendingAthletes = useMemo(() => {
        if (!Array.isArray(athletesData) || athletesData.length === 0) {
            return [];
        }
        
        // Get only athletes with badge_amount > 0, sorted by badge_amount (descending)
        const athletesWithBadges = [...athletesData]
            .filter(athlete => athlete?.badge_amount && athlete.badge_amount > 0)
            .sort((a, b) => (b.badge_amount || 0) - (a.badge_amount || 0));
            
        return mapAthleteData(athletesWithBadges, '/coming-soon.png');
    }, [athletesData]);
    
    // Check if we should show Trending Athletes section (only show if there are actual trending athletes)
    const shouldShowTrending = trendingAthletes.length > 0;
    const trendingAthletesToShow = trendingAthletes;

    // Filtered results for display (use logo1.png as default for badge system)
    const filteredResults = mapAthleteData(filteredAthletes, '/logo1.png');

    // Get all athletes for "See More" section (excluding those in Furious 5 and Trending)
    const allAthletesForSeeMore = useMemo(() => {
        if (!Array.isArray(athletesData)) return [];
        
        // Get IDs of athletes already shown in Furious 5 and Trending sections
        const furiousAthleteIds = Array.isArray(furiousAthletesData) ? furiousAthletesData.slice(0, 5).map(athlete => athlete?.id).filter(Boolean) : [];
        const trendingAthleteIds = trendingAthletes.map(athlete => athlete?.id).filter(Boolean);
        const excludedIds = [...furiousAthleteIds, ...trendingAthleteIds];
        
        // Filter out athletes that are already shown in other sections
        const remainingAthletes = athletesData.filter(athlete => !excludedIds.includes(athlete?.id));
        return mapAthleteData(remainingAthletes, '/logo1.png');
    }, [athletesData, furiousAthletesData, trendingAthletes]);

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

    // Handle tier button click
    const handleTierClick = (tier) => {
        setSelectedTier(tier);
        setShowTierAthletes(true);
        setTierCurrentPage(1);
        // Hide other sections
        setShowSeeMore(false);
        setTimeout(() => {
            document.getElementById('tier-athletes-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Get athletes filtered by tier
    const getTierAthletes = useMemo(() => {
        if (!selectedTier || !Array.isArray(athletesData)) return [];
        
        return athletesData.filter(athlete => {
            // Check badge_level.name first (primary tier field)
            const badgeLevel = athlete?.badge_level?.name || '';
            if (badgeLevel === selectedTier) {
                return true;
            }
            
            // Fallback to other tier fields
            const athleteTier = athlete?.tier?.toLowerCase() || '';
            const levelOfAthlete = athlete?.level_of_athlete?.toLowerCase() || '';
            const selectedTierLower = selectedTier.toLowerCase();
            
            return athleteTier === selectedTierLower || levelOfAthlete === selectedTierLower;
        });
    }, [athletesData, selectedTier]);

    // Map tier athletes to display format
    const tierAthletesForDisplay = useMemo(() => {
        return mapAthleteData(getTierAthletes);
    }, [getTierAthletes]);

    // Pagination for tier athletes
    const tierTotalPages = Math.ceil(tierAthletesForDisplay.length / itemsPerPage);
    const paginatedTierAthletes = useMemo(() => {
        const startIndex = (tierCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return tierAthletesForDisplay.slice(startIndex, endIndex);
    }, [tierAthletesForDisplay, tierCurrentPage, itemsPerPage]);

    // Handle tier page change
    const handleTierPageChange = (page) => {
        setTierCurrentPage(page);
        document.getElementById('tier-athletes-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section className="bg-black flex flex-col items-center px-4 sm:px-6 py-8">
                <h1 className="text-4xl sm:text-6xl lg:text-[6.875rem] my-10 text-center uppercase font-extrabold bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent">
                    Explore Athletes
                </h1>

                {/* Filter Buttons */}
                {/* <div className="w-full overflow-x-auto mb-10">
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
                </div> */}

                {/* Filter & Search Row */}
                <div className="w-full max-w-4xl px-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Filters Button */}
                        {/* <button
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
                        </button> */}

                        {/* Search Input */}
                        <div className="relative w-full">
                            <form onSubmit={handleSearch} className="flex items-center w-full p-1 rounded-full bg-[#2d2d2d] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus-within:ring-[#D4BC6D] transition-all">
                                <input
                                    className="w-full pl-5 pr-3 py-2 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none text-base sm:text-sm"
                                    placeholder="Search by name, sport, team..."
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
                        <CarouselSliderNoFlip data={filteredResults} />
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


            {/* Only show TOP TALENT section if we have furious athletes */}
            {shouldShowTopTalent && (
                <section className='py-8 bg-black px-4 sm:px-6'>
                    <h1 className='text-4xl sm:text-5xl lg:text-[6.875rem] text-center capitalize font-bold bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-6'>
                        TOP TALENT
                    </h1>

                    {/* Carousel Slider */}
                    {isFuriousLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#d4bc6d]"></div>
                        </div>
                    ) : (
                        <CarouselSliderNoFlip
                            data={furious5}
                        />
                    )}
                </section>
            )}



            {/* Only show Trending Athletes section if we have athletes with badge_amount */}
            {shouldShowTrending && (
                <section className="py-8 bg-black px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-[5rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-8 leading-normal">
                        Trending Athletes
                    </h1>

                    <CarouselSliderNoFlip
                        data={trendingAthletesToShow}
                    />
                </section>
            )}

            {/* All Athletes Section */}
            {Array.isArray(athletesData) && athletesData.length > 0 && (
                <section className="py-12 bg-black px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl lg:text-[4rem] text-center capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-12 leading-normal">
                            All Athletes
                        </h1>

                        {/* Athletes Cards Grid */}
                        {isAthletesLoading ? (
                            <div className="text-center text-white py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4BC6D] mx-auto mb-4"></div>
                                <p>Loading athletes...</p>
                            </div>
                        ) : allAthletesForSeeMore.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
                                {allAthletesForSeeMore.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((athlete, index) => (
                                    <div
                                        key={athlete.id || index}
                                        onClick={athlete.onCardClick}
                                        className="relative bg-cover bg-center bg-no-repeat border border-gray-700 rounded-2xl hover:border-[#D4BC6D] transition-all duration-300 cursor-pointer group hover:scale-105 transform overflow-hidden aspect-[4/5]"
                                        style={{backgroundImage: 'url(/bg-2.jpeg)'}}
                                    >
                                        <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
                                        
                                        {/* Athlete Name - Overlayed at top */}
                                        <div className="absolute top-6 left-4 right-4 z-20">
                                            <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg text-center drop-shadow-lg line-clamp-2 bg-black/30 rounded-lg px-2 py-2">
                                                {athlete.name || 'Athlete Name'}
                                            </h3>
                                        </div>

                                        {/* Square Image Section - Centered */}
                                        <div className="absolute inset-0 flex items-center justify-center pt-16 pb-16">
                                            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 overflow-hidden rounded-xl border-2 border-white/20">
                                                <img
                                                    src={athlete.image || '/logo1.png'}
                                                    alt={athlete.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src = '/logo1.png';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Visit Store Front Button - Overlayed at bottom */}
                                        <div className="absolute bottom-6 left-4 right-4 z-20">
                                            <button 
                                                className="w-full bg-gradient-to-r cursor-pointer from-[#D4BC6D] to-[#F4D03F] text-black font-bold py-2 px-3 text-xs sm:py-3 sm:px-4 sm:text-sm rounded-full hover:from-[#F4D03F] hover:to-[#D4BC6D] transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (athlete.onCardClick) athlete.onCardClick();
                                                }}
                                            >
                                                Visit Store Front
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-white py-8">
                                <p className="text-lg">No athletes available.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {Math.ceil(allAthletesForSeeMore.length / itemsPerPage) > 1 && (
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
                                        {[...Array(Math.ceil(allAthletesForSeeMore.length / itemsPerPage))].map((_, index) => {
                                            const pageNumber = index + 1;
                                            const isCurrentPage = pageNumber === currentPage;
                                            const showPage = 
                                                pageNumber === 1 ||
                                                pageNumber === Math.ceil(allAthletesForSeeMore.length / itemsPerPage) ||
                                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                                            
                                            if (!showPage) {
                                                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                                                    return (
                                                        <span key={pageNumber} className="px-2 text-gray-500">
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            }
                                            
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                                                        isCurrentPage
                                                            ? 'bg-[#D4BC6D] text-black'
                                                            : 'bg-gray-700 text-white hover:bg-[#D4BC6D] hover:text-black'
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(allAthletesForSeeMore.length / itemsPerPage)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === Math.ceil(allAthletesForSeeMore.length / itemsPerPage)
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

                {/* See More Button */}
                {/* {!showSeeMore && allAthletesForSeeMore.length > 0 && (
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
                )} */}

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
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
                                {paginatedAthletes.map((athlete, index) => (
                                    <div
                                        key={athlete.id || index}
                                        onClick={athlete.onCardClick}
                                        className="relative bg-cover bg-center bg-no-repeat border border-gray-700 rounded-2xl hover:border-[#D4BC6D] transition-all duration-300 cursor-pointer group hover:scale-105 transform overflow-hidden aspect-[4/5]"
                                        style={{backgroundImage: 'url(/bg-2.jpeg)'}}
                                    >
                                        <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
                                        
                                        {/* Trending Badge */}
                                        {athlete.isTrending && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-30">
                                                Trending
                                            </div>
                                        )}
                                        
                                        {/* Athlete Name - Overlayed at top */}
                                        <div className="absolute top-6 left-4 right-4 z-20">
                                            <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg text-center drop-shadow-lg line-clamp-2 bg-black/30 rounded-lg px-2 py-2">
                                                {athlete.name || 'Athlete Name'}
                                            </h3>
                                        </div>

                                        {/* Square Image Section - Centered */}
                                        <div className="absolute inset-0 flex items-center justify-center pt-16 pb-16">
                                            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 overflow-hidden rounded-xl border-2 border-white/20">
                                                <img
                                                    src={athlete.image || '/logo1.png'}
                                                    alt={athlete.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src = '/logo1.png';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Visit Store Front Button - Overlayed at bottom */}
                                        <div className="absolute bottom-6 left-4 right-4 z-20">
                                            <button 
                                                className="w-full bg-gradient-to-r from-[#D4BC6D] to-[#F4D03F] text-black font-bold py-2 px-3 text-xs sm:py-3 sm:px-4 sm:text-sm rounded-full hover:from-[#F4D03F] hover:to-[#D4BC6D] transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (athlete.onCardClick) athlete.onCardClick();
                                                }}
                                            >
                                                Visit Store Front
                                            </button>
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
                                        onClick={() => handleTierClick(item.title)}
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
                                onClick={() => handleTierClick(item.title)}
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tier Athletes Section */}
            {showTierAthletes && selectedTier && (
                <section id="tier-athletes-section" className="py-10 bg-black px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                            <h1 className="text-3xl sm:text-4xl lg:text-[4rem] text-center sm:text-left capitalize font-medium bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent mb-4 sm:mb-0 leading-normal">
                                {selectedTier} Athletes
                            </h1>
                            <button
                                onClick={() => setShowTierAthletes(false)}
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
                                <p>Loading {selectedTier} athletes...</p>
                            </div>
                        ) : paginatedTierAthletes.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
                                {paginatedTierAthletes.map((athlete, index) => (
                                    <div
                                        key={athlete.id || index}
                                        onClick={athlete.onCardClick}
                                        className="relative bg-cover bg-center bg-no-repeat border border-gray-700 rounded-2xl hover:border-[#D4BC6D] transition-all duration-300 cursor-pointer group hover:scale-105 transform overflow-hidden aspect-[4/5]"
                                        style={{backgroundImage: 'url(/bg-2.jpeg)'}}
                                    >
                                        <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
                                        
                                        {/* Tier Badge */}
                                        <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full z-30 ${
                                            selectedTier.toLowerCase() === 'bronze' ? 'bg-amber-600' :
                                            selectedTier.toLowerCase() === 'silver' ? 'bg-gray-400' :
                                            selectedTier.toLowerCase() === 'gold' ? 'bg-yellow-500' :
                                            selectedTier.toLowerCase() === 'diamond' ? 'bg-blue-400' :
                                            selectedTier.toLowerCase() === 'emerald' ? 'bg-green-500' :
                                            selectedTier.toLowerCase() === 'royal' ? 'bg-purple-600' : 'bg-gray-600'
                                        }`}>
                                            {selectedTier}
                                        </div>
                                        
                                        {/* Trending Badge */}
                                        {athlete.isTrending && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-30">
                                                Trending
                                            </div>
                                        )}
                                        
                                        {/* Athlete Name - Overlayed at top */}
                                        <div className="absolute top-10 left-4 right-4 z-20">
                                            <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg text-center drop-shadow-lg line-clamp-2 bg-black/30 rounded-lg px-2 py-2">
                                                {athlete.name || 'Athlete Name'}
                                            </h3>
                                        </div>

                                        {/* Square Image Section - Centered */}
                                        <div className="absolute inset-0 flex items-center justify-center pt-16 pb-16">
                                            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 overflow-hidden rounded-xl border-2 border-white/20">
                                                <img
                                                    src={athlete.image || '/logo1-bgremove.png'}
                                                    alt={athlete.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src = '/logo1-bgremove.png';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Visit Store Front Button - Overlayed at bottom */}
                                        <div className="absolute bottom-6 left-4 right-4 z-20">
                                            <button 
                                                className="w-full bg-gradient-to-r from-[#D4BC6D] to-[#F4D03F] text-black font-bold py-2 px-3 text-xs sm:py-3 sm:px-4 sm:text-sm rounded-full hover:from-[#F4D03F] hover:to-[#D4BC6D] transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (athlete.onCardClick) athlete.onCardClick();
                                                }}
                                            >
                                                Visit Store Front
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-white py-8">
                                <p className="text-lg">No {selectedTier} athletes found.</p>
                                <p className="text-gray-400 text-sm mt-2">Check back later as more athletes join this tier.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {tierTotalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Page Info */}
                                <div className="text-gray-400 text-sm">
                                    Showing {((tierCurrentPage - 1) * itemsPerPage) + 1} to {Math.min(tierCurrentPage * itemsPerPage, tierAthletesForDisplay.length)} of {tierAthletesForDisplay.length} {selectedTier} athletes
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center space-x-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handleTierPageChange(tierCurrentPage - 1)}
                                        disabled={tierCurrentPage === 1}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            tierCurrentPage === 1
                                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-700 text-white hover:bg-[#D4BC6D] hover:text-black'
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex space-x-1">
                                        {[...Array(tierTotalPages)].map((_, index) => {
                                            const page = index + 1;
                                            const isCurrentPage = page === tierCurrentPage;
                                            
                                            if (
                                                page === 1 ||
                                                page === tierTotalPages ||
                                                (page >= tierCurrentPage - 1 && page <= tierCurrentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handleTierPageChange(page)}
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
                                                page === tierCurrentPage - 2 ||
                                                page === tierCurrentPage + 2
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
                                        onClick={() => handleTierPageChange(tierCurrentPage + 1)}
                                        disabled={tierCurrentPage === tierTotalPages}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            tierCurrentPage === tierTotalPages
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

        </>
    )
}

export default ExploreAthletes
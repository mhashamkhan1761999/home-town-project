import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import React from 'react';
import { EffectCoverflow } from 'swiper/modules';

const CarouselSliderNoFlip = ({ data }) => {
  return (
    <div className="w-full py-10 infinite-slider2">
      <Swiper
        dir='ltr'
        direction='horizontal'
        effect='coverflow'
        centeredSlides={true}
        grabCursor={true}
        slidesPerView={"auto"}
        slideToClickedSlide={true}
        initialSlide={data?.length - 1 > 2 ? 2 : 1}
        onSlideChange={(swiper) => {
          console.log('Slide changed to index:', swiper.activeIndex);
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: -10,
          depth: 200,
          modifier: 2.5,
          slideShadows: false,
        }}
        spaceBetween={20}
        modules={[EffectCoverflow]}
        className="swiper-container"
      >
        {data?.map((props, index) => (
          <SwiperSlide key={index} className="group">
            <Card {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSliderNoFlip;

const Card = ({
  name,
  image,
  rating,
  subTitle,
  isTrending = false,
  sport = '',
  homeTown = [],
  backheading = '',
  about = '',
  onCardClick,
}) => {
  const handleCardClick = (e) => {
    if (onCardClick) {
      e.stopPropagation();
      onCardClick();
    }
  };

  // Use coming-soon.png as fallback instead of question-mark
  const displayImage = image || '/coming-soon.png';

  return (
    <div
      className="relative w-full sm:w-full h-[400px] sm:h-full mx-auto cursor-pointer"
      onClick={handleCardClick}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Single card without flip functionality */}
      <div className="relative w-full h-full">
        {/* Card Background */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-no-repeat bg-cover bg-center border border-[#2f2f2f] bg-[rgba(255,255,255,0.05)] backdrop-sepia-40 overflow-hidden"
          style={{ backgroundImage: `url(${displayImage})` }}
        >
          {/* Athlete Name - Overlayed at top */}
          <div className="absolute top-4 left-4 right-4 z-20">
            <h3 className="text-white font-bold font-sans text-lg sm:text-4xl text-center drop-shadow-lg line-clamp-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              {name.toUpperCase() || 'ATHLETE NAME'}
            </h3>
          </div>

          {/* View Storefront Button - Overlayed at bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <button 
              className="w-full bg-gradient-to-r from-[#D4BC6D] to-[#F4D03F] text-black font-bold py-3 px-4 text-sm rounded-full hover:from-[#F4D03F] hover:to-[#D4BC6D] transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                if (onCardClick) onCardClick();
              }}
            >
              View Storefront
            </button>
          </div>

          {/* Trending Badge (if applicable) */}
          {isTrending && (
            <div className="absolute top-1 right-1 z-10">
              <img
                src="/advance-star.svg"
                alt="trending"
                className="w-16 h-16 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
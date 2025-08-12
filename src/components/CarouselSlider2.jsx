// import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import React, { useState } from 'react';

import { EffectCoverflow } from 'swiper/modules';
import { StarIcon } from 'lucide-react';

const CarouselSlider2 = ({ data }) => {

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
        initialSlide={data?.length - 1 > 2 ? 2 : 1} // Center the third athlete initially
        // side click to change the slide
        // slide start from 3 slide

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
        // breakpoints={{
        //     640: {
        //         slidesPerView: 2,
        //         spaceBetween: 20,
        //     },
        //     1024: {
        //         slidesPerView: 5,
        //         spaceBetween: 0,
        //     },
        // }}
        className="swiper-container"
      >
        {data?.map((props, index) => (
          <SwiperSlide key={index} className="group">
            <Card {...props} />
          </SwiperSlide>
        ))
        }
      </Swiper>
    </div >
  );
}

export default CarouselSlider2



// ✅ Card.jsx
// const Card = ({ name, image, rating, subTitle, isTrending = false, sport = '', homeTown = [], backheading='',  about = '' ,}) => (
// //   <div className="relative w-full h-[450px] group perspective">
//    <div className="relative w-full sm:w-full w-full h-[400px] sm:h-[450px] group perspective mx-auto">
//     <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">

//       {/* Front Side */}
//       <div
//         className="absolute inset-0 w-full h-full p-3 rounded-2xl bg-no-repeat bg-cover bg-center border border-[#2f2f2f] bg-[rgba(255,255,255,0.05)] backdrop-sepia-40 overflow-hidden backface-hidden"
//         style={{ backgroundImage: `url(${image})` }}
//       >
//         <div className="absolute bottom-3 left-0 w-full">
//           <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[#2f2f2f] rounded-2xl py-3 px-6 mx-3">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h6 className="text-base font-bold text-[#d4bc6d] mb-2.5">{subTitle}</h6>
//                 <h2 className="text-xl font-extrabold text-white">{name}</h2>
//               </div>
//               <div>
//                 <h6 className="text-sm font-bold text-end text-white mb-2.5">{sport}</h6>
//                 <h6 className="text-sm font-bold text-end text-white">
//                   {homeTown?.length > 0 && homeTown?.join(', ')}
//                 </h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Back Side */}
//       <div className="absolute inset-0 w-full h-full bg-[#111] rounded-2xl border border-[#2f2f2f] text-white px-6 py-8 flex items-center justify-center text-center rotate-y-180 backface-hidden">
//          <div>
//           {about.split('\n\n').map((section, idx) => {
//             const [heading, ...rest] = section.split(':');
//             return (
//               <div key={idx} className="mb-4">
//                 <h3 className="text-xl font-bold text-[#d4bc6d] mb-2">{heading.trim()}</h3>
//                 <p className="text-sm sm:text-base leading-relaxed">{rest.join(':').trim()}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//     </div>
//   </div>
// );


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
}) => {
  const [flipped, setFlipped] = useState(false);

  // Detect mobile using window width
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const handleFlip = () => {
    if (isMobile) setFlipped((prev) => !prev);
  };

  return (
    <div
      className="relative w-full sm:w-full h-[400px] sm:h-full group perspective mx-auto"
      onClick={handleFlip}
      style={{ cursor: isMobile ? 'pointer' : 'default', touchAction: 'manipulation' }}
    >
      <div
        className={
          "relative w-full h-full transition-transform duration-700 preserve-3d " +
          ((flipped || (!isMobile && false)) ? "rotate-y-180" : "") +
          (!isMobile ? " group-hover:rotate-y-180" : "")
        }
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full p-3 rounded-2xl bg-no-repeat bg-cover bg-center border border-[#2f2f2f] bg-[rgba(255,255,255,0.05)] backdrop-sepia-40 overflow-hidden backface-hidden"
          style={{ backgroundImage: `url(${image})` }}
        >
          {name && (
            <div className="absolute bottom-3 left-0 w-full">
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[#2f2f2f] rounded-2xl py-3 px-6 mx-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="text-base font-bold text-[#d4bc6d] mb-2.5">{subTitle}</h6>
                    <h2 className="text-xl font-extrabold text-white">{name}</h2>
                  </div>
                  <div>
                    <h6 className="text-sm font-bold text-end text-white mb-2.5">{sport}</h6>
                    <h6 className="text-sm font-bold text-end text-white">
                      {homeTown?.length > 0 && homeTown?.join(', ')}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full bg-[#111] rounded-2xl border border-[#2f2f2f] text-white px-6 py-8 flex items-center justify-center text-center rotate-y-180 backface-hidden">
          <div>
            {about.split('\n\n').map((section, idx) => {
              const [heading, ...rest] = section.split(':');
              return (
                <div key={idx} className="mb-4">
                  <h3 className="text-xl font-bold text-[#d4bc6d] mb-2">{heading.trim()}</h3>
                  <p className="text-sm sm:text-base leading-relaxed">{rest.join(':').trim()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
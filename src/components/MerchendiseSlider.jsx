import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';


import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const MerchendiseSlider = ({ data }) => {
    // console.log(data) 

    return (
        <div className="w-full py-10 marchindise ms-28">
            <Swiper
                dir='ltr'
                grabCursor={true}
                slidesPerView={"auto"}
                loop={true}
                slideToClickedSlide={true}
                initialSlide={0} // Center the third athlete initially
                coverflowEffect={{
                    rotate: 0,
                    stretch: -10,
                    depth: 200,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                spaceBetween={41}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet merchandise-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active merchandise-bullet-active',
                }}
                navigation={{
                    prevEl: '.merchandise-nav-prev',
                    nextEl: '.merchandise-nav-next',
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper-container merchandise-swiper"
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

export default MerchendiseSlider;


// ✅ Card Component
const Card = ({ id, name, image, images = [], description, price }) => {
    // console.log(images,"img")
    // Choose correct image
    const displayImage =
        image
            ? `https://admin.hometownheroagency.com/storage/app/public/${image}`
            : images.length > 0
            ? `https://admin.hometownheroagency.com/storage/app/public/${images[0].image}`
            : '/shirt.svg';

    return (
        <div className="w-full h-full bg-[url('/card.svg')] bg-cover bg-center bg-no-repeat rounded-2xl relative">
            {/* Product ID */}
            {/* <div className="p-3 absolute top-14 right-1.5">
                <p className="m-0 text-[1.389rem] font-semibold text-white text-center">
                    {id?.toString()?.padStart(2, '0')}
                </p>
            </div> */}

            <div className="flex flex-col justify-end h-full px-6 pt-6">
                {/* Image */}
                <div
                    className="h-[15.25rem] w-full bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${displayImage})`,
                    }}
                ></div>

                {/* Info */}
                <div className="flex flex-col items-start gap-1 mb-4">
                    <p className="text-white font-semibold">{name}</p>
                    <p className="text-gray-300 text-xs truncate max-w-[12rem]">
                        {description || "No description"}
                    </p>
                    <p className="text-[#D4BC6D] font-bold text-sm">
                        ${price ?? "0.00"}
                    </p>
                </div>

                {/* View Button */}
                <a
                    href={`/product/${id}`}
                    className="bg-[#57430D] py-2.5 inline-flex items-center justify-center text-white rounded-full w-full font-bold text-sm"
                >
                    View
                </a>
            </div>
        </div>
    );
};

// Add custom styles for pagination
const styles = `
.merchandise-swiper .swiper-pagination {
    position: relative !important;
    margin-top: 30px !important;
    text-align: center !important;
}

.merchandise-bullet {
    width: 12px !important;
    height: 12px !important;
    background: rgba(212, 188, 109, 0.3) !important;
    border-radius: 50% !important;
    margin: 0 6px !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
}

.merchandise-bullet-active {
    background: #D4BC6D !important;
    transform: scale(1.2) !important;
}

.merchandise-bullet:hover {
    background: rgba(212, 188, 109, 0.6) !important;
}
`;

// Inject styles into the head
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

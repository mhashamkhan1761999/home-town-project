import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';


import { EffectCoverflow } from 'swiper/modules';

const MerchendiseSlider = ({ data }) => {
    console.log(data) 

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
                modules={[EffectCoverflow]}
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

export default MerchendiseSlider;


// ✅ Card Component
const Card = ({ id, name, image, images = [], description, price }) => {
    console.log(images,"img")
    // Choose correct image
    const displayImage =
        image
            ? `https://hometown.eagleeblaze.com/storage/app/public/${image}`
            : images.length > 0
            ? `https://hometown.eagleeblaze.com/storage/app/public/${images[0].image}`
            : '/shirt.svg';

    return (
        <div className="w-full h-full bg-[url('/card.svg')] bg-cover bg-center bg-no-repeat rounded-2xl relative">
            {/* Product ID */}
            <div className="p-3 absolute top-14 right-1.5">
                <p className="m-0 text-[1.389rem] font-semibold text-white text-center">
                    {id?.toString()?.padStart(2, '0')}
                </p>
            </div>

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
            </div>
        </div>
    );
};

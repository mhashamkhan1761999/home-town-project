import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';


import { EffectCoverflow } from 'swiper/modules';
import VaultCard from './VaultCard';

const AthletesVaultSlider = ({ data }) => {

    return (
        <div className="w-full py-10 marchindise ms-28">
            <Swiper
                dir='ltr'
                // grabCursor={true}
                slidesPerView={"auto"}
                loop={true}
                // slideToClickedSlide={true}
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
                        <VaultCard {...props} />
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </div >
    );
}

export default AthletesVaultSlider;
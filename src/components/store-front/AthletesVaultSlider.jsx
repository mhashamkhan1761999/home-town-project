import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';


import { EffectCoverflow, Pagination } from 'swiper/modules';
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
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet vault-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active vault-bullet-active',
                }}
                modules={[EffectCoverflow, Pagination]}
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
                className="swiper-container vault-swiper"
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

// Add custom styles for vault pagination
const vaultStyles = `
.vault-swiper .swiper-pagination {
    position: relative !important;
    margin-top: 30px !important;
    text-align: center !important;
}

.vault-bullet {
    width: 12px !important;
    height: 12px !important;
    background: rgba(212, 188, 109, 0.3) !important;
    border-radius: 50% !important;
    margin: 0 6px !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
}

.vault-bullet-active {
    background: #D4BC6D !important;
    transform: scale(1.2) !important;
}

.vault-bullet:hover {
    background: rgba(212, 188, 109, 0.6) !important;
}
`;

// Inject styles into the head
if (typeof document !== 'undefined') {
    const vaultStyleSheet = document.createElement('style');
    vaultStyleSheet.type = 'text/css';
    vaultStyleSheet.innerText = vaultStyles;
    document.head.appendChild(vaultStyleSheet);
}
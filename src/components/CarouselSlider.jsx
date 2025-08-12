import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';


import { EffectCoverflow } from 'swiper/modules';

const CarouselSlider = ({ data }) => {

    return (
        <div className="w-full py-10 infinite-slider">
            <Swiper
                dir='ltr'
                direction='horizontal'
                effect='coverflow'
                centeredSlides={true}
                grabCursor={true}
                slidesPerView={"auto"}

                slideToClickedSlide={true}
                initialSlide={2} // Center the third athlete initially
                // side click to change the slide
                // slide start from 3 slide

                onSlideChange={(swiper) => {
                    console.log('Slide changed to index:', swiper.activeIndex);
                    if (swiper.activeIndex === 0) {
                        swiper.slideTo(2); // Go to the third slide
                    }
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

export default CarouselSlider



const Card = ({ name, image, rating, subTitle }) => (
    <div
        className={`w-full h-full p-3 bg-[rgba(255,255,255,0.05)] backdrop-sepia-40 border border-[#2f2f2f] rounded-2xl bg-no-repeat bg-cover bg-center relative overflow-hidden`}
        style={{ backgroundImage: `url(${image})` }}
    >
        {/* start rating */}
        <div div className="absolute top-[23px] right-[11px] z-10 flex gap-0">
            {Array(rating).fill().map((_, i) => (
                <img src="/star.svg" alt="rating" className="w-[18px] h-[16px] object-contain" />
            ))}
        </div>

        <div className="absolute bottom-3 left-0 w-full">
            <div className="bg-[rgba(255,255,255,0.05)] backdrop-sepia-15 border border-[#2f2f2f] rounded-2xl py-3 px-6 mx-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h6 className="text-[0.794rem] font-bold text-[#d4bc6d] mb-2.5">
                            {subTitle}
                        </h6>
                        <h2 className="text-xl font-extrabold text-white">
                            {name}
                        </h2>
                    </div>
                    <div>
                        {/* <h6 className="text-[0.794rem] font-bold text-white mb-2.5">
                            Follow Us
                        </h6>
                        <div className="flex items-center gap-5">
                            <a href="#">
                                <svg
                                    fill="none"
                                    height="25"
                                    viewBox="0 0 26 25"
                                    width="26"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_305_608)">
                                        <path
                                            clipRule="evenodd"
                                            d="M13.4719 0.198242C20.3874 0.198242 25.9935 5.56064 25.9935 12.1755C25.9935 18.7903 20.3874 24.1527 13.4719 24.1527C6.55634 24.1527 0.950195 18.7903 0.950195 12.1755C0.950195 5.56064 6.55634 0.198242 13.4719 0.198242Z"
                                            fill="#D4BC6D"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            d="M15.103 24.0522V14.799H17.8319L18.1936 11.5422H15.103L15.1076 9.91209C15.1076 9.06267 15.192 8.60774 16.4683 8.60774H18.1745V5.35046H15.445C12.1663 5.35046 11.0125 6.93025 11.0125 9.58734V11.5425H8.96875V14.7995H11.0125V23.921C11.8087 24.0727 12.6319 24.1528 13.4747 24.1528C14.0192 24.1528 14.5631 24.1192 15.103 24.0522Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_305_608">
                                            <rect
                                                fill="white"
                                                height="23.9545"
                                                transform="translate(0.951172 0.198242)"
                                                width="25.0433"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="#">
                                <svg
                                    fill="none"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    width="25"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_305_612)">
                                        <path
                                            d="M8.88935 12.1754C8.88935 10.191 10.4976 8.58193 12.4821 8.58193C14.4666 8.58193 16.0757 10.191 16.0757 12.1754C16.0757 14.1598 14.4666 15.7688 12.4821 15.7688C10.4976 15.7688 8.88935 14.1598 8.88935 12.1754ZM6.94672 12.1754C6.94672 15.2325 9.4249 17.7105 12.4821 17.7105C15.5393 17.7105 18.0175 15.2325 18.0175 12.1754C18.0175 9.11832 15.5393 6.64024 12.4821 6.64024C9.4249 6.64024 6.94681 9.11815 6.94681 12.1754H6.94672ZM16.9431 6.42077C16.943 6.67661 17.0188 6.92673 17.1608 7.13951C17.3029 7.35229 17.5048 7.51816 17.7412 7.61616C17.9775 7.71416 18.2376 7.73988 18.4886 7.69007C18.7395 7.64026 18.97 7.51715 19.151 7.33632C19.332 7.15549 19.4553 6.92505 19.5053 6.67415C19.5553 6.42325 19.5298 6.16315 19.432 5.92675C19.3342 5.69034 19.1685 5.48825 18.9558 5.34603C18.7431 5.20381 18.4931 5.12784 18.2372 5.12774H18.2367C17.8937 5.1279 17.5649 5.26417 17.3223 5.50661C17.0798 5.74905 16.9434 6.07784 16.9431 6.42077ZM8.127 20.9497C7.07599 20.9019 6.50474 20.7268 6.12512 20.5789C5.62182 20.383 5.26272 20.1496 4.88516 19.7726C4.50761 19.3956 4.2739 19.0369 4.07882 18.5336C3.93084 18.1541 3.75577 17.5827 3.70799 16.5318C3.65573 15.3955 3.6453 15.0542 3.6453 12.1756C3.6453 9.29691 3.6566 8.95654 3.70799 7.81934C3.75586 6.76838 3.93222 6.1981 4.07882 5.81754C4.27476 5.31427 4.50813 4.95518 4.88516 4.57764C5.2622 4.2001 5.62096 3.9664 6.12512 3.77133C6.50457 3.62335 7.07599 3.44829 8.127 3.40052C9.26329 3.34826 9.60463 3.33783 12.4821 3.33783C15.3596 3.33783 15.7012 3.34895 16.8385 3.40069C17.8895 3.44855 18.4598 3.62491 18.8404 3.77151C19.3437 3.96657 19.7028 4.20079 20.0803 4.57781C20.4579 4.95484 20.6907 5.31444 20.8867 5.81772C21.0346 6.19716 21.2097 6.76856 21.2575 7.81952C21.3097 8.95671 21.3202 9.29709 21.3202 12.1757C21.3202 15.0544 21.3097 15.3948 21.2575 16.532C21.2096 17.5829 21.0337 18.1541 20.8867 18.5338C20.6907 19.037 20.4574 19.3961 20.0803 19.7728C19.7033 20.1495 19.3437 20.3832 18.8404 20.5791C18.4609 20.7271 17.8895 20.9021 16.8385 20.9499C15.7022 21.0022 15.3609 21.0126 12.4821 21.0126C9.60333 21.0126 9.26294 21.0022 8.127 20.9499V20.9497ZM8.03774 1.46115C6.89015 1.51341 6.10597 1.69537 5.42114 1.96184C4.71234 2.23702 4.11151 2.6062 3.51154 3.20519C2.91157 3.80419 2.54333 4.40508 2.26814 5.11472C2.00166 5.79995 1.81969 6.58367 1.76743 7.73121C1.71431 8.88057 1.70215 9.24802 1.70215 12.1754C1.70215 15.1028 1.71431 15.4702 1.76743 16.6196C1.81969 17.7672 2.00166 18.5508 2.26814 19.2361C2.54333 19.9448 2.91166 20.5468 3.51154 21.1456C4.11142 21.7443 4.71148 22.113 5.42114 22.3889C6.10727 22.6554 6.89015 22.8374 8.03774 22.8896C9.18774 22.9419 9.55461 22.9549 12.4821 22.9549C15.4096 22.9549 15.7771 22.9427 16.9265 22.8896C18.0741 22.8374 18.8578 22.6554 19.543 22.3889C20.2519 22.113 20.8527 21.7446 21.4527 21.1456C22.0526 20.5466 22.4201 19.9448 22.6961 19.2361C22.9625 18.5508 23.1454 17.7671 23.1968 16.6196C23.249 15.4694 23.2612 15.1028 23.2612 12.1754C23.2612 9.24802 23.249 8.88057 23.1968 7.73121C23.1445 6.58358 22.9625 5.79952 22.6961 5.11472C22.4201 4.40595 22.0517 3.80514 21.4527 3.20519C20.8536 2.60525 20.2518 2.23702 19.5439 1.96184C18.8578 1.69537 18.074 1.51255 16.9273 1.46115C15.7777 1.40864 15.4104 1.39587 12.4834 1.39587C9.55633 1.39587 9.18818 1.40803 8.03817 1.46115"
                                            fill="#D4BC6D"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_305_612">
                                            <rect
                                                fill="white"
                                                height="23.9545"
                                                transform="translate(0.503906 0.19812)"
                                                width="23.9545"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
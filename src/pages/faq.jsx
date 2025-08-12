import React from 'react'
import Faqs from '../components/Faqs'

const Faq = () => {
    return (
        <>
            <section className="py-[100px] md:py-[120px] lg:py-[142px] bg-black px-4">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                        <div>
                            <img
                                src="/faq.jpeg"
                                alt="FAQ"
                                className="w-full max-w-[37.875rem] h-auto md:h-[25rem] object-cover object-center rounded-2xl mx-auto"
                            />
                        </div>


                        <div>
                            <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.875rem] font-bold capitalize tracking-tight leading-[100%] bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent text-center md:text-left">
                                Frequently Asked Questions
                            </h2>
                        </div>
                    </div>
                </div>
            </section>



            <section className="py-[80px] md:py-[100px] lg:py-[134px] px-4">
                <div className="max-w-screen-2xl mx-auto w-full">
                    <div className="border border-[#D4BC6D] border-[1.5px] w-full rounded-2xl">
                        <Faqs />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Faq
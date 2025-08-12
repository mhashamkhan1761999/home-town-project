import React from 'react'

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="w-full px-12 border-b border-[#202586]">
            <div className="flex justify-between items-center">
                <div className="font-semibold text-xl text-[#D4BC6D] py-5 text-balance grow">
                    {question?.id}.&nbsp;{question}
                </div>
                <div className="w-auto" type="button" onClick={onClick}>
                    {isOpen ? (
                        <svg
                            fill="none"
                            height="25"
                            viewBox="0 0 25 25"
                            width="25"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect fill="#D4BC6D" height="25" rx="6.84" width="25" />
                            <rect
                                fill="white"
                                height="12"
                                transform="rotate(90 18.5 11)"
                                width="3"
                                x="18.5"
                                y="11"
                            />
                            <rect
                                fill="white"
                                height="3"
                                transform="rotate(180 18.5 14)"
                                width="12"
                                x="18.5"
                                y="14"
                            />
                        </svg>
                    ) : (
                        <svg
                            fill="none"
                            height="25"
                            viewBox="0 0 25 25"
                            width="25"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect fill="#D4BC6D" height="25" rx="6.84" width="25" />
                            <rect fill="white" height="12" width="3" x="11" y="6.5" />
                            <rect fill="white" height="3" width="12" x="6.5" y="11" />
                        </svg>
                    )}


                </div>
            </div>

            {isOpen && (
                <div className="w-full">
                    <p className='font-normal text-base text-white pb-11'>
                        {answer}
                    </p>
                </div>
            )}

        </div>
    )
}

export default FaqItem
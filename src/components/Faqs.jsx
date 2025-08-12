import React from 'react'
import FaqItem from './FaqItem';
import { useState } from 'react';


const faqs = [
    {
        id: 1,
        question: "How much does it cost to work with Hometown Hero?",
        answer: "Launching a service with Hometown Hero is completely free! However, if no sales are made within 60 days, a $25 inactivity service fee will apply.",
    },
    {
        id: 2,
        question: "What is Hometown Hero?",
        answer: "Hometown Hero is a platform that helps athletes build their brand and monetize their name, image, and likeness (NIL). Whether you're a youth, high school, college, or pro athlete, we provide tools to grow your influence and maximize your earnings.",
    },
    {
        id: 3,
        question: "Who is Hometown Hero for?",
        answer: "Hometown Hero is for:✔ **Athletes* – Looking to build their brand and earn from NIL opportunities.✔ *Fans* – Supporters who want to connect with athletes through custom merchandise and player cards.",
    },
    {
        id: 4,
        question: "What is NIL?",
        answer: "NIL (Name, Image, and Likeness) refers to an athlete's right to earn money from their personal brand. This includes sponsorships, endorsements, merchandise, social media deals, and more. College and some high school athletes can now legally profit from NIL without losing eligibility. Right now if you’re not NIL eligible, don’t stress! HometownHero is on some game changing that might work for you down the line…",
    },
    {
        id: 5,
        question: "Can I profit off NIL?",
        answer: "Yes, you can profit from NIL if you're eligible. College and pro athletes can earn in all 50 U.S. states. High school eligibility depends on your state—NIL is currently not allowed in Texas, Missouri, New Jersey, New York, Illinois, or Iowa. International athletes must confirm local NIL laws before earning. If you're not eligible, you can still launch and build your brand, but earnings will be restricted. Always ensure your personal info (name, location, level) is accurate to avoid issues with eligibility or governing bodies.",
    },
    {
        id: 6,
        question: "How do athletes get paid?",
        answer: "Athletes get paid directly from their sales! You can track earnings in real-time through your dashboard and cash out anytime. Our platform ensures full earning transparency and instant payouts, giving you complete control over your income.",
    },
    {
        id: 7,
        question: "Can I use my school’s logo?",
        answer: "You can't use your school's logo unless we have a partnership with your team. If you'd like us to help get approval, provide us with contact information for your coach, licensing office, or athletic director, and we'll work on securing the rights.👉 If needed, our designers can edit out your school's logo from your pictures to ensure compliance.",
    },
    {
        id: 8,
        question: "What percentage of revenue do I get?",
        answer: "Revenue share depends on your sales performance. Hometown Hero offers some of the highest percentage returns in the NIL market(up to 50%!),  allowing athletes to maximize earnings though with our support.",
    },
    {
        id: 9,
        question: "Does Hometown Hero work with all sports?",
        answer: "Yes! Hometown Hero is open to all athletes, regardless of sport, country or age. Whether you're a football player, basketball star, track athlete, or esports competitor, we help you monetize your brand and build your NIL potential.",
    },
    {
        id: 10,
        question: "How much does it cost to work with Hometown Hero?",
        answer: "Working with Hometown Hero is completely free. There are no upfront costs — you can sign up, launch your services, build your personal brand, and start earning through NIL today!",
    },
];

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(0); // 0 = default open

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index); // toggle same index
    };

    return (
        <>
            {faqs.map((faq, index) => (
                <FaqItem
                    uniqueKey={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={activeIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </>
    )
}

export default Faqs
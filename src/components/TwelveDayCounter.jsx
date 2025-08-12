import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TwelveDayCounter = () => {
    const navigate = useNavigate();

    const startDate = new Date('2025-07-24'); // Start date of the 12-day counter
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 12); // Adds 12 days

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0) return null;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // 🔒 Redirect to login if not logged in
    useEffect(() => {
        const athlete = localStorage.getItem('athlete');
        if (!athlete) {
            navigate('/athlete/dashboard');
        }
    }, [navigate]);

    // ⏱️ Start countdown
    useEffect(() => {
        const timer = setInterval(() => {
            const updated = calculateTimeLeft();
            setTimeLeft(updated);
            if (!updated) clearInterval(timer); // Stop when expired
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-red-600 font-bold text-3xl">
                ⏳ Time's up!
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black space-y-8 px-4">
            {/* 🐝 Logo */}
            <img
                src="/logo-(1).png"
                alt="Logo"
                className="h-32 sm:h-40 md:h-48 w-auto"
            />

            {/* 🕒 Countdown Timer */}
            <div className="text-center text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,#d4bc6d,#57430d)]">
                <p className="text-[1.25rem] sm:text-2xl md:text-3xl mb-2 font-semibold text-white">
                    We’re reviewing your profile to see if you qualify to join the
                    <br className="hidden md:block" />
                    <span className="text-[#d4bc6d] font-bold">Athlete Marketplace</span>.
                </p>
                <p>
                    {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                </p>
            </div>

            {/* 🔁 Homepage Redirect */}
            <Link
                to="/"
                className="mt-4 px-6 py-3 bg-[#d4bc6d] text-black font-semibold rounded-full hover:bg-[#b6a255] transition duration-300 text-base sm:text-lg"
            >
                Go to Homepage
            </Link>
        </div>

    );
};

export default TwelveDayCounter;

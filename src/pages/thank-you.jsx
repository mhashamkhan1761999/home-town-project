import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] text-white px-4">
            <CheckCircle className="w-20 h-20 text-green-400 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg text-center max-w-md mb-6">
                We’ve received your order and it’s being processed. You’ll receive an email confirmation shortly.
            </p>
            <Link
                className="bg-[#D4BC6D] text-black px-6 py-2 rounded-2xl font-semibold hover:bg-[#bba557] transition"
                to="/store-front"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default ThankYou;

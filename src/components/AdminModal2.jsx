import React, { useRef, useState, useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/index.js";
import { LoaderCircle } from "lucide-react";
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/slices/authSlice.js';

const AdminModal2 = ({ onClose, userAge: passedUserAge }) => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [isSigned, setIsSigned] = useState(false);
    const [signatureData, setSignatureData] = useState('');
    const [userAge] = useState(Number(passedUserAge ?? 19)); // ✅ Safe default

    const mutation = useMutation({
        mutationKey: ['add-agree'],
        mutationFn: (data) => postRequest('/age-agreemnet', data),
        onSuccess: (data) => {
            if (data?.statusCode === 200) {
                dispatch(saveUser({ user: data?.response?.data }));
                onClose();
            }
        }
    });

    const onAgree = (e) => {
        e.preventDefault();
        const newData = new FormData();
        newData.append('athlete_name', name);
        newData.append('signature', signatureData);
        // Always send current system date in YYYY-MM-DD format
        newData.append('date', new Date().toISOString().split('T')[0]);
        mutation.mutate(newData);
    };

    // Helper function to get coordinates from both mouse and touch events
    const getEventPos = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        if (event.touches && event.touches[0]) {
            // Touch event
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        } else {
            // Mouse event
            return {
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY
            };
        }
    };

    const startDrawing = (event) => {
        event.preventDefault(); // Prevent scrolling on touch
        const pos = getEventPos(event);
        contextRef.current.beginPath();
        contextRef.current.moveTo(pos.x, pos.y);
        contextRef.current.stroke();
    };

    const draw = (event) => {
        if (!isSigned) return;
        event.preventDefault(); // Prevent scrolling on touch
        const pos = getEventPos(event);
        contextRef.current.lineTo(pos.x, pos.y);
        contextRef.current.stroke();
    };

    const stopDrawing = () => {
        setIsSigned(false);
        contextRef.current.closePath();
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setIsSigned(false);
        setSignatureData('');
    };

    const saveSignature = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');
        setSignatureData(dataUrl);
    };

    // ✅ Setup canvas + auto date
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000';
        setDate(new Date().toISOString().split("T")[0]); // today’s date
    }, []);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-black border border-[#D4BC6D] w-full max-w-5xl rounded-lg shadow-lg flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-[#D4BC6D] flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#D4BC6D]">Services Contract Agreement</h2>
                </div>

                {/* Scrollable Content */}
                <div className="px-6 py-4 overflow-y-auto flex-1">
                    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
                        <section>
                            {/* Agreement text */}

                            <h2 className="text-2xl font-semibold text-[#D4BC6D] mb-4">Hometown Hero Platform Agreement</h2>
                            <p className="text-lg mb-4 text-white">1. Agreement to Terms & Conditions<br/>By signing this agreement, you agree to the Hometown Hero Terms & Conditions.</p>

                            <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">2. Compensation</h3>
                            <p className="text-lg mb-4 text-white">You will be compensated based on the rates, percentages, and commissions displayed in your personal athlete dashboard. These amounts may vary per service and are subject to any applicable platform rules or service-specific adjustments.<br/>Note: Compensation is only available if you are NIL eligible or otherwise legally able to connect with brands and receive payment under your local laws.</p>

                            <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">3. Service Guidelines & Requirements</h3>
                            <p className="text-lg mb-4 text-white">You agree to perform the services outlined in your dashboard and follow the specific guidelines for your chosen service(s).<br/>You may remove your storefront or products at any time.</p>

                            <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">4. Confidentiality</h3>
                            <p className="text-lg mb-4 text-white">All information, communications, and materials shared with you through Hometown Hero are confidential and may not be sold, shared, or disclosed to third parties without written permission.</p>

                            <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">5. Service Fee Clause</h3>
                            <p className="text-lg mb-4 text-white">It is free to launch your service on the Hometown Hero platform.<br/>However, if you do not record at least one sale within 60 days of launch, a $25 service fee will be deducted from your account balance (or invoiced if there is no balance). You agree to this upon signing.</p>

                            <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">6. Eligibility & Legal Responsibility</h3>
                            <p className="text-lg text-white mb-4">You confirm that all information you provide is accurate and truthful.<br/>You are solely responsible for confirming your NIL (Name, Image, Likeness) eligibility based on your state or country’s laws before participating in paid services.<br/>Hometown Hero will not be held liable if you participate in a service you are not eligible for under applicable laws.<br/>If you are not NIL eligible, you may still participate in the platform’s non-compensated features but will not receive payment until you are eligible.</p>

                            {/* Conditional Parental Section */}
                            {userAge < 18 && (
                                <>
                                    <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">*. Parental/Guardian Consent</h3>
                                    <div className="mb-4">
                                        <label className="block text-lg mb-2 text-[#D4BC6D]">Name of Parent/Guardian:</label>
                                        <input type="text" className="w-full p-2 border border-[#D4BC6D] rounded-md bg-black text-white focus:outline-none focus:border-[#D4BC6D]" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-lg mb-2 text-[#D4BC6D]">Age:</label>
                                        <input type="number" className="w-full p-2 border border-[#D4BC6D] rounded-md bg-black text-white focus:outline-none focus:border-[#D4BC6D]" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-lg mb-2 text-[#D4BC6D]">Relationship to Athlete:</label>
                                        <input type="text" className="w-full p-2 border border-[#D4BC6D] rounded-md bg-black text-white focus:outline-none focus:border-[#D4BC6D]" />
                                    </div>
                                    {/* Signature Canvas */}
                                <div className="flex items-end mb-4">
                                    <div>
                                        <label htmlFor="athlete-signature" className="block text-lg mb-2 text-[#D4BC6D]">Signature:</label>
                                        <canvas
                                            ref={canvasRef}
                                            height={200}
                                            onMouseDown={(e) => { setIsSigned(true); startDrawing(e); }}
                                            onMouseMove={draw}
                                            onMouseUp={stopDrawing}
                                            onMouseOut={stopDrawing}
                                            onTouchStart={(e) => { setIsSigned(true); startDrawing(e); }}
                                            onTouchMove={draw}
                                            onTouchEnd={stopDrawing}
                                            style={{ border: "1px solid #D4BC6D", touchAction: "none", backgroundColor: "white" }}
                                        />
                                    </div>
                                    <div className="grow">
                                        {signatureData && <img src={signatureData} alt="Signature" style={{ maxWidth: "100%", border: "1px solid #D4BC6D" }} />}
                                    </div>
                                </div>
                                </>
                            )}

                            <h3 className="text-xl font-semibold text-[#D4BC6D] mb-4">7. Termination</h3>
                            <p className="text-lg mb-4 text-white">This agreement may be terminated by either party at any time.</p>

                            {/* Signature Form */}
                            <form onSubmit={onAgree} id="agree-form">
                                <label htmlFor="athlete" className="block text-lg mb-2 text-[#D4BC6D]">Athlete's Name:</label>
                                <input
                                    type="text"
                                    id="athlete"
                                    name="athlete"
                                    className="w-full p-2 border border-[#D4BC6D] rounded-md mb-4 bg-black text-white focus:outline-none focus:border-[#D4BC6D]"
                                    placeholder="Enter your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                {/* Signature Canvas */}
                                <div className="flex items-end mb-4">
                                    <div>
                                        <label htmlFor="athlete-signature" className="block text-lg mb-2 text-[#D4BC6D]">Signature:</label>
                                        <canvas
                                            ref={canvasRef}
                                            height={200}
                                            onMouseDown={(e) => { setIsSigned(true); startDrawing(e); }}
                                            onMouseMove={draw}
                                            onMouseUp={stopDrawing}
                                            onMouseOut={stopDrawing}
                                            onTouchStart={(e) => { setIsSigned(true); startDrawing(e); }}
                                            onTouchMove={draw}
                                            onTouchEnd={stopDrawing}
                                            style={{ border: "1px solid #D4BC6D", touchAction: "none", backgroundColor: "white" }}
                                        />
                                    </div>
                                    <div className="grow">
                                        {signatureData && <img src={signatureData} alt="Signature" style={{ maxWidth: "100%", border: "1px solid #D4BC6D" }} />}
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-4">
                                    <button type="button" onClick={handleClear} className="px-4 py-2 bg-[#4B4C46] text-[#D4BC6D] rounded hover:bg-[#5a5b54] transition">Clear</button>
                                    <button type="button" onClick={saveSignature} className="px-4 py-2 bg-[#D4BC6D] text-black rounded hover:bg-[#b89f4e] transition">SAVE</button>
                                </div>
                            </form>
                        </section>
                    </main>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-[#D4BC6D] flex justify-end">
                    <button
                        type="submit"
                        form="agree-form"
                        className="bg-[#D4BC6D] text-black px-6 py-3 rounded-full hover:bg-[#b89f4e] transition inline-flex items-center justify-center font-semibold"
                    >
                        Agree &nbsp;
                        {mutation?.isPending && <LoaderCircle className="animate-spin" size={17} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminModal2;

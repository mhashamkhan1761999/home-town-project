import React, { useRef, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/index.js";
import { queryClient } from "../main.jsx";
import { LoaderCircle, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/slices/authSlice.js';

const AdminModal2 = ({ onClose }) => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [isSigned, setIsSigned] = useState(false);
    const contextRef = useRef(null);
    const [signatureData, setSignatureData] = useState('');

    const mutation = useMutation({
        mutationKey: ['add-agree'],
        mutationFn: (data) => postRequest('/age-agreemnet', data),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ['get-timing'] });
            console.log('agree', data);
            if (data?.statusCode == 200) {
                dispatch(saveUser({ user: data?.response?.data }))
                onClose();
            }

        }
    })

    const onAgree = (e) => {
        e.preventDefault();
        const newData = new FormData();
        newData.append('athlete_name', name);
        newData.append('signature', signatureData);
        newData.append('date', date);
        mutation.mutate(newData)
    }

    const startDrawing = (event) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
        );
        contextRef.current.stroke();
    };

    const draw = (event) => {
        if (!isSigned) return;

        contextRef.current.lineTo(
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
        );
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
        setSignatureData(dataUrl); // This stores the image data
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    // Set up the canvas context
    React.useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000';
    }, []);

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg flex flex-col max-h-[90vh]">

                    {/* Modal Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Services Contract Agreement</h2>
                        {/* <button onClick={() => onClose()} className="text-gray-500 hover:text-black" type='button'>
                            <X size={20} />
                        </button> */}
                    </div>

                    {/* Scrollable Content */}
                    <div className="px-6 py-4 overflow-y-auto flex-1">
                        <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
                            <section>
                                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Hometown Hero Services Contract</h2>
                                <p class="text-lg mb-4">This contract ("Agreement") is made and entered into by and between Hometown Hero ("Company") and the undersigned athlete or representative ("Athlete").</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">1. Agreement Overview</h3>
                                <p class="text-lg mb-4">By signing this Agreement, the Athlete agrees to the terms and conditions set by Hometown Hero for this service and to participate in activities associated with this service as required.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">2. Athlete Responsibilities</h3>
                                <p class="text-lg mb-4">The Athlete agrees to:</p>
                                <ul class="list-disc list-inside space-y-2">
                                    <li>Follow the terms and conditions for this service.</li>
                                    <li>Participate in activities and campaigns related to this service.</li>
                                </ul>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">3. Service Fee</h3>
                                <p class="text-lg mb-4">The Athlete acknowledges that the service is free to launch. However, if the Athlete does not make a sale within 60 days of launching the service, a $25 fee will be charged to their account. By submitting this contract, the Athlete agrees to this fee and acknowledges that it will be deducted from their account if no sales are made within 60 days.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">4. Eligibility</h3>
                                <p class="text-lg mb-4">The Athlete certifies that all information provided to Hometown Hero is truthful and accurate. Hometown Hero advises the Athlete to check their eligibility regarding NIL (Name, Image, Likeness) deals before entering into any agreements. If the Athlete is not eligible for NIL deals, Hometown Hero will not be held accountable, and the Athlete will be solely liable.</p>
                                <p class="text-lg mb-4">The Athlete may still engage in platform activities even if they are not NIL eligible; however, they will not receive compensation from the platform due to state laws, which are subject to change and evolve over time.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">5. Confidentiality</h3>
                                <p class="text-lg mb-4">The Athlete agrees to maintain the confidentiality of any proprietary information shared by Hometown Hero. Hometown Hero does not sell or share any personal data or information.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">6. Storefront Management</h3>
                                <p class="text-lg mb-4">The Athlete has full control over their storefront and may remove or modify products at any time.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">7. Compensation</h3>
                                <p class="text-lg mb-4">The Athlete will receive compensation as outlined in their individual dashboard.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">8. Termination of Agreement</h3>
                                <p class="text-lg mb-4">This Agreement may be terminated by either party with notice. If the Athlete fails to comply with the terms, Hometown Hero reserves the right to terminate the Agreement and revoke access to the platform.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">9. Indemnification</h3>
                                <p class="text-lg mb-4">The Athlete agrees to indemnify and hold harmless Hometown Hero from any claims or damages arising from their participation in the platform.</p>

                                <h3 class="text-xl font-semibold text-gray-900 mb-4">10. Signature</h3>
                                <p class="text-lg mb-4">By signing below, the Athlete agrees to the terms and conditions of this Agreement, including the service fee and eligibility requirements, and consents to participate in the services provided by Hometown Hero.</p>

                                <form onSubmit={onAgree} id='agree-form'>
                                    <label for="athlete" class="block text-lg mb-2">Athlete's Name:</label>
                                    <input type="text" id="athlete" name="athlete"
                                        class="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="Enter your name " required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <div className="flex items-end">
                                        <div className="">
                                            <label for="athlete-signature" class="block text-lg mb-2">Signature:</label>
                                            <canvas
                                                ref={canvasRef}
                                                height={200}
                                                onMouseDown={(e) => {
                                                    setIsSigned(true);
                                                    startDrawing(e);
                                                }}
                                                onMouseMove={draw}
                                                onMouseUp={stopDrawing}
                                                onMouseOut={stopDrawing}
                                                style={{ border: '1px solid #000' }}
                                            />
                                        </div>
                                        <div className='grow'>
                                            {signatureData && (
                                                <img
                                                    src={signatureData}
                                                    alt="Signature"
                                                    style={{ maxWidth: '100%', border: '1px solid #000' }}
                                                />
                                            )}
                                        </div>

                                    </div>


                                    <br />
                                    <div className="flex gap-4">
                                        <button type='button' onClick={handleClear}>Clear</button>
                                        <button type='button' onClick={saveSignature}>SAVE</button>
                                    </div>




                                    <label for="signature-date" class="block text-lg mb-2">Date:</label>
                                    <input type="date" id="signature-date" name="signature-date"
                                        class="w-full p-2 border border-gray-300 rounded-md mb-4" required
                                        value={date}
                                        onChange={handleDateChange}
                                    />
                                </form>

                            </section>

                        </main>
                    </div>






                    {/* Modal Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                        <button
                            type='submit'
                            form="agree-form"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-flex items-center justify-center"
                        >
                            Agree &nbsp;
                            {mutation?.isPending && (
                                <LoaderCircle className="animate-spin" size={17} />
                            )}

                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AdminModal2;
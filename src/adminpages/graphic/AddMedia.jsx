import { Plus } from 'lucide-react';
import React, { useRef, useState } from 'react'

const AddMedia = () => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className="w-full mx-auto mt-10">
                <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="flex flex-col items-center justify-center h-60 card-gradient2 !border-dashed rounded-xl cursor-pointer hover:border-blue-500 transition"
                >
                    <p className="text-white text-base font-bold mb-4">Drop files to upload</p>
                    <p className="text-base font-bold text-white mb-2">or</p>
                    <button className='bg-[#D4BC6D] text-white font-bold py-2 px-4 rounded-full mt-2.5'>
                        Select from Computer
                    </button>
                    <p className="text-white text-base font-bold mt-2.5">Max file size up to 2gb</p>
                    {file && (
                        <p className="mt-3 text-green-600 font-medium">
                            Selected: {file.name}
                        </p>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <textarea
                rows={6}
                className='w-full mt-6 py-4 px-7 bg-transparent border border-[#D4BC6D] rounded-lg text-white outline-none'
                placeholder='Add message'
            ></textarea>
            <div className="card-gradient2 border-[1.5px] rounded-3xl p-6 mt-6">
                <div className="flex justify-between items-center">
                    <div className="">
                        <p className='text-white font-bold text-base mb-5'>
                            Sent
                        </p>
                        <div className="flex gap-4">
                            <img src="/user-cash.svg" alt="" className='h-[8.75rem] w-[8.75rem] border rounded-xl' />
                            <img src="/user-cash.svg" alt="" className='h-[8.75rem] w-[8.75rem] border rounded-xl' />
                            <img src="/user-cash.svg" alt="" className='h-[8.75rem] w-[8.75rem] border rounded-xl' />
                            <div className="flex items-center justify-center bg-[#57430D] h-[8.75rem] w-[8.75rem] rounded-xl">
                                <Plus color='white' />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className='text-white font-bold text-base mb-5'>
                            Recieved
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center justify-center bg-[#57430D] h-[8.75rem] w-[8.75rem] rounded-xl">
                                <Plus color='white' />
                            </div>
                            <img src="/user-cash.svg" alt="" className='h-[8.75rem] w-[8.75rem] border rounded-xl' />
                            <img src="/user-cash.svg" alt="" className='h-[8.75rem] w-[8.75rem] border rounded-xl' />
                            <img src="/user-cash.svg" alt="" className='h-[8.75rem] w-[8.75rem] border rounded-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMedia
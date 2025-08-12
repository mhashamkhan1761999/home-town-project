import { Activity, Building2, Globe, GraduationCap, User } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { getNames } from 'country-list';


const countries = getNames();

const Signup3 = ({ next, setData, goBack }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setData(prev => ({ ...prev, ...data }))
        console.log('Form Data:', data);
        setTimeout(() => {
            next()
        }, 500)
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[87.5rem] w-full mx-auto px-4 sm:px-6'>
                <h2 className='text-lg sm:text-xl font-bold text-center text-[#D4BC6D] mb-6'>
                    Personal Information
                </h2>

                <div className="space-y-10">
                    {/* Row 1: Age + Gender */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                        {/* Age */}
                        <div className="w-full">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-2 inline-block'>
                                Age
                            </label>
                            <div className="flex rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                                <div className="p-4">
                                    <User size={15} color='white' />
                                </div>
                                <div className="grow">
                                    <input
                                        {...register('age', { required: 'Age is required' })}
                                        type="number"
                                        placeholder='Enter your age'
                                        className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] p-4'
                                    />
                                </div>
                            </div>
                            {errors?.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                        </div>

                        {/* Gender */}
                        <div className="w-full">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-2 inline-block'>
                                Gender
                            </label>
                            <div className="flex rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                                <div className="p-4">
                                    <User size={15} color='white' />
                                </div>
                                <div className="grow pe-2.5">
                                    <select
                                        {...register('gender', { required: 'Gender is required' })}
                                        className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] p-4'
                                    >
                                        <option value="">Select your gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="prefer not to say">Prefer Not to Say</option>
                                    </select>
                                </div>
                            </div>
                            {errors?.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                        </div>
                    </div>

                    {/* Row 2: Country + City */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                        {/* Country */}
                        <div className="w-full">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-2 inline-block'>
                                Country
                            </label>
                            <div className="flex rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                                <div className="p-4">
                                    <Globe size={15} color='white' />
                                </div>
                                <div className="grow pe-2.5">
                                    <select
                                        {...register('country', { required: 'Country is required' })}
                                        className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] p-4'
                                    >
                                        <option value="">Select your country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors?.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>

                        {/* City */}
                        <div className="w-full">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-2 inline-block'>
                                City
                            </label>
                            <div className="flex rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                                <div className="p-4">
                                    <Building2 size={15} color='white' />
                                </div>
                                <div className="grow pe-2.5">
                                    <input
                                        {...register('city', { required: 'City is required' })}
                                        type="text"
                                        placeholder='Enter Your City'
                                        className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] p-4'
                                    />
                                </div>
                            </div>
                            {errors?.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>
                    </div>

                    {/* Row 3: Level of Athlete + Grade Level */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                        {/* Level of Athlete */}
                        <div className="w-full">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-2 inline-block'>
                                Level of Athlete
                            </label>
                            <div className="flex rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                                <div className="p-4">
                                    <Activity size={15} color='white' />
                                </div>
                                <div className="grow pe-2.5">
                                    <select
                                        {...register('level_of_athlete', { required: 'Level of athlete is required' })}
                                        className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] p-4'
                                    >
                                        <option value="">Select your level</option>
                                        <option value="Youth">Youth</option>
                                        <option value="High School">High School</option>
                                        <option value="College">College</option>
                                        <option value="Pro">Pro</option>
                                    </select>
                                </div>
                            </div>
                            {errors?.level_of_athlete && <p className="text-red-500 text-sm mt-1">{errors.level_of_athlete.message}</p>}
                        </div>

                        {/* Grade Level */}
                        <div className="w-full">
                            <label className='text-base sm:text-lg font-semibold text-[#D4BC6D] mb-2 inline-block'>
                                Grade Level
                            </label>
                            <div className="flex rounded-t-lg bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46]">
                                <div className="p-4">
                                    <GraduationCap size={15} color='white' />
                                </div>
                                <div className="grow pe-2.5">
                                    <input
                                        {...register('grand_level', { required: 'Grade Level is required' })}
                                        type="text"
                                        placeholder='Enter Grade Level'
                                        className='h-full w-full bg-transparent border-0 outline-0 text-[#6B6B6B] p-4'
                                    />
                                </div>
                            </div>
                            {errors?.grand_level && <p className="text-red-500 text-sm mt-1">{errors.grand_level.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10">
                    <button
                        type='button'
                        onClick={goBack}
                        className="border-2 border-[#D4BC6D] text-[#D4BC6D] text-base sm:text-lg font-bold py-3 px-6 rounded-full w-full shadow-lg transition-colors"
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className="bg-[#D4BC6D] text-black text-base sm:text-lg font-bold py-3 px-6 rounded-full w-full shadow-lg transition-colors"
                    >
                        Next
                    </button>
                </div>
            </form>

        </>
    )
}

export default Signup3
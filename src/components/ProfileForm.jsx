import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getRequest, postRequest } from '../api';
import { useForm } from 'react-hook-form';
import { queryClient } from '../main';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/slices/authSlice';
import { getNames } from 'country-list';

const countries = getNames();

const ProfileForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Fetch profile data
    const { data: profileData, isLoading } = useQuery({
        queryKey: ['get-profile'],
        queryFn: () => getRequest('/get-profile'),
    });

    // 2. Prefill form with profile data
    useEffect(() => {
        if (profileData) {
            setValue('store_name', profileData.store_name || '');
            setValue('sport', profileData.sport || '');
            setValue('social_media_reach', profileData.social_media_reach || '');
            setValue('bio', profileData.bio || '');
            setValue('description', profileData.description || '');
        }
    }, [profileData]);

    // 3. Mutation
    const mutation = useMutation({
        mutationFn: (formData) => postRequest('/update-store', formData, true),
        onSuccess: (data) => {
            if (data?.statusCode == 200) {
                queryClient.invalidateQueries(['get-profile']);
                setMessage('Profile updated successfully!');
                dispatch(saveUser({ user: data?.response?.data }))
            }
            console.log('profile', data);
        },
        onError: () => {
            setMessage('Something went wrong.');
        },
    });

    // 4. Submit Handler
    const onSubmit = (formValues) => {
        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('store_name', formValues.store_name);
        formData.append('sport', formValues.sport);
        formData.append('social_media_reach', formValues.social_media_reach);
        formData.append('bio', formValues.bio);
        formData.append('description', formValues.description);

        if (formValues.profile_picture?.[0]) {
            formData.append('profile_picture', formValues.profile_picture[0]);
        }
        if (formValues.cover_photo?.[0]) {
            formData.append('cover_photo', formValues.cover_photo[0]);
        }

        mutation.mutate(formData, {
            onSettled: () => setLoading(false),
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-5xl mx-auto border border-[#D4BC6D] rounded-2xl p-8 bg-[#1b1b1b] shadow-sm text-white"
        >
            <h2 className="text-3xl font-bold mb-6">Update Profile</h2>
            <p className="text-sm font-medium mb-8">All changes made to your profile are reflected on your storefront</p>

            {message && (
                <p className={`mb-4 ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                </p>
            )}

            <div className="grid grid-cols-2 gap-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Store Name</label>
                    <input
                        type="text"
                        {...register('store_name')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Sport</label>
                    <input
                        type="text"
                        {...register('sport')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Jersey ##</label>
                    <input
                        type="number"
                        {...register('jersey')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Home Town</label>
                    <input
                        type="text"
                        {...register('jersey')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Personalised Quote</label>
                    <textarea
                        {...register('quote')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Store Description</label>
                    <textarea
                        {...register('description')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Athlete's Name</label>
                    <input
                        type="text"
                        {...register('athlete_name')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <input
                        type="number"
                        {...register('age')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                        {...register('gender')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    >
                        <option value="">Select Gender</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                        <option value="">Prefer to to say</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                        {...register('country')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    >
                        <option value="">Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                        type="text"
                        {...register('city')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Level of Athlete</label>
                    <select
                        {...register('level_of_athlete')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    >
                        <option value="">Select your level</option>
                        <option value="Youth">Youth</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Pro">Pro</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Grade Level</label>
                    <input
                        type="text"
                        {...register('grand_level')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
                    />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium mb-1">Select Social Media</label>
                    <select
                        type="text"
                        {...register('social_media_reach')}
                        className="w-full border border-gray-600 bg-black text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] pe-2"
                    >
                        <option value="">Select Social Media</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Facebook">Facebook</option>
                    </select>
                </div> */}

                <div>
                    <label className="block text-sm font-medium mb-1">Profile Picture</label>
                    <input
                        type="file"
                        {...register('profile_picture')}
                        accept="image/*"
                        className="w-full text-white"
                    />
                </div>

                {profileData?.profile_picture_url && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Current Profile Picture</label>
                        <img
                            src={profileData.profile_picture_url}
                            alt="Profile"
                            className="h-32 w-32 object-cover rounded"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">Cover Photo</label>
                    <input
                        type="file"
                        {...register('cover_photo')}
                        accept="image/*"
                        className="w-full text-white"
                    />
                </div>

                {profileData?.cover_photo_url && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Current Cover Photo</label>
                        <img
                            src={profileData.cover_photo_url}
                            alt="Cover"
                            className="w-full h-40 object-cover rounded"
                        />
                    </div>
                )}



            </div>
            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#D4BC6D] text-black py-3 px-6 rounded font-semibold hover:opacity-90 transition w-full mt-8"
                >
                    {mutation?.isPending ? 'Updating...' : 'Update Profile'}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;

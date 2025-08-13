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

  // Fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getRequest('/get-profile'),
  });

  // Prefill form
  useEffect(() => {
    if (profileData) {
      setValue('store_name', profileData.store_name || '');
      setValue('sport', profileData.sport || '');
      setValue('social_media_reach', profileData.social_media_reach || '');
      setValue('bio', profileData.bio || '');
      setValue('description', profileData.description || '');
    }
  }, [profileData]);

  // Update mutation
  const mutation = useMutation({
    mutationFn: (formData) => postRequest('/update-store', formData, true),
    onSuccess: (data) => {
      if (data?.statusCode == 200) {
        queryClient.invalidateQueries(['get-profile']);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        dispatch(saveUser({ user: data?.response?.data }));
      }
    },
    onError: () => {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    },
  });

  // Submit handler
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
      className="w-full max-w-7xl mx-auto bg-[#1b1b1b] rounded-3xl shadow-lg border border-[#2f2f2f] overflow-hidden"
    >
      {/* Top Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 bg-gray-800 relative">
          <img
            src={profileData?.cover_photo_url || '/default-cover.jpg'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <label className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 text-xs rounded cursor-pointer hover:bg-black/90">
            Change Cover
            <input
              type="file"
              {...register('cover_photo')}
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Picture */}
        <div className="absolute left-8 -bottom-16 flex items-center gap-4">
          <div className="relative">
            <img
              src={profileData?.profile_picture_url || '/default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[#1b1b1b] object-cover"
            />
            <label className="absolute bottom-1 right-1 bg-black/70 text-white px-2 py-1 text-xs rounded cursor-pointer hover:bg-black/90">
              Edit
              <input
                type="file"
                {...register('profile_picture')}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="pt-20 p-10">
        <h2 className="text-3xl font-bold mb-2 text-white">Update Profile</h2>
        <p className="text-sm text-gray-400 mb-6">
          All changes here will reflect instantly on your storefront.
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg font-medium ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                : 'bg-red-500/10 text-red-400 border border-red-500/50'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Store Name
            </label>
            <input
              type="text"
              {...register('store_name')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
            />
          </div>

          {/* Sport */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Sport
            </label>
            <input
              type="text"
              {...register('sport')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
            />
          </div>

          {/* Jersey Number */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Jersey #
            </label>
            <input
              type="number"
              {...register('jersey')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Hometown */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Home Town
            </label>
            <input
              type="text"
              {...register('hometown')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Quote */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Personalised Quote
            </label>
            <textarea
              {...register('quote')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg h-24"
            />
          </div>

          {/* Store Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Store Description
            </label>
            <textarea
              {...register('description')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg h-28"
            />
          </div>

          {/* Athlete's Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Athlete's Name
            </label>
            <input
              type="text"
              {...register('athlete_name')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Age
            </label>
            <input
              type="number"
              {...register('age')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Gender
            </label>
            <select
              {...register('gender')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Country
            </label>
            <select
              {...register('country')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            >
              <option value="">Select Country</option>
              {countries.map((country, i) => (
                <option key={i}>{country}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              City
            </label>
            <input
              type="text"
              {...register('city')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Level of Athlete */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Level of Athlete
            </label>
            <select
              {...register('level_of_athlete')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            >
              <option value="">Select your level</option>
              <option value="Youth">Youth</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="Pro">Pro</option>
            </select>
          </div>

          {/* Grade Level */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Grade Level
            </label>
            <input
              type="text"
              {...register('grade_level')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-[#D4BC6D] to-[#b29d52] text-black py-3 rounded-full font-bold tracking-wide shadow-lg hover:opacity-90 transition-all"
        >
          {mutation?.isPending ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

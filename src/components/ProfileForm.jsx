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
      setValue('athlete_name', profileData.athlete_name || '');
      setValue('age', profileData.age || '');
      setValue('gender', profileData.gender || '');
      setValue('country', profileData.country || '');
      setValue('city', profileData.city || '');
      setValue('level_of_athlete', profileData.level_of_athlete || '');
      setValue('grade_level', profileData.grand_level || profileData.grade_level || '');
      setValue('team_name', profileData.team_name || '');
      setValue('team_email', profileData.team_email || '');
      setValue('director_info', profileData.director_info || '');
      setValue('coach_info', profileData.coach_info || '');
      setValue('school_name', profileData.school_name || '');
      setValue('school_email', profileData.school_email || '');
      setValue('school_phone', profileData.school_phone || '');
      setValue('instagram', profileData.instagram || '');
      setValue('tiktok', profileData.tiktok || '');
      setValue('twitter', profileData.twitter || '');
      setValue('youtube', profileData.youtube || '');
      setValue('twitch', profileData.twitch || '');
      setValue('other', profileData.other || '');
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
    formData.append('athlete_name', formValues.athlete_name);
    formData.append('age', formValues.age);
    formData.append('gender', formValues.gender);
    formData.append('country', formValues.country);
    formData.append('city', formValues.city);
    formData.append('level_of_athlete', formValues.level_of_athlete);
    formData.append('grade_level', formValues.grade_level);
    formData.append('team_name', formValues.team_name);
    formData.append('team_email', formValues.team_email);
    formData.append('director_info', formValues.director_info);
    formData.append('coach_info', formValues.coach_info);
    formData.append('school_name', formValues.school_name);
    formData.append('school_email', formValues.school_email);
    formData.append('school_phone', formValues.school_phone);
    formData.append('instagram', formValues.instagram);
    formData.append('tiktok', formValues.tiktok);
    formData.append('twitter', formValues.twitter);
    formData.append('youtube', formValues.youtube);
    formData.append('twitch', formValues.twitch);
    formData.append('other', formValues.other);

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
            Store Cover Photo
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
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

          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Team Name
            </label>
            <input
              type="text"
              {...register('team_name')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Team Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Team Email
            </label>
            <input
              type="email"
              {...register('team_email')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Director Info */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Director Info
            </label>
            <input
              type="text"
              {...register('director_info')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* Coach Info */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Coach Info
            </label>
            <input
              type="text"
              {...register('coach_info')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* School Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              School Name
            </label>
            <input
              type="text"
              {...register('school_name')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* School Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              School Email
            </label>
            <input
              type="email"
              {...register('school_email')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>

          {/* School Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              School Phone
            </label>
            <input
              type="tel"
              {...register('school_phone')}
              className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg"
            />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-white">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Instagram
              </label>
              <input
                type="url"
                {...register('instagram')}
                placeholder="https://instagram.com/username"
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
              />
            </div>

            {/* TikTok */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                TikTok
              </label>
              <input
                type="url"
                {...register('tiktok')}
                placeholder="https://tiktok.com/@username"
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Twitter
              </label>
              <input
                type="url"
                {...register('twitter')}
                placeholder="https://twitter.com/username"
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                YouTube
              </label>
              <input
                type="url"
                {...register('youtube')}
                placeholder="https://youtube.com/channel/..."
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
              />
            </div>

            {/* Twitch */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Twitch
              </label>
              <input
                type="url"
                {...register('twitch')}
                placeholder="https://twitch.tv/username"
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
              />
            </div>

            {/* Other Social Media */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Other Social Media
              </label>
              <input
                type="url"
                {...register('other')}
                placeholder="https://other-platform.com/username"
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4BC6D]"
              />
            </div>
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

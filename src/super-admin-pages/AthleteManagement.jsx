import React, { useState } from 'react';
import { Search, Eye, User, Users, Trophy, Star, Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRequest, postRequest } from '../api';
import { queryClient } from '../main';
import toast from 'react-hot-toast';

const AthleteManagement = () => {
  const [athletess, setAthletes] = useState([
    {
      id: 1,
      athleteName: 'Michael Jordan',
      phone: '+1 555-0101',
      email: 'michael.jordan@example.com',
      age: 28,
      gender: 'Male',
      country: 'United States',
      city: 'Chicago',
      levelOfAthlete: 'Professional',
      grandLevel: 'Royal',
      storeName: 'MJ Sports Store',
      profilePicture: '/team1.jpeg',
      coverPicture: '/athlete-bg.jpg',
      sport: 'Basketball',
      status: 'Active'
    },
    {
      id: 2,
      athleteName: 'Serena Williams',
      phone: '+1 555-0102',
      email: 'serena.williams@example.com',
      age: 32,
      gender: 'Female',
      country: 'United States',
      city: 'Miami',
      levelOfAthlete: 'Professional',
      grandLevel: 'Diamond',
      storeName: 'Serena Tennis Pro',
      profilePicture: '/team2.jpeg',
      coverPicture: '/athlete-bg.jpg',
      sport: 'Tennis',
      status: 'Active'
    },
    {
      id: 3,
      athleteName: 'Cristiano Ronaldo',
      phone: '+351 555-0103',
      email: 'cristiano.ronaldo@example.com',
      age: 39,
      gender: 'Male',
      country: 'Portugal',
      city: 'Lisbon',
      levelOfAthlete: 'Professional',
      grandLevel: 'Royal',
      storeName: 'CR7 Collection',
      profilePicture: '/team3.jpeg',
      coverPicture: '/athlete-bg.jpg',
      sport: 'Football',
      status: 'Active'
    },
    {
      id: 4,
      athleteName: 'Katie Ledecky',
      phone: '+1 555-0104',
      email: 'katie.ledecky@example.com',
      age: 27,
      gender: 'Female',
      country: 'United States',
      city: 'Washington DC',
      levelOfAthlete: 'Professional',
      grandLevel: 'Gold',
      storeName: 'Ledecky Swimming',
      profilePicture: '/alek.jpeg',
      coverPicture: '/athlete-bg.jpg',
      sport: 'Swimming',
      status: 'Inactive'
    },
    {
      id: 5,
      athleteName: 'LeBron James',
      phone: '+1 555-0105',
      email: 'lebron.james@example.com',
      age: 39,
      gender: 'Male',
      country: 'United States',
      city: 'Los Angeles',
      levelOfAthlete: 'Professional',
      grandLevel: 'Emerald',
      storeName: 'King James Store',
      profilePicture: '/Raza.jpg',
      coverPicture: '/athlete-bg.jpg',
      sport: 'Basketball',
      status: 'Pending'
    },
    {
      id: 6,
      athleteName: 'Naomi Osaka',
      phone: '+81 555-0106',
      email: 'naomi.osaka@example.com',
      age: 26,
      gender: 'Female',
      country: 'Japan',
      city: 'Tokyo',
      levelOfAthlete: 'Professional',
      grandLevel: 'Silver',
      storeName: 'Osaka Tennis Hub',
      profilePicture: '/mark.jpeg',
      coverPicture: '/athlete-bg.jpg',
      sport: 'Tennis',
      status: 'Suspended'
    }
  ]);

  const { data: athletes, isLoading, error } = useQuery({
    queryKey: ['admin-athletes'],
    queryFn: () => getRequest('/admin/get-athletes'),
    onError: (error) => {
      console.log('Backend not available, using fallback data');
    }
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }) => postRequest(`/admin/update-status-athlete/${id}`, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['admin-athletes']);
      toast.success(res?.message)
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      // You could add error handling/toast here
    }
  });

  const furiousMutation = useMutation({
    mutationFn: ({ id, data }) => postRequest(`/admin/update-furious-athlete/${id}`, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['admin-athletes']);
      toast.success(res?.message || 'Furious status updated successfully')
    },
    onError: (error) => {
      console.error('Error updating furious status:', error);
      toast.error('Failed to update furious status');
    }
  });

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const numberToStatus = {
    0: 'pending',
    1: 'standard',
    2: 'pro',
  };
  const statusTypes = ['Pending', 'Standard', 'Pro'];

  // Filter athletes based on status and search term
  const filteredAthletes = athletes?.filter(athlete => {
    const matchesStatus = selectedStatus === 'All' || athlete?.status === selectedStatus.toLowerCase();
    const matchesSearch = searchTerm.trim() === "" || [
      athlete?.athlete_name,
      athlete?.email,
      athlete?.city,
      athlete?.country,
      athlete?.store_name,
      athlete?.level_of_athlete,
      athlete?.sport
    ].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleViewAthlete = (athlete) => {
    setSelectedAthlete(athlete);
    setIsViewModalOpen(true);
  };

  const statusToNumber = {
    pending: 0,
    standard: 1,
    pro: 2,
  };

  const handleStatusChange = (athleteId, newStatus) => {
    // Map status to number for backend
    const statusValue = statusToNumber[newStatus?.toLowerCase()] ?? newStatus?.toLowerCase();
    mutation.mutate({
      id: athleteId,
      data: { status: statusValue }
    });
    setAthletes(athletes.map(athlete =>
      athlete.id === athleteId ? { ...athlete, status: newStatus } : athlete
    ));
  };

  const handleFuriousToggle = (athleteId, currentFuriousStatus) => {
    // Count current furious athletes
    const currentFuriousCount = athletes?.filter(athlete => athlete.furious === "1").length || 0;
    
    // If trying to turn on and already have 5 furious athletes
    if (currentFuriousStatus === "0" && currentFuriousCount >= 5) {
      toast.error('Maximum 5 athletes can be in Furious 5. Please remove another athlete first.');
      return;
    }
    
    // Toggle the furious status
    const newFuriousStatus = currentFuriousStatus === "1" ? 0 : 1;
    
    furiousMutation.mutate({
      id: athleteId,
      data: { furious: newFuriousStatus }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600 text-white';
      case 'standard':
        return 'bg-blue-600 text-white';
      case 'pro':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze':
        return 'text-amber-600';
      case 'Silver':
        return 'text-gray-400';
      case 'Gold':
        return 'text-yellow-400';
      case 'Emerald':
        return 'text-emerald-400';
      case 'Diamond':
        return 'text-cyan-400';
      case 'Royal':
        return 'text-purple-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Athlete Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage athletes, their profiles and performance data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Athletes</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{athletes?.length}</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
            </div>
          </div>

          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Standard</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {athletes?.filter(a => a.status == 'standard')?.length}
                </p>
              </div>
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Pro</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {athletes?.filter(a => a.status == 'pro')?.length}
                </p>
              </div>
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full items-center">
            {/* Filter Athletes by Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D] text-sm min-w-[200px]"
            >
              <option value="All">All Athletes</option>
              {statusTypes.map(status => (
                <option key={status} value={status} className="bg-[#1a1a1a]">
                  {status}
                </option>
              ))}
            </select>
            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search athletes..."
                className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D] text-sm w-full sm:w-[250px]"
              />
              <Search className="h-5 w-5 text-[#D4BC6D]" />
            </div>
          </div>
        </div>

        {/* Athletes Table */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <table className="w-full">
                <thead className="bg-[#1a1a1a] border-b border-[#4B4C46]">
                  <tr>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Athlete
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Social Media
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Furious 5
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Full Profile Info
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4B4C46]">
                  {filteredAthletes?.map((athlete) => (
                    <tr key={athlete.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#D4BC6D]">
                            <img
                              src={
                                athlete?.profile_picture_url
                                  ? athlete.profile_picture_url.startsWith('http')
                                    ? athlete.profile_picture_url.replace(/\\/g, '/')
                                    : `https://hometown.eagleeblaze.com/storage/app/public/${athlete.profile_picture_url}`.replace(/\\/g, '/')
                                  : '/default.jpg'
                              }
                              alt={athlete?.athlete_name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = '/default.jpg';
                              }}
                            />
                          </div>
                          <div className="ml-4 flex items-center gap-2">
                            <div className="text-xs sm:text-sm font-medium text-white">
                              {athlete?.athlete_name}
                            </div>
                            {athlete?.badge_level?.image && (
                              <img
                                src={athlete.badge_level.image}
                                alt={athlete.badge_level.name}
                                className="h-5 w-5 rounded-full border border-[#D4BC6D]"
                                title={athlete.badge_level.name}
                              />
                            )}
                          </div>
                          <div className="text-xs text-gray-400 ml-2">
                            {athlete?.level_of_athlete}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {athlete?.social_media?.instagram && (
                            <a href={athlete.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                              <Instagram className="h-4 w-4" />
                            </a>
                          )}
                          {athlete?.social_media?.twitter && (
                            <a href={athlete.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                          {athlete?.social_media?.facebook && (
                            <a href={athlete.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Facebook className="h-4 w-4" />
                            </a>
                          )}
                          {(!athlete?.social_media?.instagram && !athlete?.social_media?.twitter && !athlete?.social_media?.facebook) && (
                            <span className="text-xs text-gray-500">No social media</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <select
                          value={numberToStatus[athlete?.status] || athlete?.status}
                          onChange={(e) => handleStatusChange(athlete?.id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] ${getStatusColor(numberToStatus[athlete.status] || athlete.status)}`}
                        >
                          {statusTypes.map(status => (
                            <option key={status} value={status.toLowerCase()} className="bg-[#1a1a1a] text-white">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleFuriousToggle(athlete?.id, athlete?.furious)}
                            disabled={furiousMutation.isLoading}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                              athlete?.furious === "1" 
                                ? 'bg-[#D4BC6D]' 
                                : 'bg-gray-600'
                            } ${furiousMutation.isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            title={athlete?.furious === "1" ? "Remove from Furious 5" : "Add to Furious 5"}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                athlete?.furious === "1" ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          {athlete?.furious === "1" && (
                            <Star className="h-4 w-4 text-[#D4BC6D] ml-2" fill="currentColor" />
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewAthlete(athlete)}
                          className="p-2 text-gray-400 hover:text-[#D4BC6D] transition-colors"
                          title="Full Profile Info"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredAthletes?.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No athletes found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* View Athlete Modal */}
      {isViewModalOpen && selectedAthlete && (
        <ViewAthleteModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          athlete={selectedAthlete}
        />
      )}
    </div>
  );
};

// View Athlete Modal
const ViewAthleteModal = ({ isOpen, onClose, athlete }) => {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600 text-white';
      case 'standard':
        return 'bg-blue-600 text-white';
      case 'pro':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze':
        return 'text-amber-600';
      case 'Silver':
        return 'text-gray-400';
      case 'Gold':
        return 'text-yellow-400';
      case 'Emerald':
        return 'text-emerald-400';
      case 'Diamond':
        return 'text-cyan-400';
      case 'Royal':
        return 'text-purple-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-4 sm:p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Athlete Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cover Picture */}
        <div className="relative h-32 sm:h-48 rounded-lg overflow-hidden mb-6">
          <img
            src={athlete?.cover_photo}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/default.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 flex items-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-4 border-[#D4BC6D]">
              <img
                src={
                  athlete?.profile_picture
                    ? athlete.profile_picture.startsWith('http')
                      ? athlete.profile_picture.replace(/\\/g, '/')
                      : `https://hometown.eagleeblaze.com/storage/app/public/${athlete.profile_picture}`.replace(/\\/g, '/')
                    : '/default.jpg'
                }
                alt={athlete?.athlete_name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = '/default.jpg';
                }}
              />
            </div>
            <div className="ml-4 text-white">
              <h3 className="text-lg sm:text-xl font-bold">{athlete?.athlete_name}</h3>
              <p className="text-sm opacity-90">{athlete?.sport}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <p className="text-white font-medium">{athlete?.athlete_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Social Media</label>
                <div className="flex items-center space-x-4">
                  {athlete?.social_media?.instagram && (
                    <a href={athlete.social_media.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-pink-500 transition-colors">
                      <Instagram className="h-4 w-4 mr-1" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  )}
                  {athlete?.social_media?.twitter && (
                    <a href={athlete.social_media.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                      <Twitter className="h-4 w-4 mr-1" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                  {athlete?.social_media?.facebook && (
                    <a href={athlete.social_media.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-600 transition-colors">
                      <Facebook className="h-4 w-4 mr-1" />
                      <span className="text-sm">Facebook</span>
                    </a>
                  )}
                  {(!athlete?.social_media?.instagram && !athlete?.social_media?.twitter && !athlete?.social_media?.facebook) && (
                    <span className="text-sm text-gray-500">No social media accounts</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Contact Phone</label>
                <p className="text-white">{athlete?.phone || 'Not provided'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <p className="text-white">{athlete?.email || 'Not provided'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                  <p className="text-white">{athlete?.age} years</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                  <p className="text-white">{athlete?.gender}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <p className="text-white">{athlete?.city}, {athlete?.country}</p>
              </div>
            </div>
          </div>

          {/* Athletic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Athletic Information</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Sport</label>
                <p className="text-[#D4BC6D] font-medium">{athlete?.sport}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Level of Athlete</label>
                <p className="text-white">{athlete?.level_of_athlete}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Grand Level</label>
                <p className={`font-bold ${getLevelColor(athlete?.grand_level)}`}>
                  {athlete.grandLevel}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Store Name</label>
                <p className="text-white">{athlete?.store_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(athlete?.status)}`}>
                  {athlete?.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center">
            <Trophy className={`h-8 w-8 mr-3 ${getLevelColor(athlete?.grand_level)}`} />
            <div className="text-center">
              <p className="text-gray-400 text-sm">Achievement Level</p>
              <p className={`text-lg font-bold ${getLevelColor(athlete?.grand_level)}`}>
                {athlete?.grand_level}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteManagement;

const numberToStatus = {
  0: 'pending',
  1: 'standard',
  2: 'pro',
};

// When fetching athletes, map numeric status to string
const mapAthleteStatus = athlete => ({
  ...athlete,
  status: typeof athlete.status === 'number' ? numberToStatus[athlete.status] || athlete.status : athlete.status
});


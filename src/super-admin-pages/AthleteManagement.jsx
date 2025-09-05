import React, { useState } from 'react';
import { Search, Eye, User, Users, Trophy, Star, Instagram, Twitter, Facebook, ExternalLink, CreditCard } from 'lucide-react';
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
    let matchesStatus = false;
    
    if (selectedStatus === 'All') {
      matchesStatus = true;
    } else if (selectedStatus === 'No Card') {
      matchesStatus = !athlete?.card;
    } else {
      matchesStatus = athlete?.status === selectedStatus.toLowerCase();
    }
    
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

          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">No Card</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {athletes?.filter(a => !a.card)?.length}
                </p>
              </div>
              <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
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

        {/* Athletes Table - Desktop */}
        <div className="hidden lg:block bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
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
                      Card Status
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
                        <div className="flex items-center">
                          {athlete?.card ? (
                            <div className="flex items-center text-green-500">
                              <CreditCard className="h-4 w-4 mr-2" />
                              <span className="text-xs font-medium">Card Added</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <CreditCard className="h-4 w-4 mr-2" />
                              <span className="text-xs font-medium">No Card</span>
                            </div>
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

        {/* Athletes Cards - Mobile */}
        <div className="lg:hidden space-y-3 p-3">
          {filteredAthletes?.map((athlete) => (
            <div key={athlete.id} className="bg-[#282828] border border-[#4B4C46] rounded-lg p-4">
              {/* Athlete Info Row */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#D4BC6D]">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">
                      {athlete?.athlete_name}
                    </p>
                    {athlete?.badge_level?.image && (
                      <img
                        src={athlete.badge_level.image}
                        alt={athlete.badge_level.name}
                        className="h-5 w-5 rounded-full border border-[#D4BC6D]"
                        title={athlete.badge_level.name}
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{athlete?.level_of_athlete}</p>
                  <p className="text-xs text-gray-400">{athlete?.sport}</p>
                </div>
                <button
                  onClick={() => handleViewAthlete(athlete)}
                  className="p-2 text-gray-400 hover:text-[#D4BC6D] transition-colors"
                  title="Full Profile Info"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Card Status */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Card Status</p>
                  <div className="flex items-center">
                    {athlete?.card ? (
                      <div className="flex items-center text-green-500">
                        <CreditCard className="h-3 w-3 mr-1" />
                        <span className="text-xs font-medium">Card Added</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <CreditCard className="h-3 w-3 mr-1" />
                        <span className="text-xs font-medium">No Card</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Status</p>
                  <select
                    value={numberToStatus[athlete?.status] || athlete?.status}
                    onChange={(e) => handleStatusChange(athlete?.id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] w-full ${getStatusColor(numberToStatus[athlete.status] || athlete.status)}`}
                  >
                    {statusTypes.map(status => (
                      <option key={status} value={status.toLowerCase()} className="bg-[#1a1a1a] text-white">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Social Media & Furious Row */}
              <div className="flex items-center justify-between">
                {/* Social Media */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Social Media</p>
                  <div className="flex items-center space-x-2">
                    {athlete?.social_media?.instagram && (
                      <a href={athlete.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                        <Instagram className="h-3 w-3" />
                      </a>
                    )}
                    {athlete?.social_media?.twitter && (
                      <a href={athlete.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Twitter className="h-3 w-3" />
                      </a>
                    )}
                    {athlete?.social_media?.facebook && (
                      <a href={athlete.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Facebook className="h-3 w-3" />
                      </a>
                    )}
                    {(!athlete?.social_media?.instagram && !athlete?.social_media?.twitter && !athlete?.social_media?.facebook) && (
                      <span className="text-xs text-gray-500">No social media</span>
                    )}
                  </div>
                </div>

                {/* Furious 5 */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Furious 5</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleFuriousToggle(athlete?.id, athlete?.furious)}
                      disabled={furiousMutation.isLoading}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4BC6D] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                        athlete?.furious === "1" 
                          ? 'bg-[#D4BC6D]' 
                          : 'bg-gray-600'
                      } ${furiousMutation.isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      title={athlete?.furious === "1" ? "Remove from Furious 5" : "Add to Furious 5"}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          athlete?.furious === "1" ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    {athlete?.furious === "1" && (
                      <Star className="h-3 w-3 text-[#D4BC6D] ml-2" fill="currentColor" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-4 lg:p-6 w-full max-w-4xl mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#D4BC6D]">Athlete Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cover Picture */}
        <div className="relative h-24 sm:h-32 lg:h-48 rounded-lg overflow-hidden mb-4 sm:mb-6">
          <img
            src={athlete?.cover_photo}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/default.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-center">
            <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full overflow-hidden border-2 sm:border-4 border-[#D4BC6D]">
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
            <div className="ml-2 sm:ml-4 text-white">
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold">{athlete?.athlete_name}</h3>
              <p className="text-xs sm:text-sm opacity-90">{athlete?.sport}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <p className="text-white font-medium">{athlete?.athlete_name}</p>
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

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Referral Code</label>
                <p className="text-white">{athlete?.referral_code || 'Not assigned'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Account Creation</label>
                <p className="text-white">{athlete?.created_at ? new Date(athlete.created_at).toLocaleDateString() : 'Not available'}</p>
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
                  {athlete?.grand_level}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Store Name</label>
                <p className="text-white">{athlete?.store_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Total Sales</label>
                <p className="text-white">${athlete?.total_sale || '0'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(athlete?.status)}`}>
                  {athlete?.status === '1' ? 'Active' : athlete?.status === '0' ? 'Inactive' : athlete?.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Subscription Status</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${athlete?.has_active_subscription ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {athlete?.has_active_subscription ? 'Active Subscription' : 'No Active Subscription'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge Level Section */}
        {athlete?.badge_level && (
          <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Badge Level</h3>
            <div className="flex items-center justify-center">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <img
                  src={athlete.badge_level.image}
                  alt={athlete.badge_level.name}
                  className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                  onError={(e) => {
                    e.target.src = '/default.jpg';
                  }}
                />
                <div className="text-center sm:text-left">
                  <p className={`text-lg sm:text-xl font-bold ${getLevelColor(athlete.badge_level.name)}`}>
                    {athlete.badge_level.name}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">Badge Progress: {athlete.badge_level.percentage}%</p>
                  <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2 mt-2 mx-auto sm:mx-0">
                    <div 
                      className="bg-[#D4BC6D] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${athlete.badge_level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Information */}
        {(athlete?.team_name || athlete?.team_email || athlete?.team_email_2) && (
          <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Team Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {athlete?.team_name && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Team Name</label>
                  <p className="text-white">{athlete.team_name}</p>
                </div>
              )}
              {athlete?.team_email && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Team Email</label>
                  <p className="text-white">{athlete.team_email}</p>
                </div>
              )}
              {athlete?.team_email_2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Team Email 2</label>
                  <p className="text-white">{athlete.team_email_2}</p>
                </div>
              )}
              {athlete?.director_info && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Director Info</label>
                  <p className="text-white">{athlete.director_info}</p>
                </div>
              )}
              {athlete?.coach_info && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Coach Info</label>
                  <p className="text-white">{athlete.coach_info}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* School Information */}
        {(athlete?.school_name || athlete?.school_email || athlete?.school_phone) && (
          <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">School Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {athlete?.school_name && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">School Name</label>
                  <p className="text-white">{athlete.school_name}</p>
                </div>
              )}
              {athlete?.school_email && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">School Email</label>
                  <p className="text-white">{athlete.school_email}</p>
                </div>
              )}
              {athlete?.school_phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">School Phone</label>
                  <p className="text-white">{athlete.school_phone}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Social Media Information */}
        <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Social Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {athlete?.instagram && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Instagram</label>
                <a href={athlete.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center text-pink-500 hover:text-pink-400 transition-colors">
                  <Instagram className="h-4 w-4 mr-2" />
                  <span className="text-sm truncate">Instagram Profile</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {athlete?.twitter && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Twitter</label>
                <a href={athlete.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Twitter className="h-4 w-4 mr-2" />
                  <span className="text-sm truncate">Twitter Profile</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {athlete?.youtube && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">YouTube</label>
                <a href={athlete.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center text-red-500 hover:text-red-400 transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-sm truncate">YouTube Channel</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {athlete?.tiktok && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">TikTok</label>
                <a href={athlete.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-300 transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <span className="text-sm truncate">TikTok Profile</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {athlete?.twitch && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Twitch</label>
                <a href={athlete.twitch} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-500 hover:text-purple-400 transition-colors">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  <span className="text-sm truncate">Twitch Channel</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {athlete?.other && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Other</label>
                <a href={athlete.other} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-gray-300 transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span className="text-sm truncate">Other Link</span>
                </a>
              </div>
            )}
            {(!athlete?.instagram && !athlete?.twitter && !athlete?.youtube && !athlete?.tiktok && !athlete?.twitch && !athlete?.other) && (
              <div className="col-span-full">
                <span className="text-sm text-gray-500">No social media accounts linked</span>
              </div>
            )}
          </div>
          {athlete?.social_media_reach && (
            <div className="mt-3 sm:mt-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Social Media Reach</label>
              <p className="text-white text-sm sm:text-base">{athlete.social_media_reach}</p>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Additional Information</h3>
          <div className="space-y-3 sm:space-y-4">
            {athlete?.bio && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <p className="text-white">{athlete.bio}</p>
              </div>
            )}
            {athlete?.description && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <p className="text-white">{athlete.description}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Furious Status</label>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${athlete?.furious === '1' ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'}`}>
                {athlete?.furious === '1' ? 'Furious' : 'Normal'}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Card Status</label>
              <div className="flex items-center">
                {athlete?.card ? (
                  <div className="flex items-center text-green-500">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Card Added</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">No Card Added</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Last Updated</label>
              <p className="text-white">{athlete?.updated_at ? new Date(athlete.updated_at).toLocaleString() : 'Not available'}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors text-sm sm:text-base"
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


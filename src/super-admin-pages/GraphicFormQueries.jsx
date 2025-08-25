import React, { useState } from 'react';
import { Search, Filter, Eye, Package, Clock, CheckCircle, X, Download } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../api';

const GraphicFormQueries = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState(null);

    // API call to get concept queries
    const { data: conceptQueries = [], isLoading, error } = useQuery({
        queryKey: ['concept-queries'],
        queryFn: () => getRequest('/admin/get-concept'),
        onSuccess: (data) => {
            console.log('Concept queries API response:', data);
        },
        onError: (error) => {
            console.error('Error fetching concept queries:', error);
        }
    });

    // Console log the response for debugging
    React.useEffect(() => {
        if (conceptQueries) {
            console.log('Concept queries data structure:', conceptQueries);
            console.log('Individual query sample:', conceptQueries[0]);
        }
    }, [conceptQueries]);

    const statusTypes = ['All']; // Since there's no status field in the data, we'll just use All for now

    // Filter concept queries - handle loading state
    const filteredQueries = React.useMemo(() => {
        if (!conceptQueries || !Array.isArray(conceptQueries)) {
            return [];
        }

        return conceptQueries.filter(query => {
            // Search logic based on actual data structure
            const athleteName = query.athlete?.athlete_name || query.athlete?.store_name || query.athlete?.email || '';
            const searchFields = [
                athleteName,
                query.description,
                query.content,
                query.athlete?.bio,
                query.athlete?.description
            ].filter(Boolean).join(' ').toLowerCase();

            const matchesSearch = searchFields.includes(searchTerm.toLowerCase());

            // For now, we'll use 'All' since there's no status field in the data
            const matchesStatus = selectedStatus === 'All';

            return matchesSearch && matchesStatus;
        });
    }, [conceptQueries, searchTerm, selectedStatus]);

    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-600 text-white';

        const normalizedStatus = status.toLowerCase();
        switch (normalizedStatus) {
            case 'pending':
                return 'bg-yellow-600 text-white';
            case 'in progress':
                return 'bg-blue-600 text-white';
            case 'completed':
                return 'bg-green-600 text-white';
            case 'cancelled':
                return 'bg-red-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    // Stats calculations - based on actual data structure
    const totalQueries = conceptQueries.length;
    const pendingQueries = 0; // No status field, so we can't determine pending
    const completedQueries = 0; // No status field, so we can't determine completed  
    const inProgressQueries = 0; // No status field, so we can't determine in progress

    const handleViewDetails = (query) => {
        setSelectedQuery(query);
        setIsViewModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-2 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#D4BC6D] mb-2">Graphic Form Queries</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Manage and review graphic concept requests</p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4BC6D] mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading graphic form queries...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 mb-6">
                        <p className="text-red-400">Error loading graphic form queries: {error.message}</p>
                    </div>
                )}

                {/* Main Content - Only show when not loading */}
                {!isLoading && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Total Queries</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{totalQueries}</p>
                                    </div>
                                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4BC6D]" />
                                </div>
                            </div>

                            {/* <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">With Pictures</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">
                                            {conceptQueries.filter(q => q.picture || q.graphic_picture).length}
                                        </p>
                                    </div>
                                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                                </div>
                            </div> */}

                            {/* <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">With Logo</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">
                                            {conceptQueries.filter(q => q.logo).length}
                                        </p>
                                    </div>
                                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                                </div>
                            </div> */}

                            <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Recent Requests</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">
                                            {conceptQueries.filter(q => {
                                                const created = new Date(q.created_at);
                                                const today = new Date();
                                                const diffTime = Math.abs(today - created);
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                return diffDays <= 7;
                                            }).length}
                                        </p>
                                    </div>
                                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-3 sm:p-6 mb-6">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                                    {/* Search */}
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <input
                                            type="text"
                                            placeholder="Search by athlete name, store name, description..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4BC6D] text-sm"
                                        />
                                    </div>

                                    {/* Filter by Status - Hidden since no status in data */}
                                    {statusTypes.length > 1 && (
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D] text-sm min-w-[150px]"
                                        >
                                            {statusTypes.map(status => (
                                                <option key={status} value={status} className="bg-[#1a1a1a]">
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Graphic Form Queries Table */}
                        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
                            {/* Mobile View - Cards */}
                            <div className="md:hidden">
                                {filteredQueries.length === 0 ? (
                                    <div className="p-6 text-center text-gray-400">
                                        {isLoading ? 'Loading...' : 'No graphic form queries found'}
                                    </div>
                                ) : (
                                    <div className="divide-y divide-[#4B4C46]">
                                        {filteredQueries.map((query, index) => (
                                            <div key={query.id || index} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center">
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover mr-3"
                                                            src={query.athlete?.profile_picture_url || '/default.jpg'}
                                                            alt={query.athlete?.athlete_name || query.athlete?.store_name || 'Athlete'}
                                                            onError={(e) => {
                                                                e.target.src = '/default.jpg';
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium text-white">
                                                                {query.athlete?.athlete_name || query.athlete?.store_name || query.athlete?.email || 'Unknown Athlete'}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                ID: #{query.id || index + 1}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-400">
                                                            {query.created_at ? new Date(query.created_at).toLocaleDateString() : 'N/A'}
                                                        </p>
                                                        {query.created_at && (
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(query.created_at).toLocaleTimeString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="mb-3">
                                                    {query.description && (
                                                        <div className="mb-2">
                                                            <p className="text-xs text-gray-400 uppercase mb-1">Description:</p>
                                                            <p className="text-sm text-white">
                                                                {query.description.length > 80
                                                                    ? `${query.description.substring(0, 80)}...`
                                                                    : query.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {query.content && (
                                                        <div className="mb-2">
                                                            <p className="text-xs text-gray-400 uppercase mb-1">Content:</p>
                                                            <p className="text-sm text-[#D4BC6D]">
                                                                {query.content}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Attachments */}
                                                <div className="mb-3">
                                                    <p className="text-xs text-gray-400 uppercase mb-2">Attachments:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {query.picture && (
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                                                    <Package className="h-3 w-3 text-white" />
                                                                </div>
                                                                <span className="text-xs text-blue-400">Picture</span>
                                                            </div>
                                                        )}
                                                        {query.graphic_picture && (
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                                                                    <Package className="h-3 w-3 text-white" />
                                                                </div>
                                                                <span className="text-xs text-green-400">Graphic</span>
                                                            </div>
                                                        )}
                                                        {query.logo && (
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center">
                                                                    <Package className="h-3 w-3 text-white" />
                                                                </div>
                                                                <span className="text-xs text-yellow-400">Logo</span>
                                                            </div>
                                                        )}
                                                        {query.image && (
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                                                                    <Package className="h-3 w-3 text-white" />
                                                                </div>
                                                                <span className="text-xs text-purple-400">Image</span>
                                                            </div>
                                                        )}
                                                        {!query.picture && !query.graphic_picture && !query.logo && !query.image && (
                                                            <span className="text-xs text-gray-500">No attachments</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action */}
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleViewDetails(query)}
                                                        className="bg-[#D4BC6D] hover:bg-[#ab965d] text-black px-3 py-1.5 rounded text-sm flex items-center transition-colors"
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Desktop View - Table */}
                            <div className="hidden md:block">
                                <div className="overflow-x-auto">
                                    <div className="min-w-[900px]">
                                        <table className="w-full">
                                            <thead className="bg-[#1a1a1a] border-b border-[#4B4C46]">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                        Athlete Details
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                        Description & Content
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                        Graphics/Pictures
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                        Created Date
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#4B4C46]">
                                                {filteredQueries.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                                            {isLoading ? 'Loading...' : 'No graphic form queries found'}
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    filteredQueries.map((query, index) => (
                                                        <tr key={query.id || index} className="hover:bg-[#1a1a1a] transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm font-medium text-white">
                                                                    #{query.id || index + 1}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    <img
                                                                        className="h-10 w-10 rounded-full object-cover mr-3"
                                                                        src={query.athlete?.profile_picture_url || '/default.jpg'}
                                                                        alt={query.athlete?.athlete_name || query.athlete?.store_name || 'Athlete'}
                                                                        onError={(e) => {
                                                                            e.target.src = '/default.jpg';
                                                                        }}
                                                                    />
                                                                    <div>
                                                                        <p className="text-sm font-medium text-white">
                                                                            {query.athlete?.athlete_name || query.athlete?.store_name || query.athlete?.email || 'Unknown Athlete'}
                                                                        </p>
                                                                        {query.athlete?.email && (
                                                                            <p className="text-xs text-gray-400">
                                                                                {query.athlete.email}
                                                                            </p>
                                                                        )}
                                                                        {query.athlete?.sport && (
                                                                            <p className="text-xs text-[#D4BC6D]">
                                                                                Sport: {query.athlete.sport}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="max-w-xs">
                                                                    {query.description && (
                                                                        <div className="mb-2">
                                                                            <p className="text-xs text-gray-400 uppercase">Description:</p>
                                                                            <p className="text-sm text-white">
                                                                                {query.description.length > 50
                                                                                    ? `${query.description.substring(0, 50)}...`
                                                                                    : query.description}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    {query.content && (
                                                                        <div className="mb-2">
                                                                            <p className="text-xs text-gray-400 uppercase">Content:</p>
                                                                            <p className="text-sm text-[#D4BC6D]">
                                                                                {query.content}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    {query.athlete?.bio && (
                                                                        <div>
                                                                            <p className="text-xs text-gray-400 uppercase">Athlete Bio:</p>
                                                                            <p className="text-xs text-gray-300">
                                                                                {query.athlete.bio.length > 30
                                                                                    ? `${query.athlete.bio.substring(0, 30)}...`
                                                                                    : query.athlete.bio}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex flex-col gap-2">
                                                                    {query.picture && (
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                                                                <Package className="h-4 w-4 text-white" />
                                                                            </div>
                                                                            <span className="text-xs text-blue-400">Picture</span>
                                                                        </div>
                                                                    )}
                                                                    {query.graphic_picture && (
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                                                                <Package className="h-4 w-4 text-white" />
                                                                            </div>
                                                                            <span className="text-xs text-green-400">Graphic</span>
                                                                        </div>
                                                                    )}
                                                                    {query.logo && (
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                                                                                <Package className="h-4 w-4 text-white" />
                                                                            </div>
                                                                            <span className="text-xs text-yellow-400">Logo</span>
                                                                        </div>
                                                                    )}
                                                                    {query.image && (
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                                                <Package className="h-4 w-4 text-white" />
                                                                            </div>
                                                                            <span className="text-xs text-purple-400">Image</span>
                                                                        </div>
                                                                    )}
                                                                    {!query.picture && !query.graphic_picture && !query.logo && !query.image && (
                                                                        <span className="text-xs text-gray-500">No attachments</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm text-gray-400">
                                                                    {query.created_at ? new Date(query.created_at).toLocaleDateString() : 'N/A'}
                                                                </div>
                                                                {query.created_at && (
                                                                    <div className="text-xs text-gray-500">
                                                                        {new Date(query.created_at).toLocaleTimeString()}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => handleViewDetails(query)}
                                                                    className="text-[#D4BC6D] hover:text-[#ab965d] text-sm flex items-center transition-colors"
                                                                >
                                                                    <Eye className="h-4 w-4 mr-1" />
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* View Details Modal */}
                {isViewModalOpen && selectedQuery && (
                    <ViewDetailsModal
                        isOpen={isViewModalOpen}
                        onClose={() => {
                            setIsViewModalOpen(false);
                            setSelectedQuery(null);
                        }}
                        query={selectedQuery}
                    />
                )}
            </div>
        </div>
    );
};

// View Details Modal Component
const ViewDetailsModal = ({ isOpen, onClose, query }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!isOpen) return null;

    const images = [
        { url: query.picture, type: 'Picture', color: 'blue' },
        { url: query.graphic_picture, type: 'Graphic', color: 'green' },
        { url: query.logo, type: 'Logo', color: 'yellow' },
        { url: query.image, type: 'Image', color: 'purple' }
    ].filter(img => img.url);

    const downloadImage = (url, filename) => {
        const link = document.createElement('a');
        link.href = `https://hometown.eagleeblaze.com/storage/app/${url}`;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#282828] card-gradient border-[1.5px] rounded-3xl p-4 sm:p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#D4BC6D]">Graphic Query Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Athlete & Query Info */}
                    <div className="space-y-6">
                        {/* Athlete Info */}
                        <div className="bg-[#1a1a1a] rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">Athlete Information</h3>
                            <div className="flex items-center mb-4">
                                <img
                                    className="h-16 w-16 rounded-full object-cover mr-4"
                                    src={query.athlete?.profile_picture_url || '/default.jpg'}
                                    alt="Athlete"
                                    onError={(e) => {
                                        e.target.src = '/default.jpg';
                                    }}
                                />
                                <div>
                                    <p className="text-white font-semibold text-lg">
                                        {query.athlete?.athlete_name || query.athlete?.store_name || 'Unknown Athlete'}
                                    </p>
                                    <p className="text-gray-400 text-sm">{query.athlete?.email}</p>
                                    {query.athlete?.sport && (
                                        <p className="text-[#D4BC6D] text-sm">Sport: {query.athlete.sport}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400">Level:</p>
                                    <p className="text-white">{query.athlete?.level_of_athlete || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Team:</p>
                                    <p className="text-white">{query.athlete?.team_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">School:</p>
                                    <p className="text-white">{query.athlete?.school_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Location:</p>
                                    <p className="text-white">{query.athlete?.city}, {query.athlete?.country}</p>
                                </div>
                            </div>

                            {query.athlete?.bio && (
                                <div className="mt-4">
                                    <p className="text-gray-400 text-sm">Bio:</p>
                                    <p className="text-white text-sm">{query.athlete.bio}</p>
                                </div>
                            )}
                        </div>

                        {/* Query Details */}
                        <div className="bg-[#1a1a1a] rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">Query Details</h3>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-400 text-sm">Query ID:</p>
                                    <p className="text-white">#{query.id}</p>
                                </div>

                                {query.content && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Content Type:</p>
                                        <p className="text-[#D4BC6D] font-medium">{query.content}</p>
                                    </div>
                                )}

                                {query.description && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Description:</p>
                                        <p className="text-white">{query.description}</p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-gray-400 text-sm">Submitted:</p>
                                    <p className="text-white">
                                        {new Date(query.created_at).toLocaleDateString()} at {new Date(query.created_at).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div className="space-y-6">
                        <div className="bg-[#1a1a1a] rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-[#D4BC6D] mb-4">Submitted Images</h3>

                            {images.length > 0 ? (
                                <div className="space-y-4">
                                    {images.map((img, index) => (
                                        <div key={index} className="border border-gray-600 rounded-lg p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`text-${img.color}-400 font-medium`}>{img.type}</span>
                                                <button
                                                    onClick={() => downloadImage(img.url, `${img.type}_${query.id}`)}
                                                    className="text-[#D4BC6D] hover:text-[#ab965d] transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <img
                                                src={`https://hometown.eagleeblaze.com/storage/app/${img.url}`}
                                                alt={img.type}
                                                className="w-full max-h-48 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => setSelectedImage(`https://hometown.eagleeblaze.com/storage/app/${img.url}`)}
                                                onError={(e) => {
                                                    e.target.src = '/default.jpg';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-400">No images submitted</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Full Size Image Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10000] p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraphicFormQueries;

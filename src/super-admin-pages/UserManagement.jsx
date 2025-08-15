import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, User, Mail, Shield, EyeOff } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '********',
      roleType: 'Admin'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: '********',
      roleType: 'User'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      password: '********',
      roleType: 'SuperAdmin'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@example.com',
      password: '********',
      roleType: 'SuperAdmin'
    },
    {
      id: 5,
      firstName: 'Alex',
      lastName: 'Brown',
      email: 'alex.brown@example.com',
      password: '********',
      roleType: 'Admin'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const roleTypes = ['Admin', 'SuperAdmin', 'User'];
  const filterOptions = ['All', ...roleTypes];

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || user.roleType === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-blue-600 text-white';
      case 'SuperAdmin':
        return 'bg-green-600 text-white';
      case 'User':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#D4BC6D] mb-2">User Management</h1>
          <p className="text-gray-400">Manage system users and their permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <User className="h-8 w-8 text-[#D4BC6D]" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Admins</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.roleType === 'Admin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">SuperAdmins</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.roleType === 'SuperAdmin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Regular Users</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.roleType === 'User').length}
                </p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4BC6D]"
                />
              </div>

              {/* Role Filter */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
              >
                {filterOptions.map(role => (
                  <option key={role} value={role} className="bg-[#1a1a1a]">
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Add User Button */}
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#282828] border border-[#4B4C46] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-[#4B4C46]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4B4C46]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#D4BC6D] flex items-center justify-center">
                          <User className="h-5 w-5 text-black" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.roleType)}`}>
                        {user.roleType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-gray-400 hover:text-[#D4BC6D] transition-colors"
                          title="View User"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit User"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          users={users}
          setUsers={setUsers}
        />
      )}

      {isEditModalOpen && selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          users={users}
          setUsers={setUsers}
        />
      )}

      {isViewModalOpen && selectedUser && (
        <ViewUserModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          user={selectedUser}
        />
      )}

      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={selectedUser}
          users={users}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

// Add User Modal
const AddUserModal = ({ isOpen, onClose, users, setUsers }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleType: 'User'
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...formData
    };
    setUsers([...users, newUser]);
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleType: 'User'
    });
    setShowPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-[#D4BC6D] mb-4">Add New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Last Name
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 pr-10 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D4BC6D] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Role Type
            </label>
            <select
              value={formData.roleType}
              onChange={(e) => setFormData({...formData, roleType: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#4B4C46] text-gray-300 rounded-lg hover:bg-[#1a1a1a] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit User Modal
const EditUserModal = ({ isOpen, onClose, user, users, setUsers }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: user?.password || '',
    roleType: user?.roleType || 'User'
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...formData } : u
    );
    setUsers(updatedUsers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-[#D4BC6D] mb-4">Edit User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Last Name
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email (readonly)
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 pr-10 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D4BC6D] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Role Type
            </label>
            <select
              value={formData.roleType}
              onChange={(e) => setFormData({...formData, roleType: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white focus:outline-none focus:border-[#D4BC6D]"
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#4B4C46] text-gray-300 rounded-lg hover:bg-[#1a1a1a] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View User Modal
const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-[#D4BC6D] mb-4">User Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-[#D4BC6D] flex items-center justify-center">
              <User className="h-10 w-10 text-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              First Name
            </label>
            <div className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white">
              {user.firstName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Last Name
            </label>
            <div className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white">
              {user.lastName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <div className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white">
              {user.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Role Type
            </label>
            <div className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4B4C46] rounded-lg text-white">
              {user.roleType}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#D4BC6D] text-black rounded-lg hover:bg-[#E6C977] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete User Modal
const DeleteUserModal = ({ isOpen, onClose, user, users, setUsers }) => {
  const handleDelete = () => {
    const updatedUsers = users.filter(u => u.id !== user.id);
    setUsers(updatedUsers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] border border-[#4B4C46] rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-red-400 mb-4">Delete User</h2>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Are you sure you want to delete this user?
          </p>
          <div className="bg-[#1a1a1a] border border-[#4B4C46] rounded-lg p-4">
            <p className="text-white font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <p className="text-gray-400 text-sm">Role: {user.roleType}</p>
          </div>
          <p className="text-red-400 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#4B4C46] text-gray-300 rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

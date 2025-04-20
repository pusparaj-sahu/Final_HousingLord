import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaMoneyBillWave, FaListUl, FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-20">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-[#1e293b] p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.firstName || 'User'}! 👋</h1>
          <p className="text-gray-400">
            Manage your properties and track your activities all in one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1e293b] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <FaHome className="text-yellow-500 text-2xl" />
              <span className="text-yellow-500 text-sm">Properties</span>
            </div>
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-gray-400 text-sm">Total Properties</p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <FaUsers className="text-green-500 text-2xl" />
              <span className="text-green-500 text-sm">Applications</span>
            </div>
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-gray-400 text-sm">Pending Applications</p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <FaListUl className="text-blue-500 text-2xl" />
              <span className="text-blue-500 text-sm">Listings</span>
            </div>
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-gray-400 text-sm">Active Listings</p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <FaMoneyBillWave className="text-purple-500 text-2xl" />
              <span className="text-purple-500 text-sm">Revenue</span>
            </div>
            <h3 className="text-2xl font-bold">₹0</h3>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/properties/new')}
              className="bg-yellow-500 text-black font-bold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3"
            >
              <FaPlus /> List New Property
            </button>
            <button className="bg-[#1e293b] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center justify-center gap-3">
              <FaUsers /> View Applications
            </button>
            <button 
              onClick={() => navigate('/properties')}
              className="bg-[#1e293b] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center justify-center gap-3"
            >
              <FaHome /> Browse Properties
            </button>
            <button className="bg-[#1e293b] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center justify-center gap-3">
              <FaMoneyBillWave /> Manage Payments
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1e293b] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="text-center py-8">
            <FaHome className="text-gray-600 text-4xl mx-auto mb-4" />
            <p className="text-gray-400">No recent activity to show</p>
            <button
              onClick={() => navigate('/properties/new')}
              className="mt-4 text-yellow-500 hover:text-yellow-400 font-semibold"
            >
              Get Started by Adding a Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
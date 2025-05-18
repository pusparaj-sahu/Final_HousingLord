import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaMoneyBillWave, FaListUl, FaPlus } from 'react-icons/fa';
import { sanityClient } from '../lib/sanityClient';
import { useEffect, useState, useRef } from 'react';

const ADMIN_EMAILS = ['pusparajsahu3105@gmail.com','pusparajsahu0@gmail.com']; // Add your real admin emails here

// Simple toast system
const useToast = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const timeoutRef = useRef<any>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), 3000);
  };
  const Toast = toast ? (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
  ) : null;
  return { showToast, Toast };
};

const AdminApprovalSection = ({ user }: { user: any }) => {
  const [pendingProperties, setPendingProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast, Toast } = useToast();

  const fetchPending = async () => {
    setLoading(true);
    try {
      const result = await sanityClient.fetch(`*[_type == "property" && location->approved == false]{
        _id,
        title,
        location->{_id, city, state, country, approved},
        owner->{name, email},
        price,
        images,
        description
      }`);
      setPendingProperties(result);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pending properties.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (property: any) => {
    try {
      await sanityClient.patch(property.location._id).set({ approved: true }).commit();
      fetchPending();
      // Notify owner
      await fetch('/api/notify-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: property.owner?.email,
          subject: 'Your property has been approved',
          message: `Congratulations! Your property "${property.title}" has been approved and is now live.`
        })
      });
      showToast('Property approved and owner notified!', 'success');
    } catch (err) {
      showToast('Failed to approve or notify owner.', 'error');
    }
  };

  const handleDisapprove = async (property: any) => {
    try {
      await sanityClient.delete(property._id);
      await sanityClient.delete(property.location._id);
      fetchPending();
      // Notify owner
      await fetch('/api/notify-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: property.owner?.email,
          subject: 'Your property was rejected',
          message: `Sorry, your property "${property.title}" was not approved. Please contact support for details.`
        })
      });
      showToast('Property disapproved and owner notified.', 'success');
    } catch (err) {
      showToast('Failed to disapprove or notify owner.', 'error');
    }
  };

  if (!user || !ADMIN_EMAILS.includes(user.primaryEmailAddress?.emailAddress)) return null;

  return (
    <>
      {Toast}
      <div className="my-8 p-6 bg-[#232b3b] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin Approval - Pending Properties</h2>
        {loading ? <p>Loading...</p> : null}
        {error ? <p className="text-red-500">{error}</p> : null}
        {pendingProperties.length === 0 && !loading ? <p>No pending properties.</p> : null}
        <div className="space-y-6">
          {pendingProperties.map((property) => (
            <div key={property._id} className="border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-xl font-semibold text-white">{property.title}</h3>
              <p className="text-gray-300">{property.description}</p>
              <p className="text-gray-400">Location: {property.location.city}, {property.location.state}, {property.location.country}</p>
              <p className="text-gray-400">Owner: {property.owner?.name} ({property.owner?.email})</p>
              <p className="text-gray-400">Price: ₹{property.price}</p>
              <div className="flex gap-4 mt-2">
                <button onClick={() => handleApprove(property)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={() => handleDisapprove(property)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Disapprove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const UserPropertiesSection = ({ user }: { user: any }) => {
  const [userProperties, setUserProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    const fetchUserProperties = async () => {
      setLoading(true);
      try {
        const result = await sanityClient.fetch(`*[_type == "property" && owner->email == $email]{
          _id,
          title,
          location->{city, state, country, approved},
          price,
          images,
          description
        }`, { email: user.primaryEmailAddress.emailAddress });
        setUserProperties(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch your properties.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProperties();
  }, [user]);

  if (!user?.primaryEmailAddress?.emailAddress) return null;

  return (
    <div className="my-8 p-6 bg-[#232b3b] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Your Listings</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p className="text-red-500">{error}</p> : null}
      {userProperties.length === 0 && !loading ? <p>You have not listed any properties yet.</p> : null}
      <div className="space-y-6">
        {userProperties.map((property) => (
          <div key={property._id} className="border-b border-gray-700 pb-4 mb-4">
            <h3 className="text-xl font-semibold text-white">{property.title}</h3>
            <p className="text-gray-300">{property.description}</p>
            <p className="text-gray-400">
              Location: {property.location ? 
                `${property.location.city || 'N/A'}, ${property.location.state || 'N/A'}, ${property.location.country || 'N/A'}` : 
                'Location not specified'}
            </p>
            <p className="text-gray-400">Price: ₹{property.price}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
              property.location && property.location.approved ? 
                'bg-green-600 text-white' : 
                'bg-yellow-500 text-black'
            }`}>
              {property.location && property.location.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Update Dashboard to accept a section prop
interface DashboardProps {
  section?: string;
}

const Dashboard = ({ section }: DashboardProps) => {
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

        <UserPropertiesSection user={user} />
        <AdminApprovalSection user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
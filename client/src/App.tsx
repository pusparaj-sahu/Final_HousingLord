import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/DashBoard';
import PropertiesPage from './pages/PropertiesPage';
import NotFound from './pages/not-found';
import ProtectedRoute from './pages/ProtectedRoutes';
import { useState } from 'react';
import PropertyShowcase from './components/PropertyShowcase';
import PropertyForm from './pages/PropertyForm';
import React from 'react';

const PropertyDetailPage = () => <div className="min-h-screen flex items-center justify-center text-white text-2xl">Property Detail Page Coming Soon</div>;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/properties/new" element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/properties" element={
            <ProtectedRoute>
              <DashBoard section="properties" />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/applications" element={
            <ProtectedRoute>
              <DashBoard section="applications" />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <DashBoard section="profile" />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

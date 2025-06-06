import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { checkExistingInterest } from '../lib/sanityClient';
import { toast } from 'react-hot-toast';

interface InterestButtonProps {
  propertyId: string;
  ownerId: string;
  onInterestCreated?: () => void;
}

export const InterestButton = ({ propertyId, ownerId, onInterestCreated }: InterestButtonProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [isInterested, setIsInterested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkInterest = async () => {
      if (isLoaded && user) {
        try {
          const existingInterest = await checkExistingInterest(user.id, propertyId);
          setIsInterested(!!existingInterest);
        } catch (error) {
          console.error('Error checking interest:', error);
        }
      }
    };
    checkInterest();
  }, [isLoaded, user, propertyId]);

  const handleInterest = async () => {
    if (!isSignedIn || !user) {
      openSignIn();
      return;
    }
    if (user.id === ownerId) {
      toast.error('You cannot show interest in your own property');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/interested', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          name: user.fullName || '',
          phone: user.phoneNumbers?.[0]?.phoneNumber || '',
          propertyId,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setIsInterested(true);
        toast.success('Interest shown successfully!');
        onInterestCreated?.();
      } else if (result.message === 'Already interested') {
        setIsInterested(true);
        toast('You have already shown interest.');
      } else {
        toast.error('Failed to show interest. Please try again.');
      }
    } catch (error) {
      console.error('Error showing interest:', error);
      toast.error('Failed to show interest. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <button
        disabled
        className="w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-md cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }
  if (user?.id === ownerId) {
    return null; // Don't show the button for property owners
  }
  return (
    <button
      onClick={handleInterest}
      disabled={isInterested || isLoading}
      className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isInterested
          ? 'bg-green-100 text-green-800 cursor-not-allowed'
          : isLoading
          ? 'bg-gray-100 text-gray-400 cursor-wait'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isInterested ? 'Already Interested' : isLoading ? 'Processing...' : "I'm Interested"}
    </button>
  );
};
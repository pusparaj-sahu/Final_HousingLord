import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const NAVBAR_HEIGHT = 72; // px, adjust if your navbar is taller/shorter

const SignUpPage = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-background px-2 sm:px-0"
      style={{ paddingTop: NAVBAR_HEIGHT, minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
    >
      <div className="w-full max-w-md">
        <SignUp 
          routing="hash"
          redirectUrl="/dashboard"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
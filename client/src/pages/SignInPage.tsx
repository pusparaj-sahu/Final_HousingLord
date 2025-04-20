import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn 
        routing="hash"
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
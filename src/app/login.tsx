'use client';

import { useState, useRef, FormEvent, MouseEvent, JSX } from 'react';
import { useRouter } from 'next/navigation';
import Signup from './Signup';
import { FaUser, FaEnvelope, FaLock, FaUserMd, FaUserCog } from 'react-icons/fa';
import { useAuth } from './contexts/AuthContext';

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [borderPosition, setBorderPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create user data with role
      const userData = {
        id: email,
        name: email.split('@')[0],
        role: userType
      };

      // Use AuthContext login
      login(userData);
    } catch (error) {
      setError('Invalid login credentials');
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBorderPosition({ x, y });
  };

  const handleSignup = () => setShowSignup(true);
  const handleBackToLogin = () => setShowSignup(false);
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  if (showSignup) {
    return <Signup userType={userType} onBackToLogin={handleBackToLogin} />;
  }

  const borderImage = `radial-gradient(circle at ${borderPosition.x}% ${borderPosition.y}%, 
    rgba(56,189,248,0.9) 25%, 
    rgba(30,64,175,0.7) 65%, 
    rgba(30,64,175,0.2) 90%, 
    rgba(30,64,175,0) 100%) 1`;

  return (
    <div className="w-full h-screen bg-blue-900 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
            Welcome to Clinical Laboratories
          </h1>
          <p className="text-white text-lg font-medium">Login to continue</p>
        </div>

        <form
          ref={formRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setBorderPosition({ x: 50, y: 50 })}
          onSubmit={handleSubmit}
          className="w-full space-y-6 bg-blue-800 p-8 shadow-xl border-2 relative overflow-hidden rounded-2xl"
          style={{
            border: `2px solid ${borderImage}`,
          }}
        >
          <span
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              borderRadius: '1rem',
              border: `2px solid ${borderImage}`,
              zIndex: 0,
            }}
          />

          <div className="flex items-center justify-center mb-6 relative z-10 group">
            <div className="bg-blue-600 p-3 rounded-full transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
              {userType === 'doctor' ? (
                <FaUserMd className="w-8 h-8 text-white transition-all duration-200 group-hover:scale-110" />
              ) : userType === 'admin' ? (
                <FaUserCog className="w-8 h-8 text-white transition-all duration-200 group-hover:scale-110" />
              ) : (
                <FaUser className="w-8 h-8 text-white transition-all duration-200 group-hover:scale-110" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white ml-4 transition-all duration-200 group-hover:text-blue-300">Welcome {userType === 'doctor' ? 'Doctor' : userType === 'admin' ? 'Admin' : 'Patient'}</h2>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setUserType('patient')}
                className={`px-4 py-2 rounded-full transition-colors duration-200 hover:scale-105 hover:shadow-lg ${
                  userType === 'patient' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-300'
                }`}
                type="button"
              >
                Patient
              </button>
              <button
                onClick={() => setUserType('doctor')}
                className={`px-4 py-2 rounded-full transition-colors duration-200 hover:scale-105 hover:shadow-lg ${
                  userType === 'doctor' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-300'
                }`}
                type="button"
              >
                Doctor
              </button>
              <button
                onClick={() => setUserType('admin')}
                className={`px-4 py-2 rounded-full transition-colors duration-200 hover:scale-105 hover:shadow-lg ${
                  userType === 'admin' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-300'
                }`}
                type="button"
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900 border-l-4 border-red-500 text-white px-4 py-3 rounded-r relative z-10">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2 relative z-10">
              Email
            </label>
            <div className="relative z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-blue-300 animate-pulse" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-full border-2 border-blue-500 bg-blue-900 text-white shadow-sm hover:border-blue-400 hover:bg-blue-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200 pl-10 pr-4 py-2"
                required
                disabled={isLoading || authLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2 relative z-10">
              Password
            </label>
            <div className="relative z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-blue-300 animate-pulse" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-full border-2 border-blue-500 bg-blue-900 text-white shadow-sm hover:border-blue-400 hover:bg-blue-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200 pl-10 pr-4 py-2"
                required
                disabled={isLoading || authLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200 hover:bg-blue-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-300 font-medium transition-all duration-200 hover:text-blue-200 hover:underline hover:underline-offset-2 hover:decoration-2 hover:translate-x-1 hover:scale-105"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed relative z-10"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>

          <div className="text-center mt-4 relative z-10">
            <p className="text-white">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={handleSignup}
                className="text-blue-300 font-semibold transition-all duration-200 hover:text-blue-200 hover:underline hover:underline-offset-2 hover:decoration-2 hover:translate-x-1 hover:scale-105"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

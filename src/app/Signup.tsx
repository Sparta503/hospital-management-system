'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { FaUser, FaBuilding, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { Field } from './components/form/InputFields';

type SignupFormProps = {
  onBackToLogin: () => void;
  userType?: string; // Made optional since it's not used
};

type UserRole = 'patient' | 'doctor' | 'admin';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  organization: string;
  role: UserRole;
};

export default function SignupForm({ onBackToLogin }: SignupFormProps) {

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    role: 'patient',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onBackToLogin();
    } catch {
      setError('Failed to create account');
      setIsLoading(false);
    }
  };

  const borderGradient = `linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)`;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Create Account</h1>
        <p className="text-white text-lg font-medium">Join as a {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</p>
      </div>

      <div className="relative group">
        {/* Outer glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Middle glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-60 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Main border */}
        <div className="relative p-[1px] rounded-2xl" style={{
          background: borderGradient,
          backgroundSize: '300% 300%',
          animation: 'gradient 15s ease infinite',
        }}>
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-6 bg-blue-900 p-8 relative rounded-2xl"
          >
            {/* Role Selection */}
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 hover:scale-105 hover:shadow-lg ${
                    formData.role === 'patient' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-300'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 hover:scale-105 hover:shadow-lg ${
                    formData.role === 'doctor' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-300'
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 hover:scale-105 hover:shadow-lg ${
                    formData.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-300'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          {error && (
            <div className="bg-red-900 border-l-4 border-red-500 text-white px-4 py-3 rounded-r">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-900 border-l-4 border-green-500 text-white px-4 py-3 rounded-r animate-fade-in">
              <p className="font-medium">Account Created Successfully!</p>
            </div>
          )}

          <Field
            id="name"
            name="name"
            label="Full Name"
            icon={<FaUser className="h-5 w-5 text-blue-300 animate-pulse" />}
            value={formData.name}
            onChange={handleChange}
            isLoading={isLoading}
          />

          {formData.role !== 'patient' && (
            <Field
              id="organization"
              name="organization"
              label={formData.role === 'doctor' ? 'Hospital/Clinic' : 'Organization'}
              icon={<FaBuilding className="h-5 w-5 text-blue-300 animate-pulse" />}
              value={formData.organization}
              onChange={handleChange}
              isLoading={isLoading}
              required={formData.role === 'doctor' || formData.role === 'admin'}
            />
          )}

          <Field
            id="email"
            name="email"
            label="Email"
            type="email"
            icon={<FaEnvelope className="h-5 w-5 text-blue-300 animate-pulse" />}
            value={formData.email}
            onChange={handleChange}
            isLoading={isLoading}
          />

          <Field
            id="password"
            name="password"
            label="Password"
            type="password"
            icon={<FaLock className="h-5 w-5 text-blue-300 animate-pulse" />}
            value={formData.password}
            onChange={handleChange}
            isLoading={isLoading}
          />

          <Field
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            icon={<FaCheck className="h-5 w-5 text-blue-300 animate-pulse" />}
            value={formData.confirmPassword}
            onChange={handleChange}
            isLoading={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed relative"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-white">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200"
              >
                Login
              </button>
            </p>
          </div>
          </form>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% { 
            background-position: 0% 50%;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% { 
            background-position: 100% 50%;
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.7);
          }
          100% { 
            background-position: 0% 50%;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
        }
      `}</style>
    </>
  );
}

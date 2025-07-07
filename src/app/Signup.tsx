'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaBuilding, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { Field } from './components/form/InputFields';

type SignupFormProps = {
  userType: string;
  onBackToLogin: () => void;
};

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  organization: string;
};

export default function SignupForm({ userType, onBackToLogin }: SignupFormProps): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
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
    } catch (err) {
      setError('Failed to create account');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-900 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Create Account</h1>
          <p className="text-white text-lg font-medium">Sign up as {userType}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 bg-blue-800 p-8 rounded-2xl shadow-xl border-2 border-blue-500"
        >
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

          <Field
            id="organization"
            name="organization"
            label="Organization Name"
            icon={<FaBuilding className="h-5 w-5 text-blue-300 animate-pulse" />}
            value={formData.organization}
            onChange={handleChange}
            isLoading={isLoading}
          />

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
  );
}

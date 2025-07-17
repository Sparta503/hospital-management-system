'use client';

import { useEffect, useState, KeyboardEvent } from "react";
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    // Ensure modal is open when component mounts
    setIsModalOpen(true);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        router.back();
      }
    }

    // Properly type the event listener
    const keyDownHandler = (e: globalThis.KeyboardEvent) => onKeyDown(e as unknown as KeyboardEvent);
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [router]);

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoggingOut(true);
      
      // Simulate a brief delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear all auth data
      localStorage.removeItem('userToken');
      localStorage.removeItem('userType');
      sessionStorage.clear();
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Close modal and redirect to login page
      setIsModalOpen(false);
      
      // Redirect to the root which shows the login form
      window.location.href = '/';
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Logout error:', error.message);
      } else {
        console.error('An unknown error occurred during logout');
      }
      setIsLoggingOut(false);
    }
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    router.back();
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-blue-900/80 flex items-center justify-center z-[9999]"
      onClick={handleCancel}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl max-w-sm w-full p-6 mx-4 shadow-xl border border-blue-400/20"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Confirm Logout
        </h2>

        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-12 w-12 text-red-500 animate-bounce"
          >
            <path
              fillRule="evenodd"
              d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <p className="text-center text-gray-200 text-lg mb-6">
          Are you sure you want to log out?
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-red-500/25 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                <span>Logging out...</span>
              </div>
            ) : (
              'Yes, Logout'
            )}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoggingOut}
            className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-white/20 transition-all duration-200 border border-white/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

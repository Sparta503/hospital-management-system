'use client';
import MessageIcon from '@mui/icons-material/Message';

const MessagesButton = () => {
  const handleMessages = () => {
    window.location.href = '/doctor/messages';
  };
  return (
    <button
      type="button"
      onClick={handleMessages}
      className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 border border-blue-400/30 animate-pulse w-full md:w-1/2 justify-center"
    >
      <MessageIcon fontSize="small" className="-ml-1" />
      Messages
    </button>
  );
};

export default MessagesButton;

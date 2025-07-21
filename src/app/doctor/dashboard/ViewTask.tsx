'use client';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ViewTaskButton = () => {
  const handleViewTasks = () => {
    window.location.href = '/doctor/tasks';
  };
  return (
    <button
      type="button"
      onClick={handleViewTasks}
      className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 border border-blue-400/30 animate-pulse w-full md:w-1/2 justify-center"
    >
      <AssignmentIcon fontSize="small" className="-ml-1" />
      View Tasks
    </button>
  );
};

export default ViewTaskButton;

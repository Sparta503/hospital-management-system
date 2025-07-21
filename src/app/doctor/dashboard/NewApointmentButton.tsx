'use client';

import { useRouter } from 'next/navigation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NewAppointmentButton = () => {
    const router = useRouter();
    const handleNewAppointment = () => {
        router.push('/doctor/appointments/new');
    };
    return (
        <button
            type="button"
            onClick={handleNewAppointment}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 border border-blue-400/30 animate-pulse w-full md:w-1/2 justify-center"
        >
            <AddCircleOutlineIcon fontSize="small" className="-ml-1" />
            New Appointment
        </button>
    );
};

export default NewAppointmentButton;

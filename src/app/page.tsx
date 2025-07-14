import LoginForm from './login';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left: Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/laboratories.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right: Login Form fills right half */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#1e40af', // Use a blue color (Tailwind blue-800)
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, p: 0 }}>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}

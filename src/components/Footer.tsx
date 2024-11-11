import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box py={2.5} bgcolor="#061439" color="white" textAlign="center" sx={{ mt: 'auto' }}>
      <Typography variant="body2" sx={{ fontSize: '1.5rem', fontFamily: 'Kalam' }}>
        © 2024 MyMediPlan 💊
      </Typography>
    </Box>
  );
};

export default Footer;

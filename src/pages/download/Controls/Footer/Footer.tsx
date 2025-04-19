import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();

  return <Box component="footer" sx={{
    p: 2,
    flex: '0 0 auto',
    borderTop: `2px solid ${theme.palette.divider}`
  }}>
    <Typography variant="body2" align="center">
      © {new Date().getFullYear()} Meine Web-App. Alle Rechte vorbehalten.
    </Typography>
  </Box>;
};

export default Footer;
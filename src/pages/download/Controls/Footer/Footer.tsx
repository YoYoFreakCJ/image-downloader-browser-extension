import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { useImages } from '../../Contexts/ImagesContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FromAllTabsSourceInfo } from '../../Model/FromAllTabsSourceInfo';

const Footer: React.FC = () => {
  const theme = useTheme();

  const images = useImages();

  return <Box component="footer" sx={{
    flex: '0 0 auto',
    borderTop: `2px solid ${theme.palette.divider}`
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
        title={`${images.images.length - images.filteredImages.length} images are hidden based on the current filters. Adjust the filters in the settings to show more or less images.`}
      >
        <HelpOutlineIcon fontSize="small" color="primary" sx={{ m: 1 }} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', marginRight: 1 }}>
        Showing {images.filteredImages.length} of {images.images.length} images from {images.sourceInfo.tabCount} tabs
      </Typography>
    </Box>
  </Box>;
};

export default Footer;
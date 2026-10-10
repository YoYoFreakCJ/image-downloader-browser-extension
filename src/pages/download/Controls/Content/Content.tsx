import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useImages } from '../../Contexts/ImagesContext';
import { useSettings } from '../../Contexts/SettingsContext';
import SelectableImageContainer from '../SelectableImageContainer/SelectableImageContainer';

const Content = () => {
    const { filteredImages } = useImages();
    const { settings } = useSettings();

    return <Box display="flex" flexDirection="row" gap="20px" flexWrap="wrap" p={3}>
        {filteredImages.map(img => <SelectableImageContainer image={img} />)}
    </Box>;
};

export default Content;
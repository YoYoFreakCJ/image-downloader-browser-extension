import React from 'react';
import { Box, Button, ButtonGroup, Slider, Tooltip, Typography, useTheme } from '@mui/material';
import { useSettings } from '../../Contexts/SettingsContext';
import { useCallback } from 'react';
import { useImages } from '../../Contexts/ImagesContext';
import { SettingsGroup } from './SettingsGroup';
import { SelectableImage } from '../../Model/SelectableImage';

const VerticalDivider = () => {
  const theme = useTheme();

  return <Box width="1px" sx={{ backgroundColor: theme.palette.divider }} />;
}

const Header = () => {
  const theme = useTheme();
  const { selectAll, deselectAll, filteredImages, markAsDownloaded } = useImages();

  const { settings, updateSettings } = useSettings();

  const onPreviewSizeSliderChanged = useCallback((_, newValue: number) => {
    updateSettings({ PreviewSizeInPx: newValue });
  }, [settings]);

  const onSelectNoneButtonClick = useCallback(() => {
    deselectAll();
  }, []);

  const onSelectAllButtonClick = useCallback(() => {
    selectAll();
  }, []);

  const onDownloadClick = useCallback(() => {
    const selectedImages = filteredImages.filter(x => x.selected);

    for (const img of selectedImages) {
      downloadImage(img);
    }
  }, [filteredImages]);

  const downloadImage = useCallback(async (img: SelectableImage) => {
    await chrome.downloads.download({ url: img.url, conflictAction: settings.ConflictAction as chrome.downloads.FilenameConflictAction });

    markAsDownloaded(img);
  }, [settings]);

  return <Box sx={{
    borderBottom: `2px solid ${theme.palette.divider}`
  }}
    display="flex"
    flexDirection="row"
    justifyContent='space-between'
    alignItems='center'>

    <Box display="flex" flexDirection="row" gap="20px">

      <SettingsGroup title="Preview Size" width='300px'>
        <Slider min={10} max={1000} value={settings.PreviewSizeInPx} onChange={onPreviewSizeSliderChanged} size="small" valueLabelDisplay='auto' />
      </SettingsGroup>

      <VerticalDivider />

      <SettingsGroup title="Select">
        <ButtonGroup>
          <Button sx={{ width: '100px' }} onClick={onSelectNoneButtonClick}>
            <Typography variant='overline'>None</Typography>
          </Button>
          <Button sx={{ width: '100px' }} onClick={onSelectAllButtonClick}>
            <Typography variant='overline'>All</Typography>
          </Button>
        </ButtonGroup>
      </SettingsGroup>
    </Box>

    <Box display='flex' flexDirection='column' alignItems='center'>
      <Tooltip title={filteredImages.filter(x => x.selected).length === 0 ? 'Select at least one image' : 'Download selected images'}>
        {/* Wrap the button in a box for the tooltip to work properly. */}
        <Box>
          <Button variant='contained' color='primary'
            sx={{
              width: '200px',
              height: '50px',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
            disabled={filteredImages.filter(x => x.selected).length === 0}
            onClick={onDownloadClick}>Download</Button>
        </Box>
      </Tooltip>

      <Typography variant='caption'>{filteredImages.filter(x => x.selected).length} of {filteredImages.length} images</Typography>
    </Box>
  </Box>;
};

export default Header;
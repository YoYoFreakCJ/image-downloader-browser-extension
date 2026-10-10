import React from 'react';
import { Box, Button, ButtonGroup, Slider, Tooltip, Typography, useTheme } from '@mui/material';
import { useSettings } from '../../Contexts/SettingsContext';
import { useCallback } from 'react';
import { useImages } from '../../Contexts/ImagesContext';
import { SettingsGroup } from './SettingsGroup';
import { SelectableImage } from '../../Model/SelectableImage';
import { useLoading } from '../../Contexts/LoadingContext';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import TabIcon from '@mui/icons-material/Tab';

const VerticalDivider = () => {
  const theme = useTheme();

  return <Box width="1px" sx={{ backgroundColor: theme.palette.divider }} />;
}

const Header = () => {
  const theme = useTheme();
  const { selectAll, deselectAll, filteredImages, markAsDownloaded, sourceInfo } = useImages();
  const loading = useLoading();

  const { settings, updateSettings } = useSettings();

  const onPreviewSizeSliderChanged = useCallback((_: Event, newValue: number) => {
    updateSettings({ PreviewSizeInPx: newValue });
  }, [settings]);

  const onSelectNoneButtonClick = useCallback(() => {
    deselectAll();
  }, []);

  const onSelectAllButtonClick = useCallback(() => {
    selectAll();
  }, []);

  const onDownloadClick = useCallback(async () => {
    const selectedImages = filteredImages.filter(x => x.selected);

    const loadingId = loading.addLoading(`Downloading ${selectedImages.length} images...`);

    await Promise.all(selectedImages.map(downloadImage));

    loading.removeLoading(loadingId);
  }, [filteredImages]);

  const downloadImage = useCallback(async (img: SelectableImage) => {
    await chrome.downloads.download({
      url: img.url,
      filename: img.fileName,
      conflictAction: settings.ConflictAction as chrome.downloads.FilenameConflictAction
    });

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
              height: '76px',
              fontSize: '20px',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              gap: 0
            }}
            disabled={filteredImages.filter(x => x.selected).length === 0}
            onClick={onDownloadClick}>
            Download
            <Box display="flex" flexDirection="row" gap={2}>
              <Tooltip title={`${filteredImages.filter(x => x.selected).length} of ${filteredImages.length} images selected`}>
                <Box display="flex" flexDirection="row" alignItems="center" gap={0.5} sx={{ whiteSpace: 'nowrap' }}>
                  <BurstModeIcon fontSize="small" />
                  <Typography variant="body2">{`${filteredImages.filter(x => x.selected).length} / ${filteredImages.length}`}</Typography>
                </Box>
              </Tooltip>
              <Tooltip title={`Images sourced from ${sourceInfo.tabCount} tabs`}>
                <Box display="flex" flexDirection="row" alignItems="center" gap={0.5} sx={{ whiteSpace: 'nowrap' }}>
                  <TabIcon fontSize="small" />
                  <Typography variant="body2">{sourceInfo.tabCount}</Typography>
                </Box>
              </Tooltip>
            </Box>
          </Button>
        </Box>
      </Tooltip>

    </Box>
  </Box>;
};

export default Header;
import React from 'react';
import { AppBar, Box, Button, ButtonGroup, Slider, Toolbar, Typography, useTheme } from '@mui/material';
import { useSettings } from '../../Contexts/SettingsContext';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useImages } from '../../Contexts/ImagesContext';

const VerticalDivider = () => {
  const theme = useTheme();

  return <Box width="1px" sx={{ backgroundColor: theme.palette.divider }} />;
}

interface SettingsGroupProps extends React.PropsWithChildren {
  title: string,
  width?: string
}

const SettingsGroup = (props: SettingsGroupProps) => {
  return <Box px={3} py={0} textAlign='center' width={props.width}>
    <Typography variant="overline">{props.title}</Typography>
    <Box>
      {props.children}
    </Box>
  </Box>;
};

const delayBeforeUpdateInMs = 500;

const Header: React.FC = () => {
  const theme = useTheme();
  const { selectAll, deselectAll } = useImages();

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

  return <Box sx={{
    borderBottom: `2px solid ${theme.palette.divider}`
  }}
    display='flex'
    flexDirection='row'
    gap="20px">

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
  </Box>;
};

export default Header;
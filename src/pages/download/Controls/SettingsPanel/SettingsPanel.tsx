import { Box, Checkbox, FormControlLabel, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
import { useSettings } from '../../Contexts/SettingsContext';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsGroup from './SettingsGroup';
import { Settings } from '../../Settings';
import SizeFilter from './SizeFilter';

export const closedPanelWidthInPx = 56;
export const closedPanelWidthStr = `${closedPanelWidthInPx}px`;
export const openedPanelWidthInPx = 300;
export const openedPanelWidthStr = `${openedPanelWidthInPx}px`;
const settingsGap = "4px";

const HorizontalDivider = () => <Box height="1px" sx={{ backgroundColor: "divider" }} my={2} />

export const SettingsPanel: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const theme = useTheme();

    const toggleIsOpen = useCallback((newValue: boolean) => {
        updateSettings({ FlyoutIsOpen: newValue });
    }, [settings]);

    const setSettings = useCallback((newSettings: Partial<Settings>) => {
        updateSettings(newSettings);
    }, [settings]);

    return <Box height="100%" width={settings.FlyoutIsOpen ? openedPanelWidthStr : closedPanelWidthStr}
        flexShrink={0}
        sx={{
            background: theme.palette.background.paper,
            transition: "width .3s",
            overflowX: "hidden",
            borderRight: `1px solid ${theme.palette.divider}`
        }}>
        <Box p={1} display='flex' alignItems='start' gap='10px'>
            <IconButton onClick={() => toggleIsOpen(!settings.FlyoutIsOpen)} sx={{}}>
                <SettingsIcon />
            </IconButton>

            <Box mt={.5} flexGrow={1} flexShrink={0}>
                <Typography variant='overline'>Settings</Typography>

                <HorizontalDivider />

                <SettingsGroup title="Display">
                    <Box display="flex" flexDirection="column">
                        <FormControlLabel
                            sx={{ margin: 0, whiteSpace: "nowrap" }}
                            control={
                                <Checkbox
                                    checked={settings.ShowSourceInformation}
                                    onChange={(_, newVal) => setSettings({ ShowSourceInformation: newVal })}
                                    sx={{ padding: "4px" }}
                                />
                            }
                            label={
                                <Typography variant="body2" noWrap>Source Information</Typography>
                            }
                        />
                        <FormControlLabel
                            sx={{ margin: 0, whiteSpace: "nowrap" }}
                            control={
                                <Checkbox
                                    checked={settings.ShowSizeInformation}
                                    onChange={(_, newVal) => setSettings({ ShowSizeInformation: newVal })}
                                    sx={{ padding: "4px" }}
                                />
                            }
                            label={
                                <Typography variant="body2" noWrap>Size Information</Typography>
                            }
                        />
                    </Box>
                </SettingsGroup>

                <HorizontalDivider />

                <SettingsGroup title="Filter">
                    <SizeFilter />
                </SettingsGroup>

                <HorizontalDivider />

                <SettingsGroup title="Colors">
                    <Box display="flex" flexDirection="row" gap={settingsGap}>
                        <Tooltip title="Light">
                            <IconButton onClick={() => setSettings({ Mode: 'light' })}>
                                <LightModeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dark">
                            <IconButton onClick={() => setSettings({ Mode: 'dark' })}>
                                <DarkModeIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </SettingsGroup>
            </Box>
        </Box>
    </Box >;
};
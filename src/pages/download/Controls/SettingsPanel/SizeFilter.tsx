import { Box, ButtonGroup, IconButton, Slider, SliderProps, TextField, TextFieldProps, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import CompressIcon from "@mui/icons-material/Compress";
import ExpandIcon from "@mui/icons-material/Expand";
import { useSettings } from "../../Contexts/SettingsContext";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Settings } from "../../Settings";

const SizeFilter = () => {
    const { settings, updateSettings } = useSettings();

    const [minHeightStr, setMinHeightStr] = useState(settings.MinHeightInPx.toString());
    const [maxHeightStr, setMaxHeightStr] = useState(settings.MaxHeightInPx.toString());
    const [minWidthStr, setMinWidthStr] = useState(settings.MinWidthInPx.toString());
    const [maxWidthStr, setMaxWidthStr] = useState(settings.MaxWidthInPx.toString());

    const sliderProps: SliderProps = useMemo(() => ({
        size: "small",
        valueLabelDisplay: "auto",
        min: 0
    }), []);

    const textFieldProps: TextFieldProps = useMemo(() => ({
        size: "small",
        variant: "filled",
        slotProps: {
            input: {
                endAdornment: "px"
            },
            htmlInput: {
                sx: {
                    padding: "4px"
                }
            }
        },
        sx: {
            width: "90px",
            height: "40px"
        }
    }), []);

    const roundToNextThousand = (value: number) => {
        const roundedValue = Math.round(value / 1000) * 1000;
        return roundedValue === 0 ? 1000 : roundedValue;
    }

    /* Min Width Change */
    const onMinWidthSliderChanged = useCallback((_, newValue: number) => {
        setMinWidthStr(newValue.toString());
        evaluateMaxWidth(newValue);
    }, [settings]);

    const onMinWidthStrChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMinWidthStr(e.target.value);

        const minWidth = parseInt(e.target.value.replace(/\D/g, ""));

        evaluateMaxWidth(minWidth);
    }, [settings]);

    const evaluateMaxWidth = useCallback((minWidth: number) => {
        const newSettings: Partial<Settings> = { MinWidthInPx: minWidth };

        if (minWidth >= settings.MaxWidthInPx) {
            const newMaxWidth = minWidth + 1;
            setMaxWidthStr(newMaxWidth.toString());
            newSettings.MaxWidthInPx = newMaxWidth;
        }

        updateSettings(newSettings);
    }, [settings]);

    const onMinWidthBlur = useCallback(() => {
        if (minWidthStr !== settings.MinWidthInPx.toString()) {
            setMinWidthStr(settings.MinWidthInPx.toString());
        }
    }, [minWidthStr]);

    /* /Min Width Change */

    /* Max Width Change */
    const onMaxWidthSliderChanged = useCallback((_, newValue: number) => {
        setMaxWidthStr(newValue.toString());
        evaluateMinWidth(newValue);
    }, [settings]);

    const onMaxWidthStrChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxWidthStr(e.target.value);

        const maxWidth = parseInt(e.target.value.replace(/\D/g, ""));

        evaluateMinWidth(maxWidth);
    }, [settings]);

    const evaluateMinWidth = useCallback((maxWidth: number) => {
        const newSettings: Partial<Settings> = { MaxWidthInPx: maxWidth };

        if (maxWidth <= settings.MinWidthInPx) {
            const newMinWidth = maxWidth - 1;
            setMinWidthStr(newMinWidth.toString());
            newSettings.MinWidthInPx = newMinWidth;
        }

        updateSettings(newSettings);
    }, [settings]);

    const onMaxWidthBlur = useCallback(() => {
        if (maxWidthStr !== settings.MaxWidthInPx.toString()) {
            setMaxWidthStr(settings.MaxWidthInPx.toString());
        }
    }, [maxWidthStr]);

    /* /Max Width Change */

    /* Min Height Change */
    const onMinHeightSliderChanged = useCallback((_, newValue: number) => {
        setMinHeightStr(newValue.toString());
        evaluateMaxHeight(newValue);
    }, [settings]);

    const onMinHeightStrChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMinHeightStr(e.target.value);

        const minHeight = parseInt(e.target.value.replace(/\D/g, ""));

        evaluateMaxHeight(minHeight);
    }, [settings]);

    const evaluateMaxHeight = useCallback((minHeight: number) => {
        const newSettings: Partial<Settings> = { MinHeightInPx: minHeight };

        if (minHeight >= settings.MaxHeightInPx) {
            const newMaxHeight = minHeight + 1;
            setMaxHeightStr(newMaxHeight.toString());
            newSettings.MaxHeightInPx = newMaxHeight;
        }

        updateSettings(newSettings);
    }, [settings]);

    const onMinHeightBlur = useCallback(() => {
        if (minHeightStr !== settings.MinHeightInPx.toString()) {
            setMinHeightStr(settings.MinHeightInPx.toString());
        }
    }, [minHeightStr]);

    /* /Min Height Change */

    /* Max Height Change */
    const onMaxHeightSliderChanged = useCallback((_, newValue: number) => {
        setMaxHeightStr(newValue.toString());
        evaluateMinHeight(newValue);
    }, [settings]);

    const onMaxHeightStrChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxHeightStr(e.target.value);

        const maxHeight = parseInt(e.target.value.replace(/\D/g, ""));

        evaluateMinHeight(maxHeight);
    }, [settings]);

    const evaluateMinHeight = useCallback((maxHeight: number) => {
        const newSettings: Partial<Settings> = { MaxHeightInPx: maxHeight };

        if (maxHeight <= settings.MinHeightInPx) {
            const newMinHeight = maxHeight - 1;
            setMinHeightStr(newMinHeight.toString());
            newSettings.MinHeightInPx = newMinHeight;
        }

        updateSettings(newSettings);
    }, [settings]);

    const onMaxHeightBlur = useCallback(() => {
        if (maxHeightStr !== settings.MaxHeightInPx.toString()) {
            setMaxHeightStr(settings.MaxHeightInPx.toString());
        }
    }, [maxHeightStr]);

    /* /Max Height Change */

    return <Box display="flex" flexDirection="column" gap={1}>
        {/* Width filter */}
        <Box display="flex" flexDirection="row" gap={1}>
            <ToggleButtonGroup orientation="vertical">
                <Tooltip title="Filter Minimum Width">
                    <ToggleButton
                        value="filterMinWidth"
                        selected={settings.FilterMinWidth}
                        onChange={() => updateSettings({ FilterMinWidth: !settings.FilterMinWidth })}
                        size="small">
                        <CompressIcon sx={{ transform: 'rotate(90deg)' }} />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Filter Maximum Width">
                    <ToggleButton value="filterMaxWidth"
                        selected={settings.FilterMaxWidth}
                        onChange={() => updateSettings({ FilterMaxWidth: !settings.FilterMaxWidth })}
                        size="small">
                        <ExpandIcon sx={{ transform: 'rotate(90deg)' }} />
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>
            <Box display="flex" flexDirection="column" gap={0} flexGrow={1} justifyContent="space-around">
                <Slider
                    {...sliderProps}
                    value={settings.MinWidthInPx}
                    max={roundToNextThousand(settings.MinWidthInPx)}
                    onChange={onMinWidthSliderChanged}
                    disabled={!settings.FilterMinWidth} />
                <Slider
                    {...sliderProps}
                    value={settings.MaxWidthInPx}
                    max={roundToNextThousand(settings.MaxWidthInPx)}
                    onChange={onMaxWidthSliderChanged}
                    disabled={!settings.FilterMaxWidth} />
            </Box>
            <Box display="flex" flexDirection="column" gap={0} flexGrow={0} justifyContent="space-around">
                <TextField
                    {...textFieldProps}
                    value={minWidthStr}
                    onChange={onMinWidthStrChange}
                    onBlur={onMinWidthBlur}
                    disabled={!settings.FilterMinWidth} />
                <TextField
                    {...textFieldProps}
                    value={maxWidthStr}
                    onChange={onMaxWidthStrChange}
                    onBlur={onMaxWidthBlur}
                    disabled={!settings.FilterMaxWidth} />
            </Box>
        </Box>
        {/* /Width filter */}

        {/* Height filter */}
        <Box display="flex" flexDirection="row" gap={1}>
            <ToggleButtonGroup orientation="vertical">
                <Tooltip title="Filter Minimum Height">
                    <ToggleButton
                        value="filterMinHeight"
                        selected={settings.FilterMinHeight}
                        onChange={() => updateSettings({ FilterMinHeight: !settings.FilterMinHeight })}
                        size="small">
                        <CompressIcon />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Filter Maximum Height">
                    <ToggleButton value="filterMaxHeight"
                        selected={settings.FilterMaxHeight}
                        onChange={() => updateSettings({ FilterMaxHeight: !settings.FilterMaxHeight })}
                        size="small">
                        <ExpandIcon />
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>
            <Box display="flex" flexDirection="column" gap={0} flexGrow={1} justifyContent="space-around">
                <Slider
                    {...sliderProps}
                    value={settings.MinHeightInPx}
                    max={roundToNextThousand(settings.MinHeightInPx)}
                    onChange={onMinHeightSliderChanged}
                    disabled={!settings.FilterMinHeight} />
                <Slider
                    {...sliderProps}
                    value={settings.MaxHeightInPx}
                    max={roundToNextThousand(settings.MaxHeightInPx)}
                    onChange={onMaxHeightSliderChanged}
                    disabled={!settings.FilterMaxHeight} />
            </Box>
            <Box display="flex" flexDirection="column" gap={0} flexGrow={0} justifyContent="space-around">
                <TextField
                    {...textFieldProps}
                    value={minHeightStr}
                    onChange={onMinHeightStrChange}
                    onBlur={onMinHeightBlur}
                    disabled={!settings.FilterMinHeight} />
                <TextField
                    {...textFieldProps}
                    value={maxHeightStr}
                    onChange={onMaxHeightStrChange}
                    onBlur={onMaxHeightBlur}
                    disabled={!settings.FilterMaxHeight} />
            </Box>
        </Box>
        {/* /Height filter */}
    </Box>
};

export default SizeFilter;
import { Box, ButtonGroup, IconButton, Slider, SliderProps, TextField, TextFieldProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
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

    const onMinHeightStrChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMinHeightStr(e.target.value);

        const minHeight = parseInt(e.target.value.replace(/\D/g, ""));

        if (!isNaN(minHeight)) {
            const settingsToUpdate: Partial<Settings> = { MinHeightInPx: minHeight };

            if (minHeight >= settings.MaxHeightInPx) {
                settingsToUpdate.MaxHeightInPx = minHeight + 1;
                setMaxHeightStr(settingsToUpdate.MaxHeightInPx.toString());
            }

            updateSettings(settingsToUpdate);
        }
    }, [settings]);

    const onMinHeightBlur = useCallback(() => {
        if (minHeightStr !== settings.MinHeightInPx.toString()) {
            setMinHeightStr(settings.MinHeightInPx.toString());
        }
    }, [minHeightStr]);

    return <Box display="flex" flexDirection="row" gap={1}>
        <ToggleButtonGroup orientation="vertical">
            <ToggleButton
                value="filterMinHeight"
                selected={settings.FilterMinHeight}
                onChange={() => updateSettings({ FilterMinHeight: !settings.FilterMinHeight })}
                size="small">
                <CompressIcon />
            </ToggleButton>
            <ToggleButton value="filterMaxHeight"
                selected={settings.FilterMaxHeight}
                onChange={() => updateSettings({ FilterMaxHeight: !settings.FilterMaxHeight })}
                size="small">
                <ExpandIcon />
            </ToggleButton>
        </ToggleButtonGroup>
        <Box display="flex" flexDirection="column" gap={0} flexGrow={1} justifyContent="space-around">
            <Slider
                {...sliderProps}
                value={settings.MinHeightInPx}
                max={roundToNextThousand(settings.MinHeightInPx)}
                onChange={(_, newValue: number) => { setMinHeightStr(newValue.toString()); updateSettings({ MinHeightInPx: newValue }); }}
                disabled={!settings.FilterMinHeight} />
            <Slider
                {...sliderProps}
                value={settings.MaxHeightInPx}
                max={roundToNextThousand(settings.MaxHeightInPx)}
                onChange={(_, newValue: number) => updateSettings({ MaxHeightInPx: newValue })}
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
                onChange={(e) => setMaxHeightStr(e.target.value)}
                disabled={!settings.FilterMaxHeight} />
        </Box>
    </Box>
};

export default SizeFilter;
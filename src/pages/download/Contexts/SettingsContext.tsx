import React, { createContext, useContext, useState } from "react";
import { Settings } from "../Settings";
import { useEffect } from "react";
import { useCallback } from "react";
import { useColorScheme } from "@mui/material";
import { useApp } from "./AppContext";
import { useRef } from "react";

const settingsChromeStorageKey = "settings";
const delayBeforeUpdateInMs = 500;

type SettingsContextType = {
    settings: Settings,
    updateSettings: (settings: Partial<Settings>) => void
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const initialSettings: Settings = {
    FlyoutIsOpen: false,
    Mode: 'system',
    PreviewSizeInPx: 200,
    ShowSourceInformation: true,
    ShowSizeInformation: true,
    FilterMinWidth: true,
    MinWidthInPx: 10,
    FilterMaxWidth: true,
    MaxWidthInPx: 1000,
    FilterMinHeight: true,
    MinHeightInPx: 10,
    FilterMaxHeight: true,
    MaxHeightInPx: 1000
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const app = useApp();

    const [settings, setSettings] = useState<Settings>(initialSettings);
    const { setMode } = useColorScheme();
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = useCallback(async () => {
        const settingsFromStorage = (await chrome.storage.sync.get(settingsChromeStorageKey))[settingsChromeStorageKey] as Settings;

        setSettings(settingsFromStorage);
    }, []);

    const updateSettings = useCallback((newSettings: Partial<Settings>) => {
        setSettings({ ...settings, ...newSettings });

        if (newSettings.Mode) {
            setMode(newSettings.Mode);
        }
    }, [settings]);

    useEffect(() => {
        // Clear previous timeout if there was any.
        if (!!saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(async () => {
            await chrome.storage.sync.set({ [settingsChromeStorageKey]: settings });
            app.showSuccessNotification("Settings were saved.")
        }, delayBeforeUpdateInMs);
    }, [settings]);

    return (
        <SettingsContext.Provider value={{
            settings,
            updateSettings
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings muss innerhalb eines SettingsProviders verwendet werden");
    }
    return context;
};
import { createContext, useState } from "react";
import { Image } from "../Model/Image";
import { useCallback } from "react";
import { SelectableImage } from "../Model/SelectableImage";
import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { MessageTypes } from "@root/src/MessageTypes";
import { useSettings } from "./SettingsContext";

type ImageAction =
    | { type: "add"; image: SelectableImage }
    | { type: "clear" }
    | { type: "select"; image: SelectableImage }
    | { type: "deselect"; image: SelectableImage }
    | { type: "selectAll" }
    | { type: "deselectAll" }
    | { type: "markAsDownloaded"; image: SelectableImage };

const ImagesReducer = (state: SelectableImage[], action: ImageAction): SelectableImage[] => {
    switch (action.type) {
        case 'add':
            return [...state, action.image];

        case 'clear':
            return [];

        case 'select':
            return state.map(img => img === action.image ? { ...img, selected: true } : img);

        case 'deselect':
            return state.map(img => img === action.image ? { ...img, selected: false } : img);

        case 'selectAll':
            return state.map(img => ({ ...img, selected: img.downloaded ? img.selected : true }));

        case 'deselectAll':
            return state.map(img => ({ ...img, selected: img.downloaded ? img.selected : false }));

        case 'markAsDownloaded':
            return state.map(img => img === action.image ? { ...img, downloaded: true, selected: false } : img);

        default:
            return state;
    };
};

type ImagesContextType = {
    images: SelectableImage[];
    filteredImages: SelectableImage[];
    add: (...images: SelectableImage[]) => void;
    clear: () => void;
    select: (image: SelectableImage) => void;
    deselect: (image: SelectableImage) => void;
    selectAll: () => void;
    deselectAll: () => void;
    markAsDownloaded: (image: SelectableImage) => void;
};

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export const ImagesProvider = (props: React.PropsWithChildren) => {
    const [images, dispatch] = useReducer(ImagesReducer, []);
    const { settings } = useSettings();
    const [filteredImages, setFilteredImages] = useState<SelectableImage[]>([]);

    useEffect(() => { onLoad(); }, []);
    useEffect(() => { onImagesChange(); }, [images]);
    useEffect(() => { onSettingsChange(); }, [settings]);

    const onLoad = useCallback(async () => {
        dispatch({ type: 'clear' });

        const tabs = await chrome.tabs.query({ currentWindow: true });
        const prms: Promise<void>[] = [];

        const downloadTabId = (await chrome.tabs.getCurrent()).id;

        for (const tab of tabs.filter(t => t.id !== downloadTabId)) {
            const p = new Promise<void>(resolve => {
                chrome.tabs.sendMessage(tab.id!, { type: MessageTypes.GetImagesAllTabs }, response => {
                    const images = response.images as Image[];

                    for (const img of images) {
                        const selectableImg: SelectableImage = {
                            selected: true,
                            downloaded: false,
                            url: img.url,
                            sourceIconUrl: tab.favIconUrl!,
                            fileName: img.url.split('/').pop()!,
                            widthInPx: img.widthInPx,
                            heightInPx: img.heightInPx,
                            tabId: tab.id!
                        };

                        dispatch({ type: 'add', image: selectableImg });
                    }

                    resolve();
                });
            });

            prms.push(p);
        }

        await Promise.all(prms);
    }, []);

    const onImagesChange = useCallback(() => {
        setFilteredImages(images.filter(img => includeImage(img)));
    }, [images]);

    const onSettingsChange = useCallback(() => {
        setFilteredImages(images.filter(img => includeImage(img)));
    }, [settings]);

    const includeImage = useCallback((image: SelectableImage) => {
        if (settings.FilterMinHeight && image.heightInPx < settings.MinHeightInPx) return false;
        if (settings.FilterMaxHeight && image.heightInPx > settings.MaxHeightInPx) return false;
        if (settings.FilterMinWidth && image.widthInPx < settings.MinWidthInPx) return false;
        if (settings.FilterMaxWidth && image.widthInPx > settings.MaxWidthInPx) return false;

        return true;
    }, [settings]);

    const add = useCallback((...images: SelectableImage[]) => {
        for (const image of images) {
            dispatch({ type: 'add', image });
        }
    }, []);

    const clear = useCallback(() => dispatch({ type: 'clear' }), []);

    const select = useCallback((image: SelectableImage) => dispatch({ type: 'select', image }), []);

    const deselect = useCallback((image: SelectableImage) => dispatch({ type: 'deselect', image }), []);

    const selectAll = useCallback(() => { dispatch({ type: 'selectAll' }); }, []);

    const deselectAll = useCallback(() => { dispatch({ type: 'deselectAll' }); }, []);

    const markAsDownloaded = useCallback((image: SelectableImage) => { dispatch({ type: 'markAsDownloaded', image }); }, []);

    return <ImagesContext.Provider value={{
        images,
        filteredImages,
        add,
        clear,
        select,
        deselect,
        selectAll,
        deselectAll,
        markAsDownloaded
    }}>
        {props.children}
    </ImagesContext.Provider>;
};

export const useImages = () => {
    const context = useContext(ImagesContext);
    if (!context) {
        throw new Error("useImages must be used in an ImagesProvider.");
    }
    return context;
};
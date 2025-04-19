import { createContext } from "react";
import { Image } from "../Model/Image";
import { useCallback } from "react";
import { SelectableImage } from "../Model/SelectableImage";
import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";

type ImageAction =
    | { type: "add"; image: SelectableImage }
    | { type: "clear" }
    | { type: "select"; image: SelectableImage }
    | { type: "deselect"; image: SelectableImage };

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

        default:
            return state;
    };
};

type ImagesContextType = {
    images: SelectableImage[];
    add: (...images: SelectableImage[]) => void;
    clear: () => void;
    select: (image: SelectableImage) => void;
    deselect: (image: SelectableImage) => void;
    selectAll: () => void;
    deselectAll: () => void;
};

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export const ImagesProvider = (props: React.PropsWithChildren) => {
    const [images, dispatch] = useReducer(ImagesReducer, [
        { url: 'https://static1.e6ai.net/data/26/b2/26b2de016506e40bef844cbb62c32ba3.png', sourceIconUrl: 'icon.ico', fileName: 'fileName.jpg', widthInPx: 100, heightInPx: 100, selected: false, downloaded: false },
        { url: 'https://pbs.twimg.com/media/GnlxlWwWEAAgsFp?format=jpg&name=large', sourceIconUrl: 'icon.ico', fileName: 'fileName.jpg', widthInPx: 100, heightInPx: 100, selected: true, downloaded: false },
        { url: 'https://pbs.twimg.com/media/GnlxlWwWEAAgsFp?format=jpg&name=large', sourceIconUrl: 'icon.ico', fileName: 'fileName.jpg', widthInPx: 100, heightInPx: 100, selected: true, downloaded: true }
    ]);

    useEffect(() => { onLoad(); }, []);

    const onLoad = useCallback(async () => {

    }, []);

    const add = useCallback((...images: SelectableImage[]) => {
        for (const image of images) {
            dispatch({ type: 'add', image });
        }
    }, [dispatch]);

    const clear = useCallback(() => dispatch({ type: 'clear' }), [dispatch]);

    const select = useCallback((image: SelectableImage) => dispatch({ type: 'select', image }), [dispatch]);

    const deselect = useCallback((image: SelectableImage) => dispatch({ type: 'deselect', image }), [dispatch]);

    const selectAll = useCallback(() => {
        for (const image of images) {
            dispatch({ type: 'select', image });
        }
    }, [dispatch]);

    const deselectAll = useCallback(() => {
        for (const image of images) {
            dispatch({ type: 'deselect', image });
        }
    }, [dispatch]);

    return <ImagesContext.Provider value={{
        images,
        add,
        clear,
        select,
        deselect,
        selectAll,
        deselectAll
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
export interface Settings {
    FlyoutIsOpen: boolean;
    Mode: 'light' | 'dark' | 'system';
    PreviewSizeInPx: number;
    ShowSourceInformation: boolean;
    ShowSizeInformation: boolean;
    FilterMinWidth: boolean;
    FilterMaxWidth: boolean;
    MinWidthInPx: number
    MaxWidthInPx: number
    FilterMinHeight: boolean;
    FilterMaxHeight: boolean;
    MinHeightInPx: number
    MaxHeightInPx: number
}
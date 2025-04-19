import { Image } from "./Image";

export interface SelectableImage extends Image {
    selected: boolean;
    downloaded: boolean;
}
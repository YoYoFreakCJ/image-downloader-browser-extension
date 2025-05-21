import { Box, Typography } from "@mui/material";
import { SelectableImage } from "../../Model/SelectableImage";
import { useSettings } from "../../Contexts/SettingsContext";
import './SelectableImageContainer.scss';
import { useCallback } from "react";
import { useImages } from "../../Contexts/ImagesContext";
import SelectedImageCheckmark from "./SelectedImageCheckmark";
import SelectableImageContainerHeader from "./SelectableImageContainerHeader";
import { useState } from "react";
import SelectableImageContainerFooter from "./SelectableImageContainerFooter";

interface SelectableImageContainerProps {
    image: SelectableImage;
}

const SelectableImageContainer = (props: SelectableImageContainerProps) => {
    const { settings } = useSettings();
    const { select, deselect } = useImages();

    const onClick = useCallback(() => {
        if (props.image.downloaded === true) return;

        if (props.image.selected === true) {
            deselect(props.image);
        }
        else {
            select(props.image);
        }
    }, [props]);

    return <Box
        className='selectable-image-container'
        onClick={onClick}
        data-selected={props.image.selected}
        data-downloaded={props.image.downloaded}>
        <SelectableImageContainerHeader image={props.image} />
        <Box
            component='img'
            src={props.image.url}
            alt={props.image.fileName}
            width={settings.PreviewSizeInPx}
            height={settings.PreviewSizeInPx}
            sx={{
                objectFit: 'contain'
            }} />
        <SelectedImageCheckmark image={props.image} />
        <SelectableImageContainerFooter image={props.image} />
    </Box>
};

export default SelectableImageContainer;
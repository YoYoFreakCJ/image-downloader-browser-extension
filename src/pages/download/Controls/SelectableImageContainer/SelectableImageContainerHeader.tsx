import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tokens } from "@root/src/shared/theme/tokens";
import { SelectableImage } from "../../Model/SelectableImage";
import { useSettings } from "../../Contexts/SettingsContext";

interface SelectableImageContainerHeader {
    image: SelectableImage;
}

const SelectableImageContainerHeader = (props: SelectableImageContainerHeader) => {
    const { settings } = useSettings();

    return <Box
        className='selectable-image-container-header'
        sx={{ backgroundColor: tokens.colors.paleLightBlue }} display={settings.ShowSourceInformation ? 'flex' : 'none'} flexDirection='row' p={.5} gap='4px'>
        <Box
            component='img'
            src={props.image.sourceIconUrl}
            width='20px' />
        <Typography variant='caption'>{props.image.fileName}</Typography>
    </Box>;
};

export default SelectableImageContainerHeader;
import Box from "@mui/material/Box";
import { useSettings } from "../../Contexts/SettingsContext";
import { tokens } from "@root/src/shared/theme/tokens";
import { SelectableImage } from "../../Model/SelectableImage";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

interface SelectableImageContainerFooterProps {
    image: SelectableImage;
}

const SelectableImageContainerFooter = (props: SelectableImageContainerFooterProps) => {
    const { settings } = useSettings();
    const theme = useTheme();

    return <Box
        zIndex={1000}
        sx={{ backgroundColor: tokens.colors.lightGray }}
        display={settings.ShowSizeInformation ? 'flex' : 'none'} flexDirection='row' p={.5} gap='4px'
        borderTop={`1px solid ${theme.palette.divider}`}
    >
        <Typography variant='caption' color='text.secondary'
            lineHeight={1}>
            {props.image.widthInPx}px x {props.image.heightInPx}px
        </Typography>
    </Box>;
};

export default SelectableImageContainerFooter;
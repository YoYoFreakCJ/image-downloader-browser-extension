import { Box } from "@mui/material";
import { SelectableImage } from "../../Model/SelectableImage";
import './SelectableImageContainer.scss';

interface SelectedImageCheckmarkProps {
    image: SelectableImage;
}

const SelectedImageCheckmark = (props: SelectedImageCheckmarkProps) => {
    return <Box
        component='svg'
        className="selectable-image-checkmark"
        position='absolute'
        data-selected={props.image.selected}
        data-downloaded={props.image.downloaded}
        bottom={0} right={0} width={40} height={40}>
        <polygon points="0,40 40,0 40,40" />
        <line x1="22" y1="30" x2="27" y2="35" />
        <line x1="27" y1="35" x2="37" y2="25" />
    </Box>;
};

export default SelectedImageCheckmark;
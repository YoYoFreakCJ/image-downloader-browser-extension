import { Box, Typography } from "@mui/material";

interface SettingsGroupProps extends React.PropsWithChildren {
    title: string;
};

const SettingsGroup = (props: SettingsGroupProps) => {
    return <Box display='flex' flexDirection='column'>
        <Typography variant="overline">{props.title}</Typography>
        {props.children}
    </Box>
};

export default SettingsGroup;
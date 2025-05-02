import { Box, Typography } from "@mui/material";

interface SettingsGroupProps extends React.PropsWithChildren {
    title: string,
    width?: string
}

export const SettingsGroup = (props: SettingsGroupProps) => {
    return <Box px={3} py={0} textAlign='center' width={props.width}>
        <Typography variant="overline">{props.title}</Typography>
        <Box>
            {props.children}
        </Box>
    </Box>;
};
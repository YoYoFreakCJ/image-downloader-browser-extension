import { Box, CircularProgress, Typography } from "@mui/material";
import { tokens } from "@root/src/shared/theme/tokens";
import { useLoading } from "../../Contexts/LoadingContext";
import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
    const [isVisible, setIsVisible] = useState(false);

    const { activeLoadings } = useLoading();

    useEffect(() => setIsVisible(activeLoadings.length > 0), [activeLoadings]);

    return <Box position="absolute"
        top={0} left={0} right={0} bottom={0}
        display={`${isVisible ? "flex" : "none"}`} justifyContent="center" alignItems="center" zIndex={10_000}>

        <Box bgcolor="background.default" position="absolute" top={0} left={0} right={0} bottom={0} zIndex={-1}
            sx={{ opacity: 0.8 }} />

        <Box
            bgcolor={tokens.colors.lightGray} width="50%" p={4}
            border={`1px solid ${tokens.colors.white}`} borderRadius="20px"
            display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={4}>
            <CircularProgress />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                maxHeight="100px" overflow="auto">
                {activeLoadings.map(entry => <Typography textAlign="center" mt={2} color={tokens.colors.white}
                    marginTop={0} marginBottom={0}>
                    {entry.message}
                </Typography>)}
            </Box>
        </Box>
    </Box>;
};
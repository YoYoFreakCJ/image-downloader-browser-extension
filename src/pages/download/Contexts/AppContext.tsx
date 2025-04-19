import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";

type AppContextType = {
    showSuccessNotification: (message: string) => void
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = (props: React.PropsWithChildren) => {
    const [snackbarMessage, setSnackbarMessage] = useState<string>();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const showSuccessNotification = useCallback((message: string) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    }, [snackbarMessage])

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason,) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return <AppContext.Provider value={{
        showSuccessNotification
    }}>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            message={snackbarMessage}
            onClose={handleSnackbarClose}>
            <Alert severity="success" variant="filled" onClose={handleSnackbarClose}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
        {props.children}
    </AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp muss innerhalb eines AppProviders verwendet werden");
    }
    return context;
};
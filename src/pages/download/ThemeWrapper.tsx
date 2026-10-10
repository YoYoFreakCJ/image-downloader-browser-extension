import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSettings } from "./Contexts/SettingsContext";
import { tokens } from "@root/src/shared/theme/tokens";

const ThemeWrapper = ({ children }) => {
    const { settings } = useSettings(); // Mode wird erst jetzt aus dem Context geholt

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: settings.Mode === 'dark' ? 'dark' : 'light',
                    ...(settings.Mode === "dark"
                        ? {
                            primary: { main: tokens.colors.lightBlue /*"#bb86fc" /*'lightBlue'*/ },
                            background: { paper: "#121212", default: "#1E1E1E" },
                        }
                        : {}),
                },
            }),
        [settings]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
import Container from './Controls/Container/Container';
import { SettingsProvider } from './Contexts/SettingsContext';
import { AppProvider } from './Contexts/AppContext';
import { ImagesProvider } from './Contexts/ImagesContext';
import ThemeWrapper from './ThemeWrapper';
import { LoadingProvider } from './Contexts/LoadingContext';

const App = () => {
    return <AppProvider>
        <LoadingProvider>
            <SettingsProvider>
                <ThemeWrapper>
                    <ImagesProvider>
                        <Container />
                    </ImagesProvider>
                </ThemeWrapper>
            </SettingsProvider>
        </LoadingProvider>
    </AppProvider>;
};

export default App;
import Container from './Controls/Container/Container';
import { SettingsProvider } from './Contexts/SettingsContext';
import { AppProvider } from './Contexts/AppContext';
import { ImagesProvider } from './Contexts/ImagesContext';
import ThemeWrapper from './ThemeWrapper';

const App = () => {
    return <AppProvider>
        <SettingsProvider>
            <ThemeWrapper>
                <ImagesProvider>
                    <Container />
                </ImagesProvider>
            </ThemeWrapper>
        </SettingsProvider>
    </AppProvider>;
};

export default App;
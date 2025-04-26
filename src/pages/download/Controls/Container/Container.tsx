import Box from '@mui/material/Box';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';

const Container = () => {
  return <Box display="flex" flexDirection="row" height="100vh">
    <SettingsPanel />
    <Box display="flex" flexDirection="column" height="100vh" flexGrow={1}>
      <Header />
      <Box component="main" flex="1 1 auto" overflow="auto">
        <Content />
      </Box>
      <Footer />
    </Box>
  </Box>;
};

export default Container;
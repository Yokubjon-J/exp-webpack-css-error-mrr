import App from './App.jsx';
import ReactDOMClient from 'react-dom/client';
import createEmotionCache from './createEmotionCache.js';
import { CacheProvider } from '@emotion/react';
// import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOMClient.hydrateRoot(
    document.getElementById('root'),
    
    <CacheProvider value={createEmotionCache()}>
        <ThemeProvider theme={theme}>
            {/* <CssBaseline /> this is causing some styling conflicts */}
            <App />
        </ThemeProvider>
    </CacheProvider>
);
import App from './App.jsx';
import ReactDOMClient from 'react-dom/client';
import createEmotionCache from './createEmotionCache.js';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOMClient.hydrateRoot(
    document.getElementById('root'),
    
    <CacheProvider value={createEmotionCache()}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </CacheProvider>
);
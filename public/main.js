import App from './App.jsx';
import ReactDOMClient from 'react-dom/client';
import createEmotionCache from './createEmotionCache.js';
import { CacheProvider } from '@emotion/react'

ReactDOMClient.hydrateRoot(
    document.getElementById('root'),

    <CacheProvider value={createEmotionCache()}>
        <App />
    </CacheProvider>
);
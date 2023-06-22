import App from './App.jsx';
import ReactDOMClient from 'react-dom/client';

ReactDOMClient.hydrateRoot(
    document.getElementById('root'),

    // <CacheProvider value={cache}>
        <App />
    // </CacheProvider>
);
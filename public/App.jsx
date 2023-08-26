// import createEmotionCache from './createEmotionCache.js';
import EditorLazy from './EditorLazy.jsx';
// import { CacheProvider } from '@emotion/react'

export default function MyApp() {
    // const cache = createEmotionCache();

    return (
        // <CacheProvider value={cache}>
            <EditorLazy/>
        // </CacheProvider>
    );
}
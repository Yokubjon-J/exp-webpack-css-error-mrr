import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import devBundle from './devBundle.js';
import App from './public/Editor.jsx';
import path from 'path';
import express from 'express';
import cors from 'cors';
import createEmotionCache from './public/createEmotionCache.js';

const app = express();
devBundle.compile(app);
app.use(cors());
app.use('/dist', express.static(path.join(process.cwd(), 'dist')));
app.get('*', (req, res) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
    let element = (
        <CacheProvider value={cache}>
            <App />
        </CacheProvider>
    );
    const emotionChunks = extractCriticalToChunks(element);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);
    res.status(200)
    .header('Content-Type', 'text/html')
    .send(
        `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>MERN Chat</title>
            </head>
            <body>
                <div id="root">${element}</div>
                ${emotionCss}
                <script defer type="text/javascript" src="./dist/bundle.js"></script>
            </body>
        </html>`.trim()
    );
});

const port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
    if (err) {
        console.log("you got error");
    }
    console.info('Server started on port: ', port)
});

import { CacheProvider } from '@emotion/react';
import ReactDOMServer from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './public/createEmotionCache.js';
// import CssBaseline from '@mui/material/CssBaseline';//this is causing some styling conflicts
import { ThemeProvider } from '@mui/material/styles';
import theme from './public/theme.js';
import devBundle from './devBundle.js';
import App from './public/App.jsx';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
devBundle.compile(app);
app.use(cors());
app.use('/dist', express.static(path.join(process.cwd(), 'dist')));
app.get('*', (req, res) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
    let element = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </CacheProvider>
    );
    const emotionChunks = extractCriticalToChunks(element);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);
    console.log(emotionCss)
    res.status(200)
    .header('Content-Type', 'text/html')
    .send(
        `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>MERN Chat</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
                />
                ${emotionCss}
            </head>
            <body>
                <div id="root">${element}</div>
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

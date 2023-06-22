import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import devBundle from './devBundle.js';
import App from './public/App.jsx';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
devBundle.compile(app);
app.use(cors());

const key = 'custom'
const cache = createCache({ key })

app.use('/dist', express.static(path.join(process.cwd(), 'dist')));
console.log(path.join(process.cwd(), 'dist'))

app.get('*', (req, res) => {
  const html = renderToString(<App />);
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
    if (err) {
        console.log("you got error");
    }
    console.info('Server started on port: ', port)
});

export default (markup, css) => {
    return markup !== '' &&
        `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>MERN Chat</title>
            </head>
            <body>
                <div id="root">${markup}</div>
                ${css}
                <script defer type="text/javascript" src="./dist/bundle.js"></script>
            </body>
        </html>`.trim();
}
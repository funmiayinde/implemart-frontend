
const handler = require('serve-handler');
const http = require('http');
const path = require('path');


const server = http.createServer((req, res) => {
    console.log('Path : ', path.join(__dirname, 'build'));

    return handler(req, res, {
        public: path.join(__dirname, 'build'),
        cleanUrls: true,
        rewrites: [
            { source: '/**', destination: '/index.html' },
        ],
        directoryListing: false,
    });
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Running at http://localhost: ' + port);
});

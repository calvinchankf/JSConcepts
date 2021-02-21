const http = require('http');
const PORT = process.env.PORT || 5000;

function geneateNumberInRed() {
    const x = Math.floor(Math.random() * 256);
    return (`event: red\ndata:${x}\n\n\n`);
}
function geneateNumberInGreen() {
    const x = Math.floor(Math.random() * 256);
    return (`event: green\ndata:${x}\n\n\n`);
}
function geneateNumberInBlue() {
    const x = Math.floor(Math.random() * 256);
    return (`event: blue\ndata:${x}\n\n\n`);
}

function getEvents(request, response) {

    response.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    });

    const interval = setInterval(() => {
        const msgType = Math.floor(Math.random() * 3);
        switch (msgType) {
        case 0:
            response.write(geneateNumberInRed());
            break;
        case 1:
            response.write(geneateNumberInGreen());
            break;
        case 2:
            response.write(geneateNumberInBlue()); 
            break;
        }
    }, 2000);

    request.on('close', () => {
        clearInterval(interval);
        response.end();
        console.log('Stopped sending events as client closed the connection.');
    });
}

http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');

    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }

    switch (request.url) {
        case '/get_events':
            getEvents(request, response);
            break;
        default:
            // Unknown URL
            response.writeHead(404);
            response.end();
    }
}).listen(PORT);

console.log(`hello-world-to-sse server running on port ${PORT}`);

import http2 from 'http2'
import fs from 'fs'

const server = http2.createSecureServer({key: fs.readFileSync('./keys/server.key'),cert: fs.readFileSync('./keys/server.crt')}, (req, res) => {
        console.log(req.url)
        res.writeHead(200);
        res.end('Hello World!');
    })

server.listen(8080, () => {
    console.log('Server running on port 8080');
});


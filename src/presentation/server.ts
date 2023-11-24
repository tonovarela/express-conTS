
import express, { Router } from 'express';
import path from 'path';

import compression from 'compression';
import { prisma } from '../data/postgres/index';

interface PropsServer {
    port: number;
    public_path: string,
    routes: Router;
}
export class Server {
    private app = express();
    constructor(private readonly options: PropsServer) { }
    async start() {
        
        const { port, public_path, routes } = this.options;
        //Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(routes);
        this.app.use(compression())
        //PUBLIC
        this.app.use(express.static(public_path));
        //SPA
        this.app.get("*", (req, res) => {
            const indexPath = path.join(__dirname + `../../../${public_path}/index.html`);
            res.sendFile(indexPath);
            return;
        });
        this.app.listen(port, async() => {
            await prisma.$connect();            
            console.log(`Server running on port ${port}`);
        });
    }

}
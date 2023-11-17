
import express from 'express';
export class Server {
    private app = express();

    async start(port:number,publicFolder:string) {

        //Middleware
        this.app.use(express.static(publicFolder));       
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

}
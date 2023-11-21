
import express from 'express';
import path from 'path';

interface PropsServer  {
    port: number;
    public_path:string
}
export class Server {
    private app = express();
    constructor(private readonly  options:PropsServer){}
    async start() {
        const {port,public_path} = this.options;
        //Middleware
        this.app.use(express.static(public_path));
        this.app.get("*", (req, res) => {
         const indexPath = path.join(__dirname+`../../../${public_path}/index.html`);
         res.sendFile(indexPath);
         return;
        });
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

}
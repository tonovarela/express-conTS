import { envs } from "./config/config";
import { Server } from "./presentation/server";


(()=>{
    main();

})();

async function main(){    
    const server = new Server({port:envs.PORT,public_path:envs.PUBLIC_PATH});
    await server.start();

}
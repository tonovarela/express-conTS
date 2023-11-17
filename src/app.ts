import { envs } from "./config/config";
import { Server } from "./presentation/server";


(()=>{
    main();

})();

async function main(){    
    const server = new Server();
    await server.start(envs.PORT,'public');

}
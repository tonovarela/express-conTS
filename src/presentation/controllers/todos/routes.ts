import { Router } from "express";
import { TodosController } from "./todos.controller";


export class TodosRoutes {

    static get routes(): Router {
        const router = Router();
        const todosController = new TodosController();


        router.get("/", todosController.getTodos);
        router.get("/:id",todosController.getTodoById);
        router.post("/", todosController.createTodo);
        router.put("/:id", todosController.updateTodo);
        router.delete("/:id", todosController.deleteTodo);
        return router;
    }

    

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosRoutes = void 0;
const express_1 = require("express");
const todos_controller_1 = require("./todos.controller");
class TodosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todosController = new todos_controller_1.TodosController();
        router.get("/", todosController.getTodos);
        router.get("/:id", todosController.getTodoById);
        router.post("/", todosController.createTodo);
        router.put("/:id", todosController.updateTodo);
        router.delete("/:id", todosController.deleteTodo);
        return router;
    }
}
exports.TodosRoutes = TodosRoutes;

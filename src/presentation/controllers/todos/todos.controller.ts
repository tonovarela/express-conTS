import { Request, Response } from 'express';
const todos = [{ id: 1, action: "Tender la cama", completedAt: new Date() },
{ id: 2, action: "Comprar pan", completedAt: new Date() },
{ id: 3, action: "Abrir la tienda", completedAt: new Date() }];
export class TodosController {


    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const todosRes = todos.find(t => t.id ===id)
        if (isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        if (todosRes === undefined) {
            return res.status(404).json({
                error: "Todo No encontrado"
            })
        }
        return res.json(todosRes);
    }

    public createTodo = (req: Request, res: Response) => {
        const { action } = req.body;
        if (!action) {
            return res.status(400).json({
                error: "Debes ingresar una accion"
            })
        }
        const newTodo = {
            id: todos.length + 1,
            action,
            completedAt: new Date(),
        }
        todos.push(newTodo);
        return res.status(201).json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const todosRes = todos.find(t => t.id === id)
        if (isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        if (todosRes === undefined) {
            return res.status(404).json({
                error: "Todo No encontrado"
            })
        }
        const { action, completedAt } = req.body;
        // if (!action) {
        //     return res.status(400).json({
        //         error: "Debes ingresar una accion"
        //     })
        // }
        todosRes.action = action || todosRes.action;
        res.json("Todo updated")

    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const todosRes = todos.find(t => t.id === id)
        if (isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }
        if (todosRes === undefined) {
            return res.status(404).json({
                error: "Todo No encontrado"
            })
        }    
        todos.splice(todos.indexOf(todosRes), 1);
        return res.status(200).json({
            message: "Todo eliminado",
            todo:todosRes
        })


    }

}
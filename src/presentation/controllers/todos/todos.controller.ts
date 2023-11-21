import { Request, Response } from 'express';
const todos = [{ id: 1, action: "Tender la cama" },
{ id: 2, action: "Comprar pan" },
{ id: 3, action: "Abrir la tienda" }];
export class TodosController {


    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = Number(req.params.id);
        const todosRes = todos.find(t => t.id == id)
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

}
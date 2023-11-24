import { Request, Response } from 'express';
import { CreateTodoDTO, UpdateTodoDTO } from '../../../domain/dtos/todos';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../../domain';



export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) { }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository).execute().then((todos) => {            
            res.status(200).json(todos);
        });
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "El id debe ser un número" });
        }
        new GetTodo(this.todoRepository).execute(id).then((todo) => {
            if (!todo) throw new Error("Todo no encontrado");
            return res.json(todo);
        }).catch((error) => {
            return res.status(404).json({ error: error.message });
        });
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
        if (error) { return res.status(400).json({ error }); }
        new CreateTodo(this.todoRepository).execute(createTodoDTO!).then(todo => {
            return res.status(201).json(todo);
        }).catch((error) => {
            return res.status(400).json(error);
        })

    }



    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body });
        if (error) { return res.status(400).json({ error }); }
        new UpdateTodo(this.todoRepository).execute(id, updateTodoDTO!).then(todo => {
            return res.status(200).json(todo);
        }).catch((error) => {
            return res.status(400).json(error);
        });

    }




    public deleteTodo =  (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }
        new DeleteTodo(this.todoRepository).execute(id)
        .then((todo) => res.status(200).json(todo)).catch((error) => {
            return res.status(404).json({ error: error.message });
        });
    }


}


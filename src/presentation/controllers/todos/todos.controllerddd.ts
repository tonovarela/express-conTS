import { Request, Response } from 'express';
import { CreateTodoDTO, UpdateTodoDTO } from '../../../domain/dtos/todos';
import { TodoRepository } from '../../../domain';



export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) {}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "El id debe ser un numero" });
        }
        try {
            const todo = await this.todoRepository.findById(id);

            return res.json(todo);
        } catch (error) {
            return res.status(404).json({ error });
        }

    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
        if (error) { return res.status(400).json({ error }); }
        try {
            const newTodo = await this.todoRepository.create(createTodoDTO!);
            return res.status(201).json(newTodo);
        } catch (error) {
            return res.status(400).json(error);
        }

    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body });
        if (error) { return res.status(400).json({ error }); }        
        try {
            const updatedTodo = await this.todoRepository.update(id, updateTodoDTO!);
            res.json(updatedTodo)
        } catch (error) {
            return res.status(400).json(error);
        }

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }        
        try {
            const todo=await this.todoRepository.deleteById(id);
            return res.status(200).json({
                message: "Todo eliminado",
                todo
            })
        } catch (error) {
            return res.status(400).json(error);
        }


    }

}
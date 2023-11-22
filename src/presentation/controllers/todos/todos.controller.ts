import { Request, Response } from 'express';
import { prisma } from '../../../data/postgres';
import { CreateTodoDTO, UpdateTodoDTO } from '../../../domain/dtos/todos';



export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "El id debe ser un numero" });
        }
        const todosRes = await prisma.todo.findMany({ where: { id } });
        if (todosRes.length == 0) {
            return res.status(404).json({ error: "Todo No encontrado" });
        }
        return res.json(todosRes);
    }
    public createTodo = async (req: Request, res: Response) => {
        const [error,createTodoDTO] = CreateTodoDTO.create(req.body);
        if (error) { return res.status(400).json({ error});}                
        const newTodo = await prisma.todo.create({ data:createTodoDTO!  });
        return res.status(201).json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const [error, updateTodoDTO] = UpdateTodoDTO.create({...req.body});

        if (error) { return res.status(400).json({ error }); }

        const todo = await prisma.todo.findFirst({ where: { id } });
        if (!todo) {
            return res.status(404).json({
                error: "Todo no encontrado"
            })
        }
        
        const updatedTodo = await prisma.todo.update({ where: { id }, data: updateTodoDTO!.values });

        if (updatedTodo == null) {
            return res.status(404).json({
                error: "Todo No encontrado"
            })
        }
        res.json(updatedTodo)

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        const todo = await prisma.todo.findFirst({ where: { id } });
        if (!todo) {
            return res.status(404).json({
                error: "Todo no encontrado"
            })
        }

        const todoDeleted = await prisma.todo.delete({ where: { id } });
        if (!todoDeleted) {
            return res.status(400).json({
                error: "Todo No encontrado"
            })
        }
        return res.status(200).json({
            message: "Todo eliminado",
            todo: todoDeleted
        })


    }

}
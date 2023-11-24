import { CreateTodoDTO, UpdateTodoDTO } from "../dtos/todos";
import { TodoEntity } from "../entity/todo.entity";

export abstract class TodoRepository {
    abstract getAll(): Promise<TodoEntity[]>;
    abstract create(todo: CreateTodoDTO): Promise<TodoEntity>;
    abstract update(id: number, todo: UpdateTodoDTO): Promise<TodoEntity>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;
}
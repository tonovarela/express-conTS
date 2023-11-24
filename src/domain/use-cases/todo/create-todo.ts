
import { CreateTodoDTO } from "../../dtos/todos";
import { TodoEntity } from "../../entity/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";



export interface CreateTodoUseCase {
    execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}


export class CreateTodo implements CreateTodoUseCase {

    constructor(private todoRepository: TodoRepository){}
    execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        return this.todoRepository.create(dto);
    }
}





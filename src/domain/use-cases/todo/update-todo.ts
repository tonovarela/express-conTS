
import { UpdateTodoDTO } from "../../dtos/todos";
import { TodoEntity } from "../../entity/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";



export interface UpdateTodoUseCase {
    execute(id:number,dto: UpdateTodoDTO): Promise<TodoEntity>;
}


export class UpdateTodo implements UpdateTodoUseCase {

    constructor(private todoRepository: TodoRepository) { }
    async execute(id:number,dto: UpdateTodoDTO): Promise<TodoEntity> {
        return await this.todoRepository.update(id,dto);
    }
}



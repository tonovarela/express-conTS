
import { TodoEntity } from "../../entity/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetTodoUseCase {
    execute(id:number): Promise<TodoEntity | undefined>;
}


export class GetTodo implements GetTodoUseCase {

    constructor(private todoRepository: TodoRepository){}
    execute(id:number): Promise<TodoEntity> {
        return this.todoRepository.findById(id);
    }
}

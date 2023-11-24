import { CreateTodoDTO, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDTO } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(private todoDataSource: TodoDataSource) { }
    getAll(): Promise<TodoEntity[]> {
        return this.todoDataSource.getAll();
    }
    create(todo: CreateTodoDTO): Promise<TodoEntity> {
        return this.todoDataSource.create(todo);
    }
    update(id: number, todo: UpdateTodoDTO): Promise<TodoEntity> {
        return this.todoDataSource.update(id, todo);
    }
    findById(id: number): Promise<TodoEntity> {
        return this.todoDataSource.findById(id);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.todoDataSource.deleteById(id);
    }
}

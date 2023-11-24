import { prisma } from "../../data/postgres";
import { CreateTodoDTO, TodoDataSource, TodoEntity, UpdateTodoDTO } from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(t => TodoEntity.fromObject(t))
    }
    async create(data: CreateTodoDTO): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({ data })
        return TodoEntity.fromObject(newTodo)
    }
    async update(id: number, todo: UpdateTodoDTO): Promise<TodoEntity> {                
        await prisma.todo.findFirst({ where: { id } });
        const updatedTodo = await prisma.todo.update({ where: { id }, data: todo!.values });
        return TodoEntity.fromObject(updatedTodo)
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({ where: { id } });
        if (!todo) {
            throw new Error("Todo not found")
        }
        return TodoEntity.fromObject(todo);

    }
    async deleteById(id: number): Promise<TodoEntity> {  
        const todo =await this.findById(id)      
        await prisma.todo.delete({ where: { id } });
        return todo!;
    }

}
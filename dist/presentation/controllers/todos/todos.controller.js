"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../../data/postgres");
const todos_1 = require("../../../domain/dtos/todos");
class TodosController {
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgres_1.prisma.todo.findMany();
            return res.json(todos);
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "El id debe ser un numero" });
            }
            const todosRes = yield postgres_1.prisma.todo.findMany({ where: { id } });
            if (todosRes.length == 0) {
                return res.status(404).json({ error: "Todo No encontrado" });
            }
            return res.json(todosRes);
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createTodoDTO] = todos_1.CreateTodoDTO.create(req.body);
            if (error) {
                return res.status(400).json({ error });
            }
            const newTodo = yield postgres_1.prisma.todo.create({ data: createTodoDTO });
            return res.status(201).json(newTodo);
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const [error, updateTodoDTO] = todos_1.UpdateTodoDTO.create(Object.assign({}, req.body));
            if (error) {
                return res.status(400).json({ error });
            }
            const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
            if (!todo) {
                return res.status(404).json({
                    error: "Todo no encontrado"
                });
            }
            const updatedTodo = yield postgres_1.prisma.todo.update({ where: { id }, data: updateTodoDTO.values });
            if (updatedTodo == null) {
                return res.status(404).json({
                    error: "Todo No encontrado"
                });
            }
            res.json(updatedTodo);
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    error: "El id debe ser un numero"
                });
            }
            const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
            if (!todo) {
                return res.status(404).json({
                    error: "Todo no encontrado"
                });
            }
            const todoDeleted = yield postgres_1.prisma.todo.delete({ where: { id } });
            if (!todoDeleted) {
                return res.status(400).json({
                    error: "Todo No encontrado"
                });
            }
            return res.status(200).json({
                message: "Todo eliminado",
                todo: todoDeleted
            });
        });
    }
}
exports.TodosController = TodosController;

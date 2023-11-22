"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDTO = void 0;
class CreateTodoDTO {
    constructor(action) {
        this.action = action;
    }
    static create(props) {
        const { action } = props;
        if (!action)
            return ["action es requerido", undefined];
        return [undefined, new CreateTodoDTO(action)];
    }
}
exports.CreateTodoDTO = CreateTodoDTO;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDTO = void 0;
class UpdateTodoDTO {
    constructor(id, action, completedAt) {
        this.id = id;
        this.action = action;
        this.completedAt = completedAt;
    }
    static create(props) {
        const { id, action, completedAt } = props;
        let newCompletedAt = completedAt;
        if (!id || isNaN(Number(id)))
            return ["id es requerido", undefined];
        if (!action)
            return ["action es requerido", undefined];
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === "Invalid Date")
                return ["completedAt no válido", undefined];
        }
        return [undefined, new UpdateTodoDTO(id, action, newCompletedAt)];
    }
    get values() {
        const returnObj = {};
        if (this.action)
            returnObj.action = this.action;
        if (this.completedAt)
            returnObj.completedAt = this.completedAt;
        return returnObj;
    }
}
exports.UpdateTodoDTO = UpdateTodoDTO;

export class UpdateTodoDTO {

    private constructor(
        public readonly id: number,
        public readonly action: string,
        public completedAt?: Date) { }
    static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {

        const { id,action, completedAt } = props;
        let newCompletedAt = completedAt;

        if (!id || isNaN(Number(id))) return ["id es requerido", undefined];
        if (!action) return ["action es requerido", undefined];
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === "Invalid Date") return ["completedAt no válido", undefined];

        }
        return [undefined, new UpdateTodoDTO(id,action, newCompletedAt)];
    }


    get values() {
        const returnObj: any = {};
        if (this.action) returnObj.action = this.action;
        if (this.completedAt) returnObj.completedAt = this.completedAt;
        return returnObj;
    }
}
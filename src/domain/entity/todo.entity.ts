

export class TodoEntity {
    constructor(
        public id: number,
        public action: string,
        public completedAt?: Date | null
    ) { }

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    public static fromObject(object: { [key: string]: any }): TodoEntity {
        let entity = new TodoEntity(
            object.id,
            object.action,
        );
        let newCompletedAt;
        if (object.completedAt) {
            newCompletedAt = new Date(object.completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                newCompletedAt = null;
            }
            entity.completedAt = newCompletedAt;
        }
        return entity;

    }




}


export class CreateTodoDTO {
    private constructor(public readonly action:string){}
    
    
    static create(props: {[key:string]:any}): [string?, CreateTodoDTO? ] {

        const { action } = props;
        if (!action) return ["action es requerido",undefined];            
        return [undefined,new CreateTodoDTO(action)];

    }
}

export default class ObjectHandler{ //Handler for storing and reusing game objects

    protected ctx: CanvasRenderingContext2D;
    protected pool: [];
    protected objects: [];

    constructor(c: CanvasRenderingContext2D) {
        this.ctx = c;
    }

    addToPool(object: never): void{
        const i = this.objects.indexOf(object);
        if(i !== -1){
            this.objects.splice(i, 1);
            this.pool.push(object)
        }
    }

    addToObjects(data: any): void{
        let object = this.pool.pop();
        //update old data
        this.objects.push(object)
    }

    emptyPool(): void{
        this.pool = []
    }

    emptyObjects(): void{
        this.objects = []
    }

    getObject(): []{
        return this.objects
    }
}
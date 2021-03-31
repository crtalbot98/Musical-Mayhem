import Triangle from "./triangle.js";
import triangle from "./triangle.js";
//Fix issue with objects not being added to object arr

export default class ObjectHandler{ //Handler for storing and reusing game objects

    protected ctx: CanvasRenderingContext2D;
    protected c: HTMLCanvasElement;
    protected pool: any[]; //Array of unused objects
    protected objects: any[]; //Array of object currently on screen

    constructor(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement) {
        this.ctx = ctx;
        this.c = c;
        this.pool = this.fillPool();
        this. objects = []
    }

    public addToPool(object: any): void{ //Remove an item from object array and add to the pool
        const i = this.objects.indexOf(object);
        if(i !== -1){
            this.objects.splice(i, 1);
            this.pool.push(object)
        }
    }

    public addToObjects(): void{ //Remove from the pool and add to the object array
        if(this.pool.length < 1) return;
        let obj = this.pool.pop();

        obj.movementHandler.resetPos();
        obj.generateRandomColor();
        obj.setOnscreen();

        this.objects.push(obj)
    }

    public emptyPool(): void{ //Empty the pool
        this.pool = []
    }

    public emptyObjects(): void{ // Empty the object array
        this.objects = []
    }

    public getObjects(): any[]{ // Get all the object array
        return this.objects
    }

    private fillPool(): any[]{ // Fill pool with the initial objects
        let arr = [];
        for(let i = 0; i <= 10; i++){
            arr.push(new triangle(this.c))
        }
        return arr
    }

    public updateByFrame(): void{
        for(let i = 0; i < this.getObjects().length; i++){ // Update object handler based on object positions / state
            if(!this.getObjects()[i].getState()){
                this.addToPool(this.getObjects()[i])
            }
            else{
                this.getObjects()[i].updatePos()
            }
        }
    }

    public createByFrame(){ // create each object every frame
        for(let i = 0; i < this.getObjects().length; i++){
            this.getObjects()[i].create(this.ctx);
        }
    }
}
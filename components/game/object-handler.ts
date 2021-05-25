import square from "./square.js";
import StateHandler from "../state-handler.js";

export default class ObjectHandler{ //Handler for storing and reusing game objects

    private ctx: CanvasRenderingContext2D;
    private c: HTMLCanvasElement;
    private stateHandler: StateHandler;
    private pool: any[]; //Array of unused objects
    private objects: any[]; //Array of object currently on screen

    constructor(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement, state: StateHandler) {
        this.stateHandler = state;
        this.ctx = ctx;
        this.c = c;
        this.pool = this.fillPool();
        this.objects = [];
    }

    public addToPool(object: any): void{ //Remove an item from object array and add to the pool
        const i = this.objects.indexOf(object);
        if(i !== -1){
            this.objects.splice(i, 1);
            this.pool.push(object);
        }
    }

    public addToObjects(): void{ //Remove from the pool and add to the object array
        if(this.pool.length < 1) return;
        let obj = this.pool.pop();

        obj.movementHandler.resetBounds();
        obj.generateRandomColor();
        obj.setOnscreen();
        obj.updateSize();

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
            arr.push(new square(this.c, this.stateHandler))
        }
        return arr
    }

    public updateByFrame(): void{
        for(let i = 0; i < this.getObjects().length; i++){ // Update object handler based on object positions / state
            if(!this.getObjects()[i].getState()){
                this.addToPool(this.getObjects()[i]);
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
import square from "./square.js";
import StateHandler from "../state-handler.js";
import {randBetweenTwoVal} from "../helpers.js";

export default class ObjectHandler{ //Handler for storing and reusing game objects

    private _ctx: CanvasRenderingContext2D;
    private _c: HTMLCanvasElement;
    private _stateHandler: StateHandler;
    private _pool: any[]; //Array of unused objects
    private _objects: any[]; //Array of object currently on screen

    constructor(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement, state: StateHandler) {
        this._stateHandler = state;
        this._ctx = ctx;
        this._c = c;
        this._pool = this.fillPool();
        this._objects = [];
    }

    public addToPool(object: any): void{ //Remove an item from object array and add to the pool
        const i = this._objects.indexOf(object);
        if(i !== -1){
            this._objects.splice(i, 1);
            this._pool.push(object);
        }
    }

    public addToObjects(): void{ //Remove from the pool and add to the object array
        if(this._pool.length < 1) return;
        let obj = this._pool.pop();

        obj._movementHandler.resetBounds();
        obj.generateRandomColor();
        obj._onscreen = true;
        obj._size = {w: randBetweenTwoVal(50, this._c.offsetWidth*0.2), h: randBetweenTwoVal(50, this._c.offsetHeight*0.15)};

        this._objects.push(obj)
    }

    public emptyPool(): void{ //Empty the pool
        this._pool = []
    }

    public emptyObjects(): void{ // Empty the object array
        this._objects = []
    }

    private fillPool(): any[]{ // Fill pool with the initial objects
        let arr = [];
        for(let i = 0; i <= 10; i++){
            arr.push(new square(this._c, this._stateHandler))
        }
        return arr
    }

    public updateByFrame(): void{
        for(let i = 0; i < this._objects.length; i++){ // Update object handler based on object positions / state
            if(!this._objects[i].onScreen){
                this.addToPool(this._objects[i]);
            }
            else{
                this._objects[i].updatePos()
            }
        }
    }

    public createByFrame(){ // create each object every frame
        for(let i = 0; i < this._objects.length; i++){
            this._objects[i].create(this._ctx);
        }
    }

    public get objects(): any[]{ // Get all the object array
        return this._objects
    }
}
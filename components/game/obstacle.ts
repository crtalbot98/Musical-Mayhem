import CollisionHandler from "./collision-handler.js";
import MovementHandler from "./movement-handler.js";
import {Size, Bounds} from "./types.js";

export default class Obstacle{

    protected movementHandler: MovementHandler;
    protected collisionHandler: CollisionHandler;
    protected c: HTMLCanvasElement;
    protected size: Size;
    protected onScreen: boolean;
    protected color: string;

    constructor(c: HTMLCanvasElement, size: Size) {
        this.c = c;
        this.size = size;
        this.movementHandler = new MovementHandler(c, this.size);
        this.collisionHandler = new CollisionHandler(this.c);
        this.onScreen = true;
        this.color = this.generateRandomColor();
    }

    public updatePos(): void{
        if(this.collisionHandler.withinCanvas(this.movementHandler.getBounds())){
            this.movementHandler.updateYPos();
            this.movementHandler.updateXPos()
        }
        else{
            this.onScreen = false
        }
    }

    public generateRandomColor(){
        let r = Math.ceil(Math.random()*255);
        return `rgb(${r}, ${r}, ${r})`
    }

    public getState(): boolean{
        return this.onScreen
    }

    public setOnscreen(){
        this.onScreen = true
    }

    public getSize(): Size{
        return this.size
    }
}
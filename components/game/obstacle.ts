import CollisionHandler from "./collision-handler.js";
import MovementHandler from "./movement-handler.js";
import {Size} from "../types";
import StateHandler from "../state-handler.js";
import {randBetweenTwoVal} from "../helpers.js";

export default class Obstacle{

    protected movementHandler: MovementHandler;
    protected collisionHandler: CollisionHandler;
    protected c: HTMLCanvasElement;
    protected size: Size;
    protected onScreen: boolean;
    protected color: string;
    protected ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement, state: StateHandler) {
        this.c = c;
        this.ctx = c.getContext('2d');
        this.size = {w: randBetweenTwoVal(50, this.c.offsetHeight/8), h: randBetweenTwoVal(50, this.c.offsetHeight/8)};
        this.movementHandler = new MovementHandler(c, this.size, state);
        this.collisionHandler = new CollisionHandler(this.c);
        this.onScreen = true;
        this.color = this.generateRandomColor()
    }

    public updatePos(): void{
        if(this.collisionHandler.withinCanvas(this.movementHandler.getBounds())){
            this.movementHandler.updateYPos();
            this.movementHandler.updateXPos();
        }
        else{
            this.onScreen = false
        }
    }

    public generateRandomColor(){
        let r = Math.floor(Math.random()*255);
        return `rgb(${r}, ${r}, ${r})`
    }

    public updateSize(): void{
        this.size = {w: randBetweenTwoVal(50, this.c.offsetWidth*0.2), h: randBetweenTwoVal(50, this.c.offsetHeight*0.15)}
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
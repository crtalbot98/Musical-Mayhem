import CollisionHandler from "./collision-handler.js";
import MovementHandler from "./movement-handler.js";
import {Size} from "../types";
import StateHandler from "../state-handler.js";
import {randBetweenTwoVal} from "../helpers.js";

export default class Obstacle{

    protected _movementHandler: MovementHandler;
    protected _collisionHandler: CollisionHandler;
    protected _c: HTMLCanvasElement;
    protected _size: Size;
    protected _onScreen: boolean;
    protected _color: string;
    protected _ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement, state: StateHandler) {
        this._c = c;
        this._ctx = c.getContext('2d');
        this._size = {w: randBetweenTwoVal(50, this._c.offsetHeight/8), h: randBetweenTwoVal(50, this._c.offsetHeight/8)};
        this._movementHandler = new MovementHandler(c, this._size, state);
        this._collisionHandler = new CollisionHandler(this._c);
        this._onScreen = true;
        this._color = this.generateRandomColor()
    }

    public updatePos(): void{
        if(this._collisionHandler.withinCanvas(this._movementHandler.bounds)){
            this._movementHandler.updateYPos();
            this._movementHandler.updateXPos();
        }
        else{
            this._onScreen = false
        }
    }

    public generateRandomColor(){
        let r = Math.floor(Math.random()*255);
        return `rgb(${r}, ${r}, ${r})`
    }

    public set size(s: Size){
        this._size = s
    }

    public get size(): Size{
        return this._size
    }

    public get onScreen(): boolean{
        return this._onScreen
    }

    public set onScreen(visible: boolean){
        this._onScreen = visible
    }
}
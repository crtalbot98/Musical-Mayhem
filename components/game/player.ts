import {Size} from "../types.js";
import MovementHandler from "./movement-handler.js";
import PlayerCollisionHandler from "./player-collision-handler.js";
import StateHandler from "../state-handler.js";

export default class Player{

    protected _c: HTMLCanvasElement;
    protected _size: Size;
    public _movementHandler: MovementHandler;
    public _collisionHandler: PlayerCollisionHandler;
    public _isAlive: boolean;

    constructor(c: HTMLCanvasElement, state: StateHandler) {
        this._c = c;
        this._size = {
            w: this._c.offsetWidth/8,
            h: this._c.offsetHeight/8
        };
        this._movementHandler = new MovementHandler(c, this._size, state);
        this._collisionHandler = new PlayerCollisionHandler(this._c, this._size);
        this._isAlive = true
    }

    public create(ctx: CanvasRenderingContext2D): void{ // Draws the player to the canvas
        const bounds = this._movementHandler.bounds;

        this.updateSize();
        bounds.tr = {x: bounds.p1.x + this._size.w, y: bounds.p1.y};
        bounds.bl = {x: bounds.p1.x, y: bounds.p1.y + this._size.h};
        bounds.br = {x: bounds.p1.x + this._size.w, y: bounds.p1.y + this._size.h};
        this._movementHandler.bounds = bounds;

        ctx.fillStyle = "#ff2c50";
        ctx.fillRect(this._movementHandler.bounds.p1.x, this._movementHandler.bounds.p1.y, this._size.w, this._size.h)
    }

    private updateSize(): void{ // Updates the size of the player if the window is resized
        this._size.w = this._c.offsetWidth/8;
        this._size.h = this._c.offsetHeight/8
    }

    public updatePos(obstacles: any[]): void{ // Updates the players position or resets it if out of bounds
        if((!this._collisionHandler.withinPlayer(obstacles, this._movementHandler.bounds, this._movementHandler.side) && this._collisionHandler.withinCanvas(this._movementHandler.bounds)) && this._isAlive){
            this._movementHandler.updateXPos();
            this._movementHandler.updateYPos();
        }
        else{
            this._isAlive = false;
            window.setTimeout(() => {
                if(!this._isAlive) this._movementHandler.resetBounds();
                this._isAlive = true
            }, 500)
        }
    }

    public get size(): Size{ // Returns size of the player
        return this._size
    }

    public get isAlive(): boolean{
        return this._isAlive
    }
}
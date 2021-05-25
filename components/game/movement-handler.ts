import {Size, Bounds, Bound} from "../types";
import {checkSide} from "../helpers.js";
import StateHandler from "../state-handler.js";

export default class MovementHandler{// Handles the movement of objects on the x and y axis

    protected _c: HTMLCanvasElement;
    protected _size: Size;
    protected _bounds: any;
    protected _side: string;
    protected _stateHandler: StateHandler;

    constructor(c: HTMLCanvasElement, size: Size, state: StateHandler) {
        this._c = c;
        this._size = size;
        this._bounds = this.generateRandomSide();
        this._stateHandler = state
    }

    updateYPos(): void{ // Move an object; left of center moves down and right of center moves up
        const s = this._stateHandler.difficulty;
        for(let p in this._bounds){
            if(this._bounds[p].x >= this._c.offsetWidth/2 - this._size.w/2){
                this._bounds[p].y -= s;
            }
            else if(this._bounds[p].x <= this._c.offsetWidth/2 + this._size.w/2){
                this._bounds[p].y += s;
            }
        }
    }

    public updateXPos(): void{ // Move and object; can on move back to the other side of past other center
        const s = this._stateHandler.difficulty;
        for(let p in this._bounds) {
            if(this._side === 'left' && this._bounds[p].x >= this._c.offsetWidth * 0.2) {
                this._bounds[p].x -= s * 2
            }
            else if(this._side === 'right' && this._bounds[p].x <= this._c.offsetWidth - this._c.offsetWidth * 0.2 - this._size.w) {
                this._bounds[p].x += s * 2;
            }
        }
    }

    private generateRandomSide(): Bounds{ // randomly choose the side and position an object will spawn
        const r = Math.random();
        if(r >= 0.5){
            this._side = 'left';
            return {p1: {x: this._c.width * 0.2, y: this._size.h * 2}};
        }
        this._side = 'right';
        return {p1: {x: this._c.offsetWidth - this._c.offsetWidth * 0.2 - this._size.w, y: this._c.offsetHeight - this._size.w - this._size.h * 2}}
    }

    public resetBounds(){ // Resets the position of an object back to the random position
        this._bounds = this.generateRandomSide()
    }

    public set bounds(bounds: Bounds){
        this._bounds = bounds
    }

    public get bounds(): Bounds{
        return this._bounds
    }

    public get side(): string{
        return this._side
    }

    public set side(side: string){
        this._side = side;
    }
}
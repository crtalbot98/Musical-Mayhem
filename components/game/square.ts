import Obstacle from "./obstacle.js";
import StateHandler from "../state-handler.js";

export default class Square extends Obstacle{

    constructor(c: HTMLCanvasElement, state: StateHandler) {
        super(c, state);
    }

    public create(): void{
        let bounds = this._movementHandler.bounds;

        this._ctx.fillStyle = 'rgb(25,168,185)';

        bounds.tr = {x: bounds.p1.x + this.size.w, y: bounds.p1.y};
        bounds.bl = {x: bounds.p1.x, y: bounds.p1.y + this.size.h};
        bounds.br = {x: bounds.p1.x + this.size.w, y: bounds.p1.y + this.size.h};

        this._movementHandler.bounds = bounds;

        this._ctx.fillRect(this._movementHandler.bounds.p1.x, this._movementHandler.bounds.p1.y, this._size.w, this._size.h);
    }

    public get type(): string{
        return 'square'
    }
}
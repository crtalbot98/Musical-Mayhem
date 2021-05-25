import Obstacle from "./obstacle.js";
import StateHandler from "../state-handler.js";

export default class Square extends Obstacle{

    constructor(c: HTMLCanvasElement, state: StateHandler) {
        super(c, state);
    }

    public create(): void{
        let bounds = this.movementHandler.getBounds();

        this.ctx.fillStyle = 'rgb(25,168,185)';

        bounds.tr = {x: bounds.p1.x + this.size.w, y: bounds.p1.y};
        bounds.bl = {x: bounds.p1.x, y: bounds.p1.y + this.size.h};
        bounds.br = {x: bounds.p1.x + this.size.w, y: bounds.p1.y + this.size.h};

        this.movementHandler.updateBounds(bounds);

        this.ctx.fillRect(this.movementHandler.getBounds().p1.x, this.movementHandler.getBounds().p1.y, this.size.w, this.size.h);
    }

    public getType(): string{
        return 'square'
    }
}
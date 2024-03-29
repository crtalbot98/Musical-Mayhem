import Obstacle from "./obstacle.js";
import StateHandler from "../state-handler.js";

export default class Triangle extends Obstacle{

    constructor(c: HTMLCanvasElement, state: StateHandler) {
        super(c, state);
    }

    create(ctx: CanvasRenderingContext2D): void{ // Draws a triangle to the scene
        let bounds = this._movementHandler.bounds;
        bounds.p2 = {x: bounds.p1.x + this.size.w, y: bounds.p1.y - this.size.h};

        ctx.beginPath();
        ctx.fillStyle = '#000000';
        if(this._movementHandler.side === 'left'){
            // Create bounds for left-side triangle
            bounds.p3 = {x: bounds.p1.x, y: bounds.p1.y - this.size.h*2};
            this._movementHandler.bounds = bounds;
            bounds = this._movementHandler.bounds;

            // Draw triangle to canvas
            ctx.moveTo(bounds.p1.x, bounds.p2.y);
            ctx.lineTo(bounds.p2.x, bounds.p2.y);
            ctx.lineTo(bounds.p3.x, bounds.p3.y);
        }
        else if(this._movementHandler.side === 'right'){
            // Create bounds for right-side triangle
            bounds.p3 = {x: bounds.p1.x + this._size.w, y: bounds.p1.y + this._size.h};
            this._movementHandler.bounds = bounds;
            bounds = this._movementHandler.bounds;

            // Draw triangle to canvas
            ctx.moveTo(bounds.p1.x, bounds.p1.y);
            ctx.lineTo(bounds.p2.x, bounds.p2.y);
            ctx.lineTo(bounds.p3.x, bounds.p3.y);
        }
        ctx.fill();
    }

    public get type(): string{ // Returns the objects type
        return 'triangle'
    }
}
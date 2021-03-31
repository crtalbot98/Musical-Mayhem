import Obstacle from "./obstacle.js";

export default class Triangle extends Obstacle{

    constructor(c: HTMLCanvasElement) {
        super(c, {w: 50, h: 50});
    }

    create(ctx: CanvasRenderingContext2D){ // Draws a triangle to the scene
        if(this.movementHandler.getPos().side === 'left'){
            ctx.beginPath();
            ctx.moveTo(this.movementHandler.getPos().x, this.movementHandler.getPos().y);
            ctx.lineTo(this.movementHandler.getPos().x + this.size.w, this.movementHandler.getPos().y - this.size.h);
            ctx.lineTo(this.movementHandler.getPos().x, this.movementHandler.getPos().y - this.size.h*2);
            ctx.fill();
        }
        else if(this.movementHandler.getPos().side === 'right'){
            ctx.beginPath();
            ctx.moveTo(this.movementHandler.getPos().x, this.movementHandler.getPos().y);
            ctx.lineTo(this.movementHandler.getPos().x + this.size.w, this.movementHandler.getPos().y - this.size.h);
            ctx.lineTo(this.movementHandler.getPos().x + this.size.w, this.movementHandler.getPos().y + this.size.h);
            ctx.fill();
        }
    }

    public getType(): string{ // Returns the objects type
        return 'triangle'
    }
}
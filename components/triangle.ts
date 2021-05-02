import Obstacle from "./obstacle.js";

export default class Triangle extends Obstacle{

    constructor(c: HTMLCanvasElement) {
        super(c, {w: 50, h: 50});
    }

    create(ctx: CanvasRenderingContext2D): void{ // Draws a triangle to the scene
        let bounds = this.movementHandler.getBounds();
        bounds.p2 = {x: bounds.p1.x + this.size.w, y: bounds.p1.y - this.size.h};

        ctx.beginPath();
        ctx.fillStyle = '#000000';
        if(this.movementHandler.getSide() === 'left'){
            // Create bounds for left-side triangle
            bounds.p3 = {x: bounds.p1.x, y: bounds.p1.y - this.size.h*2};
            this.movementHandler.updateBounds(bounds);

            // Draw triangle to canvas
            ctx.moveTo(bounds.p1.x, bounds.p2.y);
            ctx.lineTo(bounds.p2.x, bounds.p2.y);
            ctx.lineTo(bounds.p3.x, bounds.p3.y);
        }
        else if(this.movementHandler.getSide() === 'right'){
            // Create bounds for right-side triangle
            bounds.p3 = {x: bounds.p1.x + this.size.w, y: bounds.p1.y + this.size.h};
            this.movementHandler.updateBounds(bounds);

            // Draw triangle to canvas
            ctx.moveTo(bounds.p1.x, bounds.p1.y);
            ctx.lineTo(bounds.p2.x, bounds.p2.y);
            ctx.lineTo(bounds.p3.x, bounds.p3.y);
        }
        ctx.fill();
    }

    public getType(): string{ // Returns the objects type
        return 'triangle'
    }
}
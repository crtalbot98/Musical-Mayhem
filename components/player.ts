import {Coords, Size} from "./types";
import MovementHandler from "./movement-handler.js";

export default class Player{

    protected speed: number;
    protected c: HTMLCanvasElement;
    protected size: Size;
    public movementHandler: MovementHandler;

    constructor(c: HTMLCanvasElement) {
        this.c = c;
        this.speed = 2;
        this.size = {
            w: this.c.offsetWidth/8,
            h: this.c.offsetHeight/8
        };
        this.movementHandler = new MovementHandler(c, this.size);
    }

    public create(ctx: CanvasRenderingContext2D): void{
        this.updateSize();
        ctx.fillStyle = "#ff2c50";
        ctx.fillRect(this.movementHandler.getPos().x, this.movementHandler.getPos().y, this.size.w, this.size.h)
    }

    private updateSize(): void{
        this.size.w = this.c.offsetWidth/8;
        this.size.h = this.c.offsetHeight/8
    }

    public getSize(): Size{
        return this.size
    }

    public updatePos(): void{
        this.movementHandler.updateXPos(this.c, this.size);
        this.movementHandler.updateYPos(this.c, this.size);
    }
}
import {Coords, Size} from "./types.js";
import MovementHandler from "./movement-handler.js";
import CollisionHandler from "./collision-handler.js";

export default class Player{

    protected speed: number;
    protected c: HTMLCanvasElement;
    protected size: Size;
    public movementHandler: MovementHandler;
    public collisionHandler: CollisionHandler;
    public isAlive: boolean;

    constructor(c: HTMLCanvasElement) {
        this.c = c;
        this.speed = 2;
        this.size = {
            w: this.c.offsetWidth/8,
            h: this.c.offsetHeight/8
        };
        this.movementHandler = new MovementHandler(c, this.size);
        this.collisionHandler = new CollisionHandler(this.movementHandler.getPos(), c);
        this.isAlive = true
    }

    public create(ctx: CanvasRenderingContext2D): void{ // Draws the player to the canvas
        this.updateSize();
        ctx.fillStyle = "#ff2c50";
        ctx.fillRect(this.movementHandler.getPos().x, this.movementHandler.getPos().y, this.size.w, this.size.h)
    }

    private updateSize(): void{ // Updates the size of the player if the window is resized
        this.size.w = this.c.offsetWidth/8;
        this.size.h = this.c.offsetHeight/8
    }

    public getSize(): Size{ // Returns size of the player
        return this.size
    }

    public updatePos(): void{ // Updates the players position or resets it if out of bounds
        if(this.collisionHandler.withinCanvas(this.movementHandler.getPos()) && this.isAlive){
            this.movementHandler.updateXPos();
            this.movementHandler.updateYPos();
        }
        else{
            this.isAlive = false;
            window.setTimeout(() => { //Player dead
                if(!this.isAlive) this.movementHandler.resetPos();
                this.isAlive = true
            }, 1000);
        }
    }
}
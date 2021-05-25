import {Size} from "../types.js";
import MovementHandler from "./movement-handler.js";
import PlayerCollisionHandler from "./player-collision-handler.js";
import StateHandler from "../state-handler.js";

export default class Player{

    protected speed: number;
    protected c: HTMLCanvasElement;
    protected size: Size;
    public movementHandler: MovementHandler;
    public collisionHandler: PlayerCollisionHandler;
    public isAlive: boolean;

    constructor(c: HTMLCanvasElement, stateHandler: StateHandler) {
        this.c = c;
        this.speed = 2;
        this.size = {
            w: this.c.offsetWidth/8,
            h: this.c.offsetHeight/8
        };
        this.movementHandler = new MovementHandler(c, this.size, stateHandler);
        this.collisionHandler = new PlayerCollisionHandler(this.c, this.size);
        this.isAlive = true
    }

    public create(ctx: CanvasRenderingContext2D): void{ // Draws the player to the canvas
        const bounds = this.movementHandler.getBounds();

        this.updateSize();
        bounds.tr = {x: bounds.p1.x + this.size.w, y: bounds.p1.y};
        bounds.bl = {x: bounds.p1.x, y: bounds.p1.y + this.size.h};
        bounds.br = {x: bounds.p1.x + this.size.w, y: bounds.p1.y + this.size.h};
        this.movementHandler.updateBounds(bounds);

        ctx.fillStyle = "#ff2c50";
        ctx.fillRect(this.movementHandler.getBounds().p1.x, this.movementHandler.getBounds().p1.y, this.size.w, this.size.h)
    }

    private updateSize(): void{ // Updates the size of the player if the window is resized
        this.size.w = this.c.offsetWidth/8;
        this.size.h = this.c.offsetHeight/8
    }

    public getSize(): Size{ // Returns size of the player
        return this.size
    }

    public updatePos(obstacles: any[]): void{ // Updates the players position or resets it if out of bounds
        if((!this.collisionHandler.withinPlayer(obstacles, this.movementHandler.getBounds(), this.movementHandler.getSide()) && this.collisionHandler.withinCanvas(this.movementHandler.getBounds())) && this.isAlive){
            this.movementHandler.updateXPos();
            this.movementHandler.updateYPos();
        }
        else{
            this.isAlive = false;
            window.setTimeout(() => {
                if(!this.isAlive) this.movementHandler.resetBounds();
                this.isAlive = true
            }, 500)
        }
    }
}
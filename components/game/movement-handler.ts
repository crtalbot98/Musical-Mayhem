import {Size, Bounds, Bound} from "./types";
import {checkSide} from "../helpers.js";

export default class MovementHandler{// Handles the movement of objects on the x and y axis

    protected c: HTMLCanvasElement;
    protected size: Size;
    protected bounds: any;
    protected side: string;

    constructor(c: HTMLCanvasElement, size: Size) {
        this.c = c;
        this.size = size;
        this.bounds = this.generateRandomSide();
    }

    updateYPos(): void{ // Move an object; left of center moves down and right of center moves up
        for(let p in this.bounds){
            if(this.bounds[p].x >= this.c.offsetWidth/2 - this.size.w/2){
                this.bounds[p].y -= 2;
            }
            else if(this.bounds[p].x <= this.c.offsetWidth/2 + this.size.w/2){
                this.bounds[p].y += 2;
            }
        }
    }

    public updateXPos(): void{ // Move and object; can on move back to the other side of past other center
        for(let p in this.bounds) {
            if(this.side === 'left' && this.bounds[p].x >= this.c.offsetWidth * 0.2) {
                this.bounds[p].x -= 4
            }
            else if(this.side === 'right' && this.bounds[p].x <= this.c.offsetWidth - this.c.offsetWidth * 0.2 - this.size.w) {
                this.bounds[p].x += 4;
            }
        }
    }

    public updateSide(side: string): void{
        this.side = side;
    }

    private generateRandomSide(): Bounds{ // randomly choose the side and position an object will spawn
        const r = Math.random();
        if(r >= 0.5){
            this.side = 'left';
            return {p1: {x: this.c.width * 0.2, y: this.size.h * 2}};
        }
        this.side = 'right';
        return {p1: {x: this.c.offsetWidth - this.c.offsetWidth * 0.2 - this.size.w, y: this.c.offsetHeight - this.size.w - this.size.h * 2}}
    }

    public resetBounds(){ // Resets the position of an object back to the random position
        this.bounds = this.generateRandomSide()
    }

    public updateBounds(bounds: Bounds): void{
        this.bounds = bounds
    }

    public getBounds(): Bounds{
        return this.bounds
    }

    public getSide(): string{
        return this.side
    }
}
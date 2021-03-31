import {Coords, Size} from "./types";

export default class MovementHandler{// Handles the movement of objects on the x and y axis

    protected pos: Coords;
    protected c: HTMLCanvasElement;
    protected size: Size;

    constructor(c: HTMLCanvasElement, size: Size) {
        this.c = c;
        this.size = size;
        this.pos = this.generateRandomSide()
    }

    updateYPos(): void{ // Move an object; left of center moves down and right of center moves up
        if(this.pos.x >= this.c.offsetWidth/2 - this.size.w/2){
            this.pos.y -= 2;
        }
        else if(this.pos.x <= this.c.offsetWidth/2 + this.size.w/2){
            this.pos.y += 2;
        }
    }

    public updateXPos(): void{ // Move and object; can on move back to the other side of past other center
        if(this.pos.side === 'left' && this.pos.x >= this.c.offsetWidth*0.2){
            this.pos.x -= 4
        }
        else if(this.pos.side === 'right' && this.pos.x <= this.c.offsetWidth - this.c.offsetWidth*0.2 - this.size.w){
            this.pos.x += 4;
        }
    }

    public updateSide(side: string): void{
        this.pos.side = side;
    }

    private generateRandomSide(): Coords{ // randomly choose the side and position an object will spawn
        const r = Math.random();
        if(r >= 0.5){
            return{
                x: this.c.width * 0.2,
                y: this.size.h * 2,
                side: 'left'
            };
        }
        return {
            x: this.c.offsetWidth - this.c.offsetWidth * 0.2 - this.size.w,
            y: this.c.offsetHeight - this.size.w - this.size.h * 2,
            side: 'right'
        }
    }

    public resetPos(){ // Resets the position of an object back to the random position
        this.pos = this.generateRandomSide()
    }

    public getPos(): Coords{ // Return the position of the object
        return this.pos
    }
}
import {Coords, Size} from "./types";

export default class MovementHandler{//Object on the left move up and right move down

    protected pos: Coords;

    constructor(c: HTMLCanvasElement, size: Size) {
        this.pos = this.generateRandomSide(c, size);
    }

    updateYPos(c: HTMLCanvasElement, size: Size): void{
        if(this.pos.x >= c.offsetWidth/2 - size.w/2){
            this.pos.y -= 2;
        }
        else if(this.pos.x <= c.offsetWidth/2 + size.w/2){
            this.pos.y += 2;
        }
    }

    public updateXPos(c: HTMLCanvasElement, size: Size): void{
        if(this.pos.side === 'left' && this.pos.x >= c.offsetWidth*0.2){
            this.pos.x -= 4
        }
        else if(this.pos.side === 'right' && this.pos.x <= c.offsetWidth - c.offsetWidth*0.2 - size.w){
            this.pos.x += 4;
        }
    }

    public updateSide(side: string): void{
        this.pos.side = side;
    }

    private generateRandomSide(c: HTMLCanvasElement, size: Size): Coords{ // update y value
        const r = Math.random();
        if(r > 0.5){
            return{
                x: c.width * 0.2,
                y: 25,
                side: 'left'
            };
        }
        return {
            x: c.offsetWidth-c.offsetWidth * 0.2 - c.offsetWidth/8,
            y: c.offsetHeight - size.w - 25,
            side: 'right'
        }
    }

    public getPos(): Coords{
        return this.pos
    }
}
import {Coords, Size} from "./types.js";

export default class CollisionHandler{

    private pos: Coords;
    private c: HTMLCanvasElement;

    constructor(pos: Coords, c: HTMLCanvasElement) {
        this.pos = pos;
        this.c = c
    }

    public withinCanvas(pos: Coords){ // Checks if position of objects is outside of bounds on the y axis
        if(pos.y < 0 || pos.y > this.c.offsetHeight - this.c.offsetHeight/8) return false;
        return true
    }

    public checkSide(pos: Coords, size: Size){
        if(pos.x < this.c.offsetWidth/2 - size.w/2) return 'left';
        else if(pos.x > this.c.offsetWidth/2 + size.w/2) return 'right'
    }

    // public withinPlayer(){
    //
    // }
}
import {Bounds} from "../types.js";

export default class CollisionHandler{

    protected _c: HTMLCanvasElement;

    constructor(c: HTMLCanvasElement) {
        this._c = c
    }

    public withinCanvas(bounds: Bounds){ // Checks if position of objects is outside of scene bounds on the y axis
        for(let p in bounds){
            if(bounds[p].y > 0 && bounds[p].y < this._c.offsetHeight) return true
        }
    }
}
import {Bounds, Size} from "./types.js";
import {Controller} from "./controller.js";

export function checkSide(pos: Bounds, size: Size, c: HTMLCanvasElement): string{
        if(pos.tr.x <= c.offsetWidth/2) return 'left';
        else if(pos.p1.x >= c.offsetWidth/2) return 'right'
}

export function controlPressed(): boolean{
        for(let control in Controller){
                if(Controller[control].pressed) return true
        }
}
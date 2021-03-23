import {Controller} from "./components/controller.js";

export function controlPressed(): boolean{
    for(let control in Controller){
        if(Controller[control].pressed) return true
    }
}
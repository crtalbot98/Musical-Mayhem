import {PlayerController} from "../types";
import {checkSide} from "../helpers.js";

export const Controller: PlayerController = {
    65: { // A Key
        pressed: false,
        func: moveLeft
    },
    68: { // D Key
        pressed: false,
        func: moveRight
    }
};

function moveLeft(player: any, c: HTMLCanvasElement): void{
    if(checkSide(player._movementHandler.bounds, player.size, c) === 'right') player._movementHandler.side = 'left'
}

function moveRight(player: any, c: HTMLCanvasElement): void{
    if(checkSide(player._movementHandler.bounds, player.size, c) === 'left') player._movementHandler.side = 'right'
}
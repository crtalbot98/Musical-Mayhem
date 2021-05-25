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
    const pos = player.movementHandler.getBounds();
    const size = player.getSize();
    if(checkSide(pos, size, c) === 'right') player.movementHandler.updateSide('left')
}

function moveRight(player: any, c: HTMLCanvasElement): void{
    const pos = player.movementHandler.getBounds();
    const size = player.getSize();
    if(checkSide(pos, size, c) === 'left') player.movementHandler.updateSide('right')
}
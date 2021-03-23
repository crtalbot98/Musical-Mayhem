import {Coords, PlayerController} from "./types";

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
    const pos = player.movementHandler.getPos();
    const size = player.getSize();
    if(pos.x > c.offsetWidth/2 + size.w/2) player.movementHandler.updateSide('left')
}

function moveRight(player: any, c: HTMLCanvasElement): void{
    const pos = player.movementHandler.getPos();
    const size = player.getSize();
    if(pos.x < c.offsetWidth/2 - size.w/2) player.movementHandler.updateSide('right')
}
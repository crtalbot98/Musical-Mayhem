import CollisionHandler from "./collision-handler.js";
import {Bounds, Size} from "../types";

export default class PlayerCollisionHandler extends CollisionHandler{

    private size: Size;

    constructor(c: HTMLCanvasElement, size: Size){
        super(c);
        this.size = size
    }

    public withinPlayer(obstacles: any[], pBounds: Bounds, playerSide: string): boolean{ // Check if obstacles are within the player rect
        if(this.checkBoundsExists(pBounds)) return false;
        for(let i = 0; i < obstacles.length; i++){
            const oBounds = obstacles[i]._movementHandler.bounds;
            if(this.checkBoundsExists(oBounds)) return false;
            if(playerSide === obstacles[i]._movementHandler.side){
                if (pBounds.p1.x > oBounds.br.x || oBounds.p1.x > pBounds.br.x) return false; // Checks if player rect touches obstacle horizontally (x-axis)
                if (pBounds.p1.y > oBounds.br.y || oBounds.p1.y > pBounds.br.y) return false; // Checks if player rect touches obstacle vertically (y-axis)
                return true
            }
        }
    }

    private checkBoundsExists(b: Bounds): boolean{
        return (!b.p1 || !b.tr || !b.bl || !b.br)
    }
}
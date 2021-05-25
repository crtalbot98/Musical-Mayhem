import CollisionHandler from "./collision-handler.js";
import {Bounds, Size, Bound} from "../types";

class PlayerCollisionHandler extends CollisionHandler{

    private size: Size;

    constructor(c: HTMLCanvasElement, size: Size){
        super(c);
        this.size = size
    }

    public withinPlayer(obstacles: any[], pBounds: Bounds, playerSide: string): boolean{ // Check if obstacles are within the player rect
        if(!pBounds.tr || !pBounds.bl || !pBounds.br) return false;
        for(let i = 0; i < obstacles.length; i++){
            const oBounds = obstacles[i].movementHandler.getBounds();
            if(playerSide === obstacles[i].movementHandler.getSide()){
                for(let p in oBounds) {
                    const ab = this.vector(pBounds.br, pBounds.bl);
                    const am = this.vector(pBounds.br, oBounds[p]);
                    const bc = this.vector(pBounds.bl, pBounds.p1);
                    const bm = this.vector(pBounds.bl, oBounds[p]);
                    const dotABAM = this.dot(ab, am);
                    const dotABAB = this.dot(ab, ab);
                    const dotBCBM = this.dot(bc, bm);
                    const dotBCBC = this.dot(bc, bc);
                    if(0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC)  return true
                }

                return false
            }
        }
    }

    private vector(p1: Bound, p2: Bound): Bound{
        return {
            x: (p2.x - p1.x),
            y: (p2.y - p1.y)
        }
    }

    private dot(u: Bound, v: Bound): number{
        return u.x * v.x + u.y * v.y
    }
}

export default PlayerCollisionHandler;
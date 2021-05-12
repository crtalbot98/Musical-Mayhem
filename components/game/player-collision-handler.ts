import CollisionHandler from "./collision-handler.js";
import {Bounds, Bound, Size} from "./types";

class PlayerCollisionHandler extends CollisionHandler{

    private size: Size;

    constructor(c: HTMLCanvasElement, size: Size){
        super(c);
        this.size = size
    }

    public withinPlayer(obstacles: any[], bounds: Bounds): boolean{ // Check if obstacles are within the player rect
        if(!bounds.tr || !bounds.bl || !bounds.br) return false;
        for(let i = 0; i < obstacles.length; i++){
            const obsBounds = obstacles[i].movementHandler.getBounds();
            for(let obs in obsBounds){
                const tlb = bounds.p1.x <= obsBounds[obs].x && bounds.p1.y <= obsBounds[obs].y;
                const trb = bounds.tr.x >= obsBounds[obs].x && bounds.tr.y <= obsBounds[obs].y;
                const blb = bounds.bl.x <= obsBounds[obs].x && bounds.bl.y >= obsBounds[obs].y;
                const brb = bounds.br.x >= obsBounds[obs].x && bounds.br.y >= obsBounds[obs].y;
                if(tlb && trb && blb && brb) return true
            }
            return false
        }
    }
}

export default PlayerCollisionHandler;
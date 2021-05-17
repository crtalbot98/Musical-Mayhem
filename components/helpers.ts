import {Bounds, Params, Size} from "./game/types.js";
import {Controller} from "./game/controller.js";

export function checkSide(pos: Bounds, size: Size, c: HTMLCanvasElement): string{
        if(pos.tr.x <= c.offsetWidth/2) return 'left';
        else if(pos.p1.x >= c.offsetWidth/2) return 'right'
}

export function controlPressed(): boolean{
        for(let control in Controller){
                if(Controller[control].pressed) return true
        }
}

export async function fetchSpotifyAPI(url: string, auth: string){
        let data = await fetch(url, {
                method: 'get',
                headers: new Headers({
                        'Authorization': `Bearer ${auth}`
                })
        });

        try{
                return await data.json()
        }
        catch(e){
                return 'Error: unable to connect'
        }
}

export function checkParams(params: Params): boolean{
        return (params !== undefined && 'access_token' in params && 'refresh_token' in params)
}
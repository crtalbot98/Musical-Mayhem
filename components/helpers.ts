import {Bounds, Params, Size} from "./types.js";
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

export function randBetweenTwoVal(min: number, max: number): number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
}

export function updateVisibility(): void{
        const displayNone = Array.from(document.querySelectorAll('.display-none'));
        const flex = Array.from(document.querySelectorAll('.flex'));
        const elements = displayNone.concat(flex);

        for(let i = 0; i < elements.length; i++){
                if(elements[i].classList.contains('display-none')) elements[i].classList.replace('display-none', 'flex');
                else if(elements[i].classList.contains('flex')) elements[i].classList.replace('flex', 'display-none');
        }
}
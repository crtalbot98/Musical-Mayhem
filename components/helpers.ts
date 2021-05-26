import {Bounds, Params, Size} from "./types.js";
import {Controller} from "./game/controller.js";

export function checkSide(pos: Bounds, size: Size, c: HTMLCanvasElement): string{ // Checks which side of the canvas an object is on
        if(pos.tr.x <= c.offsetWidth/2) return 'left';
        else if(pos.p1.x >= c.offsetWidth/2) return 'right'
}

export function controlPressed(): boolean{ // Checks which controls are currently pressed
        for(let control in Controller){
                if(Controller[control].pressed) return true
        }
}

export async function fetchSpotifyAPI(url: string, auth: string){ // Fetches and returns data from the Spotify API
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

export function checkParams(params: Params): boolean{ // Checks if the url params are ready
        return (params !== undefined && 'access_token' in params && 'refresh_token' in params)
}

export function randBetweenTwoVal(min: number, max: number): number{ // Returns a random number between two values
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
}

export function updateVisibility(): void{ // replaces elements with display-none class with flex class and vice versa
        const displayNone = Array.from(document.querySelectorAll('.display-none'));
        const flex = Array.from(document.querySelectorAll('.flex'));
        const elements = displayNone.concat(flex);

        for(let i = 0; i < elements.length; i++){
                if(elements[i].classList.contains('display-none')) elements[i].classList.replace('display-none', 'flex');
                else if(elements[i].classList.contains('flex')) elements[i].classList.replace('flex', 'display-none');
        }
}

export function checkDeviceWidth(): boolean{
        if(window.innerWidth <= 1300) return true;
        return false
}

export function updatePlayBtn(state: boolean): void{
        const btn = document.querySelector('#play-btn');
        if(btn) btn.textContent = state ? 'Pause' : 'Play';
}
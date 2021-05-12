import Game from "./components/game/game.js";
import SpotifyPlayer from "./components/spotify/spotify-player.js";
import SpotifyUI from "./components/spotify/spotify-ui.js";
import {Params} from "./components/game/types.js";
import StateHandler from "./components/state-handler.js";

declare global {
    const Spotify: any;
    interface Window {
        onSpotifyWebPlaybackSDKReady?: any;
    }
}

(async function () {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    initCanvas(canvas);

    const state = new StateHandler();
    const game = new Game(canvas, ctx, state);
    const params = hashParams();
    const spotifyPlayer = new SpotifyPlayer(params, state);
    const spotifyUI = new SpotifyUI(params, state);

    if(params !== undefined && 'access_token' in params && 'refresh_token' in params) updateVisibility();

    window.onSpotifyWebPlaybackSDKReady = () => {
        spotifyPlayer.initSpotifyPlayer();
        spotifyUI.initSpotifyApi();
    };

    game.loop();

    window.addEventListener('resize', () => {
        initCanvas(canvas)
    });

    game.initControls()
})();

function initCanvas(canvas: HTMLCanvasElement): void{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .9;
}

function updateVisibility(): void{
    const hidden = Array.from(document.querySelectorAll('.visible'));
    const visible = Array.from(document.querySelectorAll('.hidden'));
    const elements = hidden.concat(visible);

    for(let i = 0; i < elements.length; i++){
        if(elements[i].classList.contains('hidden')){
            elements[i].classList.add('visible');
            elements[i].classList.remove('hidden')
        }
        else if(elements[i].classList.contains('visible')){
            elements[i].classList.add('hidden');
            elements[i].classList.remove('visible')
        }
    }
}

function hashParams(): Params{ // get url params for user data
    let hash: any = {};
    let e: RegExpExecArray;
    let r = /([^&;=]+)=?([^&;]*)/g;
    let q = window.location.search;

    if(!q) return;

    for(let i = 0; i < 3; i++){
        e = r.exec(q);
        if(e[1][0] === '?') e[1] = e[1].slice(1, e[1].length);
        if(e !== null) hash[e[1]] = decodeURIComponent(e[2]);
    }

    return hash
}
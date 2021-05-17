import Game from "./components/game/game.js";
import SpotifyPlayer from "./components/spotify/spotify-player.js";
import SpotifyUI from "./components/spotify/spotify-ui.js";
import {Params} from "./components/game/types.js";
import StateHandler from "./components/state-handler.js";
import {checkParams} from "./components/helpers.js";

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
    initEventListeners(canvas);

    const state = new StateHandler();
    const game = new Game(canvas, ctx, state);
    const params = hashParams();
    const spotify = new SpotifyUI(params, state);
    const player = spotify.getPlayer();

    if(checkParams(params)) updateVisibility();
    else spotify.loginWarning();

    window.onSpotifyWebPlaybackSDKReady = () => {
        if(checkParams(params)){
            player.initSpotifyPlayer();
            spotify.updatePlaylists();
        }
    };

    if(state.getState() === 'paused') game.loop();

    game.initControls()
})();

function initEventListeners(canvas: HTMLCanvasElement): void{
    const noSpotify = document.querySelector("#no-spotify");

    noSpotify.addEventListener('click', () => {
        updateVisibility()
    });

    window.addEventListener('resize', () => {
        initCanvas(canvas)
    });
}

function initCanvas(canvas: HTMLCanvasElement): void{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .8;
}

function updateVisibility(): void{
    const displayNone = Array.from(document.querySelectorAll('.flex'));
    const flex = Array.from(document.querySelectorAll('.display-none'));
    const elements = displayNone.concat(flex);

    for(let i = 0; i < elements.length; i++){
        if(elements[i].classList.contains('display-none')) elements[i].classList.replace('display-none', 'flex');
        else if(elements[i].classList.contains('flex')) elements[i].classList.replace('flex', 'display-none');
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
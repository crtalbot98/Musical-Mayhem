import Game from "./components/game/game.js";
import SpotifyUI from "./components/spotify/spotify-ui.js";
import {Params} from "./components/types.js";
import StateHandler from "./components/state-handler.js";
import {checkParams, updateVisibility} from "./components/helpers.js";

declare global {
    const Spotify: any;
    interface Window {
        onSpotifyWebPlaybackSDKReady?: any;
    }
}

(async function () {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const state = new StateHandler();

    initCanvas(canvas);
    initEventListeners(canvas, state);

    const game = new Game(canvas, ctx, state);
    const params = hashParams();
    const spotify = new SpotifyUI(params, state);
    const player = spotify.player;

    if(checkParams(params)) updateVisibility();
    else spotify.loginWarning();

    window.onSpotifyWebPlaybackSDKReady = () => {
        if(checkParams(params)){
            player.initSpotifyPlayer();
            spotify.init();
        }
    };

    game.loop();
    game.initControls()
})();

function initEventListeners(canvas: HTMLCanvasElement, stateHandler: StateHandler): void{
    const noSpotify = document.querySelector("#no-spotify");

    noSpotify.addEventListener('click', () => {
        stateHandler.state = true;
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
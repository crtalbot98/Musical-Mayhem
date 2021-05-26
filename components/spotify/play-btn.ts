import StateHandler from "../state-handler.js";
import SpotifyPlayer from "./spotify-player.js";
import {updatePlayBtn} from "../helpers.js";

export default class PlayBtn{

    private _stateHandler: StateHandler;
    private _player: SpotifyPlayer;
    private _btn: HTMLButtonElement;

    constructor(state: StateHandler, player: SpotifyPlayer) {
        this._stateHandler = state;
        this._player = player;
        this._btn = document.createElement('button');
    }

    public create(): void{
        this._btn.id = 'play-btn';
        this._btn.classList.add('btn-link', 'circle', 'center');
        updatePlayBtn(this._stateHandler.state);

        document.querySelector('.content').append(this._btn);

        this._btn.addEventListener('click', () => {
            this._stateHandler.state ? this._player.pauseSong() : this._player.resumeSong()
        })
    }
}
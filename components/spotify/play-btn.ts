import StateHandler from "../state-handler.js";
import SpotifyPlayer from "./spotify-player.js";

export default class PlayBtn{

    private _stateHandler: StateHandler;
    private _player: SpotifyPlayer;

    constructor(state: StateHandler, player: SpotifyPlayer) {
        this._stateHandler = state;
        this._player = player
    }

    public create(): void{
        const btn = document.createElement('button');
        btn.classList.add('btn-link');

        document.querySelector('.content').append(btn);

        btn.addEventListener('click', () => {
            btn.textContent = this._stateHandler.state ? 'Play' : 'Paused';
            this._stateHandler.state ? this._player.pauseSong() : this._player.resumeSong()
        })
    }
}
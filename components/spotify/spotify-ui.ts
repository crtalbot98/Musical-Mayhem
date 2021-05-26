import {Params} from "../types.js";
import StateHandler from "../state-handler.js";
import SpotifyPlayer from "./spotify-player.js";
import Playlists from "./playlists.js";
import PlayBtn from "./play-btn.js";
import OpenBtn from "./open-btn.js";

export default class SpotifyUI{

    private _stateHandler: StateHandler;
    private _player: SpotifyPlayer;
    private _playlists: Playlists;
    private _params: Params;
    private _playBtn: PlayBtn;
    private _openBtn: OpenBtn;

    constructor(params: Params, state: StateHandler) {
        this._params = params;
        this._stateHandler = state;
        this._player = new SpotifyPlayer(params, state);
        this._playlists = new Playlists(params, this._player, state);
        this._playBtn = new PlayBtn(state, this._player);
        this._openBtn = new OpenBtn(state)
    }

    public loginWarning(): void{
        const content = document.querySelector('.content');
        const p = document.createElement('p');
        p.innerText = 'Please login to your Spotify account to use this feature';
        content.append(p)
    }

    public init(): void{
        this._playlists.update();
        this._playBtn.create();
        // this._openBtn.init()
    }

    public get player(): SpotifyPlayer{
        return this._player
    }
}
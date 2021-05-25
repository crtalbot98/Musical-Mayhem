import {Params} from "../types.js";
import StateHandler from "../state-handler.js";
import SpotifyPlayer from "./spotify-player.js";
import Playlists from "./playlists.js";
import PlayBtn from "./play-btn.js";

export default class SpotifyUI{

    private stateHandler: StateHandler;
    private player: SpotifyPlayer;
    private playlists: Playlists;
    private params: Params;
    private playBtn: PlayBtn;

    constructor(params: Params, state: StateHandler) {
        this.params = params;
        this.stateHandler = state;
        this.player = new SpotifyPlayer(params, state);
        this.playlists = new Playlists(params, this.player);
        this.playBtn = new PlayBtn(state, this.player)
    }

    public loginWarning(): void{
        const content = document.querySelector('.content');
        const p = document.createElement('p');
        p.innerText = 'Please login to your Spotify account to use this feature';
        content.append(p)
    }

    public getPlayer(): SpotifyPlayer{
        return this.player
    }

    public init(): void{
        this.playlists.updatePlaylists();
        this.playBtn.create()
    }
}
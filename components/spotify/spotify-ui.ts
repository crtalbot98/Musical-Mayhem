import {Params} from "../game/types.js";
import StateHandler from "../state-handler.js";

export default class SpotifyUI{

    private playlists: any[];
    private params: Params;
    private stateHandler: StateHandler;

    constructor(params: Params, state: StateHandler) {
        this.params = params;
        this.stateHandler = state
    }

    public initSpotifyApi(): void{
        // this.spotifyApi.setAccessToken(`${this.params}`);
    }

    public updatePlaylists(): void{

    }

    // private addPlayListsToDOM(): void{
    //     const listEle = document.querySelector('.list');
    //     this.playlists.forEach(())
    // }
}
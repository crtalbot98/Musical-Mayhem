import StateHandler from "../state-handler.js";
import {fetchSpotifyAPI, updateVisibility} from "../helpers.js";

export default class SpotifyPlayer{

    private _player: any;
    private _id: any;
    private _params: any;
    private _stateHandler: StateHandler;
    private _ready: boolean;

    constructor(params: any, state: StateHandler){
        this._ready = false;
        this._params = params;
        this._stateHandler = state
    }

    public initSpotifyPlayer(): void{
        if(!this._params.access_token) return;

        const player = new Spotify.Player({
            name: 'Beats Per Jump Player',
            getOAuthToken: (cb: any) => {
                cb(this._params.access_token);
            }
        });

        // Error handling
        player.addListener('initialization_error', ({message}: any) => { this.reset() });
        player.addListener('authentication_error', ({message}: any) => { this.reset() });
        player.addListener('account_error', ({message}: any) => { this.reset() });
        player.addListener('playback_error', ({message}: any) => { this.reset() });

        // Playback status updates
        player.addListener('player_state_changed', (state: any) => {
            // if(state) console.log(state)
        });

        // Ready
        player.addListener('ready', ({device_id}: any) => {
            this._player = player;
            this._id = device_id;
            this._ready = true
        });

        // Not Ready
        player.addListener('not_ready', ({device_id}: any) => {
            this.reset()
        });

        // Connect to the player
        player.connect()
    }

    public playSong(uri: string, id: string): void{
        if(!this._player) return;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this._id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._params.access_token}`
            },
        }).then((data) => {
            if(data.ok && !this._stateHandler.state){
                this._stateHandler.toggle();
            }
            else if(data.ok){
                fetchSpotifyAPI(`https://api.spotify.com/v1/audio-analysis/${id}`, this._params.access_token).then((analysis) => {
                    this._stateHandler.difficulty = analysis.track.tempo
                })
            }
        });
    }

    public pauseSong(): void{
        this._player.pause().then(() => {
            this._stateHandler.toggle()
        });
    }

    public resumeSong(): void{
        this._player.resume().then(() => {
            this._stateHandler.toggle()
        });
    }

    private reset(): void{
        this._ready = false;
        updateVisibility()
    }

    public get ready(): boolean{
        return this._ready
    }

    public get player(): any{
        return this._player
    }
}
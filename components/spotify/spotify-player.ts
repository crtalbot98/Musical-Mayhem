import StateHandler from "../state-handler.js";
import {fetchSpotifyAPI, updatePlayBtn, updateVisibility} from "../helpers.js";

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

        this._player = new Spotify.Player({
            name: 'Beats Per Jump Player',
            getOAuthToken: (cb: any) => {
                cb(this._params.access_token);
            }
        });

        // Error handling
        this._player.addListener('initialization_error', ({message}: any) => { this.reset() });
        this._player.addListener('authentication_error', ({message}: any) => { this.reset() });
        this._player.addListener('account_error', ({message}: any) => { this.reset() });
        this._player.addListener('playback_error', ({message}: any) => { this.reset() });

        // Playback status updates
        this._player.addListener('player_state_changed', (state: any) => {
            // if(state) console.log(state)
        });

        // Ready
        this._player.addListener('ready', ({device_id}: any) => {
            this._id = device_id;
            this._ready = true
        });

        // Not Ready
        this._player.addListener('not_ready', ({device_id}: any) => {
            this.reset()
        });

        // Connect to the player
        this._player.connect()
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
                updatePlayBtn(this._stateHandler.state);
                fetchSpotifyAPI(`https://api.spotify.com/v1/audio-analysis/${id}`, this._params.access_token).then((analysis) => {
                    this._stateHandler.difficulty = analysis.track.tempo
                })
            }
        });
    }

    public pauseSong(): void{
        this._player.pause().then(() => {
            this._stateHandler.toggle();
            updatePlayBtn(this._stateHandler.state);
        });
    }

    public resumeSong(): void{
        this._player.resume().then(() => {
            this._stateHandler.toggle();
            updatePlayBtn(this._stateHandler.state);
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
import StateHandler from "../state-handler.js";

export default class SpotifyPlayer{

    private player: any;
    private id: any;
    private params: any;
    private stateHandler: StateHandler;
    private ready: boolean;

    constructor(params: any, state: StateHandler){
        this.ready = false;
        this.params = params;
        this.stateHandler = state;
    }

    initSpotifyPlayer(){
        if(!this.params.access_token) return;
        const player = new Spotify.Player({
            name: 'Beats Per Jump Player',
            getOAuthToken: (cb: any) => {
                cb(this.params.access_token);
            }
        });

        // Error handling
        this.player.addListener('initialization_error', ({message}: any) => { alert(message) });
        this.player.addListener('authentication_error', ({message}: any) => { alert(message) });
        this.player.addListener('account_error', ({message}: any) => { alert(message) });
        this.player.addListener('playback_error', ({message}: any) => { alert(message) });

        // Playback status updates
        this.player.addListener('player_state_changed', (state: any) => {
            if(state) console.log(state)
        });

        // Ready
        this.player.addListener('ready', ({device_id}: any) => {
            this.player = player;
            this.id = device_id;
            this.ready = true
        });

        // Not Ready
        this.player.addListener('not_ready', ({device_id}: any) => {
            this.ready = false;
            alert(`Device ID has gone offline: ${device_id}`)
        });

        // Connect to the player
        this.player.connect()
    }
}
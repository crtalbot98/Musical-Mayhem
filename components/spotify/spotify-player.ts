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
        this.stateHandler = state
    }

    public initSpotifyPlayer(): void{
        if(!this.params.access_token) return;

        const player = new Spotify.Player({
            name: 'Beats Per Jump Player',
            getOAuthToken: (cb: any) => {
                cb(this.params.access_token);
            }
        });

        // Error handling
        player.addListener('initialization_error', ({message}: any) => { alert(message) });
        player.addListener('authentication_error', ({message}: any) => { alert(message) });
        player.addListener('account_error', ({message}: any) => { alert(message) });
        player.addListener('playback_error', ({message}: any) => { alert(message) });

        // Playback status updates
        player.addListener('player_state_changed', (state: any) => {
            if(state) console.log(state)
        });

        // Ready
        player.addListener('ready', ({device_id}: any) => {
            this.player = player;
            this.id = device_id;
            this.ready = true
        });

        // Not Ready
        player.addListener('not_ready', ({device_id}: any) => {
            this.ready = false;
            alert(`Device ID has gone offline: ${device_id}`)
        });

        // Connect to the player
        player.connect()
    }

    public playSong(uri: string): void{
        if(!this.player) return;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.params.access_token}`
            },
        });
    }
}
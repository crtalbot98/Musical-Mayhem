import StateHandler from "../state-handler.js";
import SpotifyPlayer from "./spotify-player.js";

export default class PlayBtn{

    private stateHandler: StateHandler;
    private player: SpotifyPlayer;

    constructor(state: StateHandler, player: SpotifyPlayer) {
        this.stateHandler = state;
        this.player = player
    }

    public create(): void{
        const btn = document.createElement('button');
        btn.classList.add('btn-link');

        document.querySelector('.content').append(btn);

        btn.addEventListener('click', () => {
            btn.textContent = this.stateHandler.getState() ? 'Play' : 'Paused';
            this.stateHandler.getState() ? this.player.pauseSong() : this.player.resumeSong()
        })
    }
}
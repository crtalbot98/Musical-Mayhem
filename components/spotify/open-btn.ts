import StateHandler from "../state-handler.js";
import {checkDeviceWidth} from "../helpers.js";

export default class OpenBtn{

    private _stateHandler: StateHandler;
    private _btn: HTMLButtonElement;

    constructor(state: StateHandler) {
        this._stateHandler = state;
        this._btn = document.createElement('button')
    }

    public init(): void{
        this.update();
        this._btn.classList.add('open-btn', 'btn-link', 'circle', 'center');

        this._btn.addEventListener('click', () => {
            this.update();
            this.toggleListClasses()
        });

        document.querySelector('.content').append(this._btn)
    }

    private toggleListClasses(): void{
        const playlists = document.querySelector('#playlists');
        const tracks = document.querySelector('#tracks');

        if(this._stateHandler.state){
            if (checkDeviceWidth()) this._stateHandler.state = false;
            playlists.classList.replace('display-none', 'fixed-border');
            tracks.classList.replace('display-none', 'fixed-border')
        }
        else{
            if (checkDeviceWidth()) this._stateHandler.state = true;
            playlists.classList.replace('fixed-border', 'display-none');
            tracks.classList.replace('fixed-border', 'display-none')
        }
    }

    private update(): void{
        this._btn.textContent = this._stateHandler.state ? 'close' : 'open';
    }
}
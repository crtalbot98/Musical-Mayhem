import {fetchSpotifyAPI} from "../helpers.js";
import {Params} from "../types.js";
import Tracks from "./tracks.js";
import SpotifyPlayer from "./spotify-player.js";
import OpenBtn from "./open-btn.js";
import StateHandler from "../state-handler.js";

export default class Playlists {

    private _playlists: any[];
    private _params: Params;
    private _currentPlayListName: string;
    private _tracks: Tracks;
    private _playlistsElement: HTMLDivElement;

    constructor(params: Params, player: SpotifyPlayer, state: StateHandler) { //make content invisible on mobile
        this._params = params;
        this._tracks = new Tracks(params, player);
        this._playlistsElement = document.createElement('div');
        this.initPlaylistsElements();
    }

    public update(): void { // Fetch the user's playlists from Spotify API
        fetchSpotifyAPI('https://api.spotify.com/v1/me/playlists', this._params.access_token).then((data: any) => {
            this._playlists = data.items;
            this.addToDOM()
        });
    }

    private initPlaylistsElements(): void {
        const list = document.createElement('div');
        const title = document.createElement('h4');

        this._playlistsElement.id = 'playlists';
        this._playlistsElement.classList.add('fixed-border');
        list.classList.add('list');
        title.textContent = 'Your Playlists';
        this._playlistsElement.append(title);
        this._playlistsElement.append(list);

        document.querySelector('.content').append(this._playlistsElement);
    }

    private addToDOM(): void{ // Add the playlists to the DOM
        const list = document.querySelector('#playlists .list');
        this._playlists.forEach((data: any) => {
            const cont = document.createElement('div');
            const img = document.createElement('img');
            const name = document.createElement('p');
            const cont2 = document.createElement('div');
            cont2.classList.add('flex-column');

            img.src = data.images[0].url;
            name.innerText = data.name;

            cont.append(img);
            cont2.append(name);
            cont.append(cont2);
            list.append(cont);

            cont.addEventListener('click',() => {
                this._currentPlayListName = data.name;
                this.emptyTracks();
                this._tracks.updatePlaylistTracks(data.tracks.href)
            })
        });
    }

    private emptyTracks(): void{ // Remove tracks from the DOM
        const list = document.querySelector('#tracks div');
        const title = document.querySelector('#tracks h4');
        if(title) title.textContent = this._currentPlayListName || 'Playlist Tracks';
        if(list) list.innerHTML = ''
    }

    public get playlists(): any[]{
        return this._playlists
    }

    public get currentPlaylistName(): string{
        return this._currentPlayListName
    }
}
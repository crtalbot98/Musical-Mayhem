import {fetchSpotifyAPI} from "../helpers.js";
import {Params} from "../types.js";
import Tracks from "./tracks.js";
import SpotifyPlayer from "./spotify-player.js";

export default class Playlists{

    private _playlists: any[];
    private _params: Params;
    private _currentPlayListName: string;
    private _tracks: Tracks;

    constructor(params: Params, player: SpotifyPlayer) { //make content invisible on mobile
        this._params = params;
        this._tracks = new Tracks(params, player);
    }

    public updatePlaylists(): void{ // Fetch the user's playlists from Spotify API
        fetchSpotifyAPI('https://api.spotify.com/v1/me/playlists', this._params.access_token).then((data: any) => {
            this._playlists = data.items;
            this.addPlayListsToDOM()
        });
    }

    private addPlayListsToDOM(): void{ // Add the playlists to the DOM
        const list = document.querySelector('#playlists');
        const cont = document.createElement('div');
        const title = document.createElement('h4');
        cont.id = 'playlists';
        cont.classList.add('list', 'fixed-border');
        cont.append(title);

        this._playlists.forEach((data: any) => {
            const cont = document.createElement('div');
            const img = document.createElement('img');
            const name = document.createElement('p');

            img.src = data.images[0].url;
            name.innerText = data.name;

            cont.append(img);
            cont.append(name);
            list.append(cont);

            cont.addEventListener('click',() => {
                this._currentPlayListName = data.name;
                this.emptyTracks();
                this._tracks.updatePlaylistTracks(data.tracks.href)
            })
        })
    }

    private emptyTracks(): void{ // Remove tracks from the DOM
        const list = document.querySelector('#tracks div');
        document.querySelector('#tracks h4').textContent = this._currentPlayListName || 'Playlist Tracks';
        if(list) list.innerHTML = ''
    }

    public get playlists(): any[]{
        return this._playlists
    }

    public get currentPlaylistName(): string{
        return this._currentPlayListName
    }
}
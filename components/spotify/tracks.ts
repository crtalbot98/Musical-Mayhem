import {fetchSpotifyAPI} from "../helpers.js";
import {Params} from "../types";
import SpotifyPlayer from "./spotify-player.js";

export default class Tracks{

    private _currentPlaylistTracks: any[];
    private _currentSong: string;
    private _params: Params;
    private _nextTrackList: string;
    private _player: SpotifyPlayer;

    constructor(params: Params, player: SpotifyPlayer){
        this._params = params;
        this._player = player
    }

    public updatePlaylistTracks(url: string): void{ // fetch playlist tracks from Spotify API
        fetchSpotifyAPI(url, this._params.access_token).then((data: any) => {
            this._currentPlaylistTracks = data.items;
            this._nextTrackList = data.next;
            this.updateNextVisibility();
            this.addTracksToDOM()
        });
    }

    private addTracksToDOM(): void{ // Add tracks to the DOM
        const list = document.querySelector('#tracks .list');
        const next = document.querySelector('#next');

        this._currentPlaylistTracks.forEach((data: any) => {
            const cont = document.createElement('div');
            const img = document.createElement('img');
            const name = document.createElement('p');
            const artist = document.createElement('p');
            const cont2 = document.createElement('div');

            img.src = data.track.album.images[2].url;
            name.innerText = data.track.name;
            artist.innerText = data.track.artists[0].name;

            cont.append(img);
            cont2.append(name);
            cont2.append(artist);
            cont.append(cont2);
            list.append(cont);

            cont.addEventListener('click', () => {
                this._currentSong = data.track.uri;
                this._player.playSong(this._currentSong, data.track.id)
            });
        });

        next.addEventListener('click', () => {
            this.updatePlaylistTracks(this._nextTrackList)
        });
    }

    private updateNextVisibility(): void{
        const next = document.querySelector('#next');
        if(this._nextTrackList) next.classList.replace('hidden', 'visible');
    }

    public get nextTrackList(): string{
        return this._nextTrackList
    }

    public get currentTracks(): any[]{
        return this._currentPlaylistTracks
    }

    public get currentSong(): string{
        return this._currentSong
    }
}
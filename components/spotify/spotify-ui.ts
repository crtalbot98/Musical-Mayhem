import {Params} from "../game/types.js";
import StateHandler from "../state-handler.js";
import {fetchSpotifyAPI, checkParams} from "../helpers.js";
import SpotifyPlayer from "./spotify-player.js";

export default class SpotifyUI{

    private playlists: any[];
    private currentPlayListName: string;
    private currentPlaylistTracks: any[];
    private currentSong: string;
    private params: Params;
    private stateHandler: StateHandler;
    private nextTrackList: string;
    private player: SpotifyPlayer;

    constructor(params: Params, state: StateHandler) {
        this.params = params;
        this.stateHandler = state;
        this.player = new SpotifyPlayer(params, state)
    }

    public updatePlaylists(): void{
        fetchSpotifyAPI('https://api.spotify.com/v1/me/playlists', this.params.access_token).then((data: any) => {
            this.playlists = data.items;
            console.log(this.playlists);
            this.addPlayListsToDOM()
        });
    }

    private addPlayListsToDOM(): void{
        const list = document.querySelector('#playlists');
        this.playlists.forEach((data: any) => {
            const cont = document.createElement('div');
            const img = document.createElement('img');
            const name = document.createElement('p');

            img.src = data.images[0].url;
            name.innerText = data.name;

            cont.append(img);
            cont.append(name);
            list.append(cont);

            cont.addEventListener('click',() => {
                this.currentPlayListName = data.name;
                this.emptyTracks();
                this.updatePlaylistTracks(data.tracks.href)
            })
        })
    }

    public updatePlaylistTracks(url: string): void{
        fetchSpotifyAPI(url, this.params.access_token).then((data: any) => {
            this.currentPlaylistTracks = data.items;
            this.nextTrackList = data.next;
            this.updateNextVisibility();
            this.addTracksToDOM()
        });
    }

    private addTracksToDOM(): void{
        const list = document.querySelector('#tracks .list');
        const next = document.querySelector('#next');

        this.currentPlaylistTracks.forEach((data: any) => {
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
                this.currentSong = data.track.uri;
                this.player.playSong(this.currentSong)
            });
        });

        next.addEventListener('click', () => {
            this.updatePlaylistTracks(this.nextTrackList)
        });
    }

    public loginWarning(): void{
        const content = document.querySelector('.content');
        const p = document.createElement('p');
        p.innerText = 'Please login to your Spotify account to use this feature';
        content.append(p)
    }

    private emptyTracks(): void{
        const list = document.querySelector('#tracks div');
        document.querySelector('#tracks h4').textContent = this.currentPlayListName || 'Playlist Tracks';
        if(list) list.innerHTML = ''
    }

    private updateNextVisibility(): void{
        const next = document.querySelector('#next');
        if(this.nextTrackList) next.classList.replace('hidden', 'visible');
    }

    public getNextTrackList(): string{
        return this.nextTrackList
    }

    public getPlaylists(): any[]{
        return this.playlists
    }

    public getCurrentTracks(): any[]{
        return this.currentPlaylistTracks
    }

    public getCurrentSong(): string{
        return this.currentSong
    }

    public getPlayer(): SpotifyPlayer{
        return this.player
    }
}
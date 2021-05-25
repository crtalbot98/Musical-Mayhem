import {fetchSpotifyAPI} from "../helpers.js";
import {Params} from "../types";
import SpotifyPlayer from "./spotify-player.js";

export default class Tracks{

    private currentPlaylistTracks: any[];
    private currentSong: string;
    private params: Params;
    private nextTrackList: string;
    private player: SpotifyPlayer;

    constructor(params: Params, player: SpotifyPlayer){
        this.params = params;
        this.player = player
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
                this.player.playSong(this.currentSong, data.track.id)
            });
        });

        next.addEventListener('click', () => {
            this.updatePlaylistTracks(this.nextTrackList)
        });
    }

    private updateNextVisibility(): void{
        const next = document.querySelector('#next');
        if(this.nextTrackList) next.classList.replace('hidden', 'visible');
    }

    public getNextTrackList(): string{
        return this.nextTrackList
    }

    public getCurrentTracks(): any[]{
        return this.currentPlaylistTracks
    }

    public getCurrentSong(): string{
        return this.currentSong
    }
}
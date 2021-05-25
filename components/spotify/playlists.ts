import {fetchSpotifyAPI} from "../helpers.js";
import {Params} from "../types.js";
import Tracks from "./tracks.js";
import SpotifyPlayer from "./spotify-player.js";

export default class Playlists{

    private playlists: any[];
    private params: Params;
    private currentPlayListName: string;
    private tracks: Tracks;

    constructor(params: Params, player: SpotifyPlayer) { //make content invisible on mobile
        this.params = params;
        this.tracks = new Tracks(params, player);
    }

    public updatePlaylists(): void{
        fetchSpotifyAPI('https://api.spotify.com/v1/me/playlists', this.params.access_token).then((data: any) => {
            this.playlists = data.items;
            this.addPlayListsToDOM()
        });
    }

    private addPlayListsToDOM(): void{
        const list = document.querySelector('#playlists');
        const cont = document.createElement('div');
        const title = document.createElement('h4');
        cont.id = 'playlists';
        cont.classList.add('list', 'fixed-border');
        cont.append(title);

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
                this.tracks.updatePlaylistTracks(data.tracks.href)
            })
        })
    }

    private emptyTracks(): void{
        const list = document.querySelector('#tracks div');
        document.querySelector('#tracks h4').textContent = this.currentPlayListName || 'Playlist Tracks';
        if(list) list.innerHTML = ''
    }

    public getPlaylists(): any[]{
        return this.playlists
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server

    let requests = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    return Promise.resolve(requests);
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    //router.get('/search/:category/:resource', function(req, res, next) {

    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource)).then((data) => {

      if (category == 'artist') {
        return data.artists.items.map(NameofArtist => {
          return new ArtistData(NameofArtist);
        });
      }
      else if (category == 'album') {
        return data.albums.items.map(NameofAlbum => {
          return new AlbumData(NameofAlbum);
        });
      }
      else if (category == 'track') {
        return data.tracks.items.map(NameofTrack => {
          return new TrackData(NameofTrack);
        });
      }

    });

    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

  }

  getArtist(artistId: string): Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    //	/v1/artists/{id}
    //let test = '/artist/' + artistId;
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then(data => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    // /v1/artists/{id}/related-artists
    //router.get('/artist-related-artists/:id'
    let test = '/artist-related-artists/' + artistId;
    return this.sendRequestToExpress('/artist-related-artists/' + encodeURIComponent(artistId)
    ).then(data => {
      return data.artists.map(NameofArtists => {
        return new ArtistData(NameofArtists);
      });
    });
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    // /v1/artists/{id}/top-tracks
    //router.get('/artist-top-tracks/:id'
    let test = '/artist-top-tracks/' + artistId;
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)
    ).then(data => {
      return data.items.map(tracks => {
        return new TrackData(tracks);
      });
    });
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    //router.get('/artist-albums/:id'
    let test = '/artist-albums/' + artistId;
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then(data => {
      return data.items.map(NameofAlbums => {
        return new AlbumData(NameofAlbums);
      });
    });
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    // /v1/albums/{id}
    return this.sendRequestToExpress('/album/'
      + encodeURIComponent(albumId)).then(data => {
        return new AlbumData(data);
      });

  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    // /v1/albums/{id}/tracks
    //router.get('/album-tracks/:id'
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then(data => {
      return data.items.map(NameofTracks => {
        return new TrackData(NameofTracks);
      });
    });
  }

  getTrack(trackId: string): Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    // /v1/tracks/{id}
    return this.sendRequestToExpress('/track/'
      + encodeURIComponent(trackId)).then(data => {
        return new TrackData(data);
      });
  }

  getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    // /v1/audio-features/{id}
    // router.get('/track-audio-features/:id'
    return this.sendRequestToExpress('/track-audio-features/' + encodeURIComponent(trackId)).then(data => {
       return data.items.map(Tracks=>{
         console.log(data.items);
         return new TrackFeature(trackId, Tracks);
      });
     });
    return null;
  }


}

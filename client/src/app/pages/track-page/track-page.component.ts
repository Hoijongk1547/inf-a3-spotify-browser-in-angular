import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
  trackId: string;
  track: TrackData;
  audioFeatures: TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.spotifyService.getTrack(this.trackId).then((data) => {
      this.track = data;

    });
    this.spotifyService.getTopTracksForArtist(this.trackId).then((data) => {
      // this.audioFeatures = data;
      //Type 'TrackData' is missing the following properties from type 
      //'TrackFeature': percent, percentageString, colorts(2345)
  //     id:string;
	// name:string;
  // percent:number;
  // console.log(data);
  //     for(var i =0;i< data.length;i++){
  //       this.audioFeatures.push(data[i][0],data[i][1],data[i][2]);
  //     }
    });
  }

}

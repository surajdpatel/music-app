import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  constructor(private trackService:TrackService) { }

  ngOnInit() {
    this.trackService.getAllSongs().subscribe(data => {
      console.log('data get all songs :::: ',data)
    })
  }

  songPlayClicked(id) {
    this.trackService.getSong(id).subscribe(data => {
      console.log('data get specific songs :::: ',data)
    })
  }
}

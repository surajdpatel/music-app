import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrls: ['./music-upload.component.css']
})
export class MusicUploadComponent implements OnInit {
  currentFile: any = null;
  // songName: string = null;
  songId: string = null;
  uploadWheel: boolean = false;
  showUploadButton: boolean = false;
  uploadMusic_fg: FormGroup;

  constructor(private fb: FormBuilder, private trackService: TrackService) {
    this.uploadMusic_fg = this.fb.group({
      "songName": [null, Validators.compose([null, Validators.required, Validators.maxLength(20), Validators.minLength(3)])]
    });
  }

  ngOnInit() {
    this.uploadMusic_fg.controls.songName.valueChanges.subscribe(data => {
      if (data !== null && data !== undefined && data !== '' && this.currentFile !== null) this.showUploadButton = true
      else this.showUploadButton = false
    })

  }

  uploadFiles(event) {
    if (event.target.files.length > 0) {
      this.currentFile = event.target.files[0];
      const songName_ = this.uploadMusic_fg.controls.songName.value;
      if (songName_ !== null && songName_ !== '' && songName_ !== undefined) {
        this.showUploadButton = true
      }
    }
  }

  submitDetail() {
    this.uploadWheel = true;
    const formData = new FormData();
    formData.append('name', this.uploadMusic_fg.controls.songName.value);
    formData.append('track', this.currentFile);

    this.trackService.uploadTracks(formData).subscribe(success => {
      if (success.success) {
        this.uploadWheel = false
        this.songId = success.data.id
        this.currentFile = null;
        this.uploadMusic_fg.controls.songName.setValue(null);
      }
    },
      (err) => console.log(err)
    );
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  constructor(private http: HttpClient) { }

  uploadTracks(files) {
    return this.http.post<any>(environment.APIURL + '/songs/uploadTracks', files).pipe(map(res => res))
  }

  getAllSongs() {
    return this.http.get<any>(environment.APIURL + '/music/getAllSongs').pipe(map(res => res))
  }

  getSong(id) {
    return this.http.get<any>(environment.APIURL + '/songs/' + id).pipe(map(res => res))
  }
}
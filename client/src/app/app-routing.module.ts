import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MusicUploadComponent } from './components/music/music-upload/music-upload.component';
import { MusicListComponent } from './components/music/music-list/music-list.component';

const routes: Routes = [
  { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'uploadTracks', component: MusicUploadComponent },
  { path: 'list', component: MusicListComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

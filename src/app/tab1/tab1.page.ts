import { Component, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  playlist: Track[] = [
    {
      name: '24 Tears',
      path: './assets/music/24 TEARS.mp3'
    },
    {
      name: 'SleepWalking',
      path: './assets/music/Sleepwalking.mp3'
    },
    {
      name: 'Kaneda',
      path: './assets/music/Kaneda.mp3'
    }
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;

  constructor() {}

  start(track: Track){
    if ( this.player ){
      this.player.stop();
    }    
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
      }    
    });
    this.player.play();
  }

  togglePlayer(pause){
    this.isPlaying = !pause;
    if(pause) {
      this.player.pause();
    }else{
      this.player.play();
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length-1){
      this.start(this.playlist[index+1]);
    }else{
      this.start(this.playlist[0]);
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0){
      this.start(this.playlist[index-1]);
    }else{
      this.start(this.playlist[this.playlist.length-1]);
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = ( seek / this.player.duration()) *100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }
}

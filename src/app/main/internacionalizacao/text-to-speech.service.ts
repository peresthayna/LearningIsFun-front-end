import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private synth: SpeechSynthesis;
  public soundOn: boolean = true;
  public static soundStatusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.synth = window.speechSynthesis;
    TextToSpeechService.soundStatusChanged.subscribe((status: boolean) => this.soundOn = status);
  }

  speak(text: string) {
    if(this.soundOn) {
      const utterance = new SpeechSynthesisUtterance(text);
      this.synth.speak(utterance);
    }
  }

  stop() {
    this.synth.cancel();
  }
}

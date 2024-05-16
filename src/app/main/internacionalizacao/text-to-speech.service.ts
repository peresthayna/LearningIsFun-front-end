import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  speak(text: string) {
    if(localStorage.getItem('sound') == 'true') {
      const utterance = new SpeechSynthesisUtterance(text);
      this.synth.speak(utterance);
    }
  }

  stop() {
    this.synth.cancel();
  }
}

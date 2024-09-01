import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {

  public soundOn: boolean;
  @Input() public home: boolean = false;

  constructor(private ttsService: TextToSpeechService) { }

  ngOnInit(): void {
    if(localStorage.getItem('sound') == "true") {
      this.soundOn = true;
    } else {
      this.soundOn = false;
    }
  }

  public ativarDesativarSom(): void {
    this.soundOn = !this.soundOn;
    localStorage.setItem('sound', this.soundOn.toString());
    this.ttsService.pararLeitura();
  }

}

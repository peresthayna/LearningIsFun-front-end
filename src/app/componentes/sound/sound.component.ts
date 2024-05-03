import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeechService } from 'src/app/main/internacionalizacao/text-to-speech.service';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {

  public soundOn: boolean;
  @Input() public home: boolean = false;

  constructor(
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit(): void {
    this.soundOn = this.ttsService.soundOn;
  }

  public ativarDesativarSom(): void {
    this.soundOn = !this.soundOn;
    TextToSpeechService.soundStatusChanged.emit(this.soundOn);
  }

}

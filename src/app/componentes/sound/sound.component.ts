import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';
import { InternacionalizacaoService } from '../../main/internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {

  public soundOn: boolean;
  public literals: any;
  @Input() public home: boolean = false;

  constructor(
    private ttsService: TextToSpeechService,
    private interService: InternacionalizacaoService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
    if(localStorage.getItem('sound') == "true") {
      this.soundOn = true;
    } else {
      this.soundOn = false;
    }
  }

  public ativarDesativarSom(): void {
    this.ttsService.pararLeitura();
    this.soundOn = !this.soundOn;
    localStorage.setItem('sound', this.soundOn.toString());
  }

  public lerBotao(): void {
    this.ttsService.pararLeitura();
    if(this.soundOn) {
      this.ttsService.lerTexto(this.literals.desativarSom);
    }
  }

  public parar(): void {
    this.ttsService.pararLeitura();
  }

}

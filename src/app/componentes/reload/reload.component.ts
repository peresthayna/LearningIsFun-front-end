import { Component, OnInit } from '@angular/core';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css']
})
export class ReloadComponent implements OnInit {

  constructor(private ttsService: TextToSpeechService) { }

  ngOnInit(): void {
  }

  public reload(): void {
    window.location.reload();
  }

  public lerTexto(): void {
    this.ttsService.lerTexto('Jogar novamente');
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }

}

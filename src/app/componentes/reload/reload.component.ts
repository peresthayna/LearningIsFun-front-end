import { Component, OnInit } from '@angular/core';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';
import { InternacionalizacaoService } from '../../main/internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css']
})
export class ReloadComponent implements OnInit {

  public literals: any;

  constructor(
    private ttsService: TextToSpeechService,
    public interService: InternacionalizacaoService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
  }

  public reload(): void {
    window.location.reload();
  }

  public lerTexto(): void {
    this.ttsService.lerTexto(this.literals.reload);
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }

}

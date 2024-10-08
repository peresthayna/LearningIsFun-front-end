import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';
import { InternacionalizacaoService } from '../../main/internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.css']
})
export class BtnBackComponent implements OnInit {

  literals: any;

  constructor(
    private location: Location,
    private ttsService: TextToSpeechService,
    private interService: InternacionalizacaoService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
  }

  public onBack(): void {
    this.location.back();
  }

  public lerTexto(): void {
    this.ttsService.lerTexto(this.literals.botaoVoltar);
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }

}

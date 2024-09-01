import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.css']
})
export class BtnBackComponent implements OnInit {

  constructor(
    private location: Location,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit(): void {
  }

  public onBack(): void {
    this.location.back();
  }

  public lerTexto(): void {
    this.ttsService.lerTexto('Voltar');
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }

}

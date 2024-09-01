import { Component, Inject, OnInit } from '@angular/core';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';
import { Router } from '@angular/router';
import { TextToSpeechService } from '../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-linguagens',
  templateUrl: './linguagens.component.html',
  styleUrls: ['./linguagens.component.css']
})
export class LinguagensComponent implements OnInit {

  public literals: any;

  constructor(
    private interService: InternacionalizacaoService,
    private router: Router,
    @Inject(TextToSpeechService) private ttsService: TextToSpeechService
    ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
  }

  public selecionarIdioma(idioma: string): void {
    localStorage.setItem('Language', idioma);
    window.location.reload();
  }

  public home(): void {
    this.router.navigate(['/']);
  }

  public redirect(index: number): void {
    this.router.navigate(['/escolherJogo/' + index]);
  }

  lerTexto(texto: string) {
    this.ttsService.lerTexto(texto);
  }

  pararLeitura() {
    this.ttsService.pararLeitura();
  }

}

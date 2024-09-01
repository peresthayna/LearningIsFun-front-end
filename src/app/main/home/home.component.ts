import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/shared/service/usuario.service';
import { TextToSpeechService } from '../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public literals: any;
  public logado: boolean = false;

  constructor(
    private interService: InternacionalizacaoService,
    private router: Router,
    @Inject(UsuarioService) private usuarioService: UsuarioService,
    @Inject(TextToSpeechService) private textToSpeechService: TextToSpeechService,
  ) { }

  ngOnInit(): void {
    this.textToSpeechService.pararLeitura();
    this.literals = this.interService.getIdioma();
    this.logado = this.usuarioService.logado;
    this.textToSpeechService.lerTexto(this.literals.bemVindo);
  }

  lerTexto(texto: string) {
    this.textToSpeechService.lerTexto(texto);
  }

  pararLeitura() {
    this.textToSpeechService.pararLeitura();
  }

  public navigate(rota: string) {
    this.router.navigate([rota]);
  }

  public verificarLogin(rota1: string, rota2: string): void {
    this.router.navigate([this.logado ? rota1 : rota2]);
  }

}

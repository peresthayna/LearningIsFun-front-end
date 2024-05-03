import { Component, OnInit } from '@angular/core';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/shared/service/usuario.service';
import { TextToSpeechService } from '../internacionalizacao/text-to-speech.service';
import { UsuarioConsulta } from '../usuario/shared/model/usuario-consulta.dto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public literals: any;
  public logado: boolean = false;
  public usuarioLogado: UsuarioConsulta = new UsuarioConsulta();

  constructor(
    private interService: InternacionalizacaoService,
    private router: Router,
    private usuarioService: UsuarioService,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
    this.logado = this.usuarioService.logado;
    if(this.logado) { this.usuarioLogado = this.usuarioService.obterUsuarioLogado; }
    this.ttsService.stop();
  }

  lerTexto(texto: string) {
    this.ttsService.speak(texto);
  }

  pararLeitura() {
    this.ttsService.stop();
  }

  public navigate(rota: string) {
    this.router.navigate([rota]);
  }

  public verificarLogin(rota1: string, rota2: string): void {
    this.router.navigate([this.logado ? rota1 : rota2]);
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioConsulta } from '../shared/model/usuario-consulta.dto.model';
import { UsuarioService } from '../shared/service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InternacionalizacaoService } from '../../internacionalizacao/internacionalizacao.service';
import { TextToSpeechService } from '../../internacionalizacao/text-to-speech.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public usuarios: UsuarioConsulta[] = [];
  public literals: any;

  constructor(
    private usuarioService: UsuarioService,
    private interService: InternacionalizacaoService,
    private ttsService: TextToSpeechService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuariosOrdenadosPorNivel();
    this.literals = this.interService.getIdioma();
    this.ttsService.stop();
  }

  public getUsuariosOrdenadosPorNivel(): void {
    this.usuarioService.getUsuariosOrdenadosNivel().subscribe(usuarios => this.usuarios = usuarios,
      (error: HttpErrorResponse) => this.ttsService.speak(this.literals.nenhumJogadorDisponivel)
    )
  }

  lerTexto(texto: string) {
    this.ttsService.speak(texto);
  }

  pararLeitura() {
    this.ttsService.stop();
  }

  public navigateCadastro(): void {
    this.router.navigate(['cadastro']);
  }

}

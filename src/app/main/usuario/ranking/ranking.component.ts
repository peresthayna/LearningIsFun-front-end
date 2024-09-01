import { Component, OnInit } from '@angular/core';
import { UsuarioConsulta } from '../shared/model/usuario-consulta.dto.model';
import { UsuarioService } from '../shared/service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InternacionalizacaoService } from '../../internacionalizacao/internacionalizacao.service';
import { Router } from '@angular/router';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public usuarios: UsuarioConsulta[] = [];
  public literals: any;
  public carregandoRequisicao: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private interService: InternacionalizacaoService,
    private ttsService: TextToSpeechService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregandoRequisicao = true;
    this.getUsuariosOrdenadosPorNivel();
    this.literals = this.interService.getIdioma();
    this.ttsService.pararLeitura();
  }

  public getUsuariosOrdenadosPorNivel(): void {
    this.usuarioService.getUsuariosOrdenadosNivel().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.carregandoRequisicao = false;
    },
      (error: HttpErrorResponse) => this.ttsService.lerTexto(this.literals.nenhumJogadorDisponivel)
    )
  }

  lerTexto(texto: string) {
    this.ttsService.lerTexto(texto);
  }

  pararLeitura() {
    this.ttsService.pararLeitura();
  }

  public navigateCadastro(): void {
    this.router.navigate(['cadastro']);
  }

}

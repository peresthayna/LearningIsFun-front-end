import { Component, OnInit } from '@angular/core';
import { UsuarioConsulta } from '../shared/model/usuario-consulta.dto.model';
import { UsuarioService } from '../shared/service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InternacionalizacaoService } from '../../internacionalizacao/internacionalizacao.service';
import { Router } from '@angular/router';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-escolher-usuario',
  templateUrl: './escolher-usuario.component.html',
  styleUrls: ['./escolher-usuario.component.css']
})
export class EscolherUsuarioComponent implements OnInit {

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
    this.ttsService.pararLeitura();
    this.getUsuarios();
    this.literals = this.interService.getIdioma();
    this.ttsService.lerTexto(this.literals.selecionarJogador);
  }

  public getUsuarios(): void {
    this.carregandoRequisicao = true;
    this.usuarioService.getUsuariosOrdenadosData().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.carregandoRequisicao = false;
      this.ttsService.lerTexto(this.literals.selecionarJogador);
    },
      (error: HttpErrorResponse) => this.ttsService.lerTexto(this.literals.nenhumJogadorDisponivel)
    );
  }

  public selecionarUsuario(usuario: UsuarioConsulta): void {
    this.usuarioService.logar(usuario);
  }

  public navigateCadastro(): void {
    this.router.navigate(['cadastro']);
  }

  public deletarUsuario(usuario: UsuarioConsulta): void {
    this.usuarioService.deletarUsuario(usuario.id).subscribe(
      () => alert('Excluído com sucesso!'),
      (error: HttpErrorResponse) => alert(this.literals.erroExcluir));
    window.location.reload();
    this.getUsuarios();
  }

  public lerTexto(texto: string): void {
    this.ttsService.lerTexto(texto);
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }

}

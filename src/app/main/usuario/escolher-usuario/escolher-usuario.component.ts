import { Component, OnInit } from '@angular/core';
import { UsuarioConsulta } from '../shared/model/usuario-consulta.dto.model';
import { UsuarioService } from '../shared/service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InternacionalizacaoService } from '../../internacionalizacao/internacionalizacao.service';
import { TextToSpeechService } from '../../internacionalizacao/text-to-speech.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escolher-usuario',
  templateUrl: './escolher-usuario.component.html',
  styleUrls: ['./escolher-usuario.component.css']
})
export class EscolherUsuarioComponent implements OnInit {

  public usuarios: UsuarioConsulta[] = [];
  public literals: any;

  constructor(
    private usuarioService: UsuarioService,
    private interService: InternacionalizacaoService,
    private ttsService: TextToSpeechService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.literals = this.interService.getIdioma();
    this.ttsService.stop();
  }

  public getUsuarios(): void {
    this.usuarioService.getUsuariosOrdenadosData().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.ttsService.speak(this.literals.selecionarJogador);
    },
      (error: HttpErrorResponse) => this.ttsService.speak(this.literals.nenhumJogadorDisponivel)
    );
  }

  public selecionarUsuario(usuario: UsuarioConsulta): void {
    this.usuarioService.logar(usuario);
  }

  public navigateCadastro(): void {
    this.router.navigate(['cadastro']);
  }

}

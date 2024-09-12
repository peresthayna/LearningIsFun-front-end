import { Component, Input, OnInit } from '@angular/core';
import { UsuarioConsulta } from '../../main/usuario/shared/model/usuario-consulta.dto.model';
import { UsuarioService } from '../../main/usuario/shared/service/usuario.service';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';
import { InternacionalizacaoService } from '../../main/internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: UsuarioConsulta = new UsuarioConsulta();
  public podeExibir: boolean = false;
  public literals: any;

  constructor(
    private usuarioService: UsuarioService,
    private ttsService: TextToSpeechService,
    private interService: InternacionalizacaoService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
    this.usuario = this.usuarioService.obterUsuarioLogado;
    if(this.usuario != null) { this.podeExibir = true }
    UsuarioService.recarregar.subscribe(value => { if(value) { this.usuarioService.getUsuarioPorId(this.usuario.id).subscribe(u => this.usuario = u) }} )
  }

  public logout(): void {
    this.usuarioService.deslogar();
    this.podeExibir = false;
    window.location.reload();
  }

  public lerTexto(texto: string): void {
    this.ttsService.lerTexto(texto);
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }

}

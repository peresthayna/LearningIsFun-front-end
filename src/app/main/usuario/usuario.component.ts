import { UsuarioService } from './shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioCadastro } from './shared/model/usuario-cadastro.dto.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';
import { TextToSpeechService } from '../internacionalizacao/text-to-speech.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public avatares: string[] = ['assets/icons/1.jpeg','assets/icons/2.jpeg',
  'assets/icons/3.jpeg','assets/icons/4.jpeg','assets/icons/5.jpeg',
  'assets/icons/6.jpeg','assets/icons/7.jpeg','assets/icons/8.jpeg',
  'assets/icons/9.jpeg','assets/icons/10.jpeg'];
  public nome: string = '';
  public avatarEscolhido: string = '';
  public showButton: boolean = false;
  public literals: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private interService: InternacionalizacaoService,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
    this.ttsService.stop();
    this.ttsService.speak('Insira seu nome e escolha um avatar');
  }

  public onValidateName(): void {
    if(this.nome != '' && this.avatarEscolhido != '') {
      this.showButton = true;
    }
  }

  public onSelectAvatar(avatar: string): void {
    this.avatarEscolhido = avatar;
    this.onValidateName();
  }

  public onSaveNewUser(): void {
    let usuario: UsuarioCadastro = new UsuarioCadastro(this.nome, this.avatarEscolhido);
    this.usuarioService.cadastrarUsuario(usuario).subscribe(() => this.router.navigate(['']),
    (error: HttpErrorResponse) => {
      this.ttsService.speak('Não deu certo! Vamos tentar de novo?');
      this.nome = '';
      this.avatarEscolhido = '';
      this.ttsService.speak('Insira seu nome e escolha um avatar');
    });
  }

}

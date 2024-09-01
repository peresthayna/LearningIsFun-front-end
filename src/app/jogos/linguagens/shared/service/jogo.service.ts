import { Injectable } from '@angular/core';
import { UsuarioService } from '../../../../main/usuario/shared/service/usuario.service';
import { UsuarioConsulta } from '../../../../main/usuario/shared/model/usuario-consulta.dto.model';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  public static usuarioLogado: UsuarioConsulta = new UsuarioConsulta();

  constructor(
    private usuarioService: UsuarioService
  ) {
    JogoService.usuarioLogado = this.usuarioService.obterUsuarioLogado;
  }

  public adicionarPontos(): void {
    JogoService.usuarioLogado.pontuacao++;
    this.usuarioService.atualizarUsuario(JogoService.usuarioLogado.id, JogoService.usuarioLogado).subscribe(
      () => UsuarioService.recarregar.emit(true)
    );
  }

  public adicionarNivel(): void {
    JogoService.usuarioLogado.nivel++;
    this.usuarioService.atualizarUsuario(JogoService.usuarioLogado.id, JogoService.usuarioLogado).subscribe(
      () => UsuarioService.recarregar.emit(true)
    );
  }

  public tirarPontos(): void {
    JogoService.usuarioLogado.pontuacao--;
    this.usuarioService.atualizarUsuario(JogoService.usuarioLogado.id, JogoService.usuarioLogado).subscribe(
      () => UsuarioService.recarregar.emit(true)
    );
  }
}

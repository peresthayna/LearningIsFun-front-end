import { Injectable } from '@angular/core';
import { DropItem } from '../model/drop-item.model';
import { UsuarioConsulta } from 'src/app/main/usuario/shared/model/usuario-consulta.dto.model';
import { UsuarioService } from 'src/app/main/usuario/shared/service/usuario.service';

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

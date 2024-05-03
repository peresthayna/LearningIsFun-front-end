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
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario')!)).subscribe(
      usuario => JogoService.usuarioLogado = usuario
    );
  }

  public verificaRespostas(drop: DropItem, acertou: boolean[], acertouTudo: boolean): void {
    if(drop.letra === drop.listaObjetos[0].letra) {
      acertou[drop.posicao] = true;
      this.adicionarPontos();
    } else {
      this.tirarPontos();
      acertou[drop.posicao] = false;
    }
    if(acertou[0] && acertou[1] && acertou[2] && acertou[3] && acertou[4] && acertou[5] && acertou[6] && acertou[7] && acertou[8] && acertou[9] && acertou[3] && acertou[10] && acertou[11] && acertou[12] && acertou[13] && acertou[14] && acertou[15] && acertou[16] && acertou[17] && acertou[18] && acertou[19] && acertou[20] && acertou[21] && acertou[22] && acertou[23] && acertou[24] && acertou[25]) {
      acertouTudo = true;
      this.adicionarNivel();
    }
  }

  public adicionarPontos(): void {
    JogoService.usuarioLogado.pontuacao++;
    this.usuarioService.atualizarUsuario(JogoService.usuarioLogado.id, JogoService.usuarioLogado).subscribe();
  }

  public adicionarNivel(): void {
    JogoService.usuarioLogado.pontuacao++;
    JogoService.usuarioLogado.nivel++;
    this.usuarioService.atualizarUsuario(JogoService.usuarioLogado.id, JogoService.usuarioLogado).subscribe();
  }

  public tirarPontos(): void {
    JogoService.usuarioLogado.pontuacao--;
    this.usuarioService.atualizarUsuario(JogoService.usuarioLogado.id, JogoService.usuarioLogado).subscribe();
  }
}

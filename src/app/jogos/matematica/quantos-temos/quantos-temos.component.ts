import { Component } from '@angular/core';
import { ParteDoCorpo } from '../shared/model/parte-do-corpo.model';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

@Component({
  selector: 'app-quantos-temos',
  templateUrl: './quantos-temos.component.html',
  styleUrls: ['./quantos-temos.component.css','../shared/style.css']
})
export class QuantosTemosComponent {
  public partesDoCorpo: ParteDoCorpo[] = [
    { id: 0, imagem: '../../assets/matematica/quantos-temos/olho.png', quantidade: 2, checkbox: [false, false] },
    { id: 1, imagem: '../../assets/matematica/quantos-temos/mão.png', quantidade: 2, checkbox: [false, false] },
    { id: 2, imagem: '../../assets/matematica/quantos-temos/boca.png', quantidade: 1, checkbox: [false, false] },
    { id: 3, imagem: '../../assets/matematica/quantos-temos/pé.png', quantidade: 2, checkbox: [false, false] },
    { id: 4, imagem: '../../assets/matematica/quantos-temos/orelha.png', quantidade: 2, checkbox: [false, false] },
    { id: 5, imagem: '../../assets/matematica/quantos-temos/nariz.png', quantidade: 1, checkbox: [false, false] }
  ];
  public acertou: boolean[] = [false, false, false, false, false, false];
  public acertouTudo: boolean = false;
  public auxiliar: boolean;
  public literals: any;

  constructor(
    private interService: InternacionalizacaoService,
    private jogoService: JogoService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
  }

  public mudouValor(parte: ParteDoCorpo) {
    if(parte.id == 0 || parte.id == 1 || parte.id == 3 || parte.id == 4) {
      parte.checkbox[0] && parte.checkbox[1] ? this.auxiliar = true : this.auxiliar = false;
      if(this.auxiliar) {
        this.acertou[parte.id] = true;
        ReacoesService.mudarReacao.emit('acertou');
        this.jogoService.adicionarPontos();
      } else {
        this.acertou[parte.id] = false;
        ReacoesService.mudarReacao.emit('curiosa');
      }
    } else {
      if(parte.checkbox[0]) {
        parte.checkbox[1] ? this.auxiliar = false : this.auxiliar = true;
      } else if (parte.checkbox[1]) {
        parte.checkbox[0] ? this.auxiliar = false : this.auxiliar = true;
      }
      if(this.auxiliar) {
        this.acertou[parte.id] = true;
        ReacoesService.mudarReacao.emit('acertou');
        this.jogoService.adicionarPontos();
      } else {
        ReacoesService.mudarReacao.emit('triste');
        this.jogoService.tirarPontos();
      }
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5]) {
      this.acertouTudo = true;
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }
}

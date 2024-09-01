import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

@Component({
  selector: 'app-corpo-humano',
  templateUrl: './corpo-humano.component.html',
  styleUrls: ['./corpo-humano.component.css','../shared/style.css']
})
export class CorpoHumanoComponent {

  public partesDoCorpo: Puzzle[] = [
    { imagem: '../../../assets/ciencias/corpoHumano/1.png', posicaoCorreta: 0 },
    { imagem: '../../../assets/ciencias/corpoHumano/2.png', posicaoCorreta: 4 },
    { imagem: '../../../assets/ciencias/corpoHumano/3.png', posicaoCorreta: 2 },
    { imagem: '../../../assets/ciencias/corpoHumano/4.png', posicaoCorreta: 6 },
    { imagem: '../../../assets/ciencias/corpoHumano/5.png', posicaoCorreta: 8 },
    { imagem: '../../../assets/ciencias/corpoHumano/6.png', posicaoCorreta: 9 },
    { imagem: '../../../assets/ciencias/corpoHumano/7.png', posicaoCorreta: 7 },
    { imagem: '../../../assets/ciencias/corpoHumano/8.png', posicaoCorreta: 5 },
    { imagem: '../../../assets/ciencias/corpoHumano/9.png', posicaoCorreta: 1 },
    { imagem: '../../../assets/ciencias/corpoHumano/10.png', posicaoCorreta: 3 }
  ];
  public listaDrop: Drop[] = [];
  public x: string[] = ['24px','317px'];
  public y: string[] = ['0px','71px','141px','211px','282px'];
  public acertou: boolean[] = [false, false, false, false, false, false, false, false, false, false];
  public acertouTudo: boolean = false;
  public literals: any;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService
  ) { }

  ngOnInit() {
    this.carregarDrops();
    this.literals = this.interService.getIdioma();
  }

  public carregarDrops() {
    this.embaralhaListaService.embaralhaLista(this.partesDoCorpo);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: []},
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: []},
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: []},
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: []},
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: []},
      { posicao: 6, posicaoX: this.x[0], posicaoY: this.y[3], puzzleList: []},
      { posicao: 7, posicaoX: this.x[1], posicaoY: this.y[3], puzzleList: []},
      { posicao: 8, posicaoX: this.x[0], posicaoY: this.y[4], puzzleList: []},
      { posicao: 9, posicaoX: this.x[1], posicaoY: this.y[4], puzzleList: []}
    ];
  }

  public drop(event: CdkDragDrop<Puzzle[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public dropResposta(event: CdkDragDrop<Puzzle[]>, drop: Drop) {
    if(drop.puzzleList.length > 0) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
      );
    this.verificaRespostas(drop);
  }

  public verificaRespostas(drop: Drop): void {
    if(drop.posicao === drop.puzzleList[0].posicaoCorreta) {
      this.acertou[drop.posicao] = true;
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    } else {
      this.acertou[drop.posicao] = false;
      ReacoesService.mudarReacao.emit('triste');
      this.jogoService.tirarPontos();
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5] && this.acertou[6] && this.acertou[7] && this.acertou[8] && this.acertou[9]) {
      this.acertouTudo = true;
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }
}

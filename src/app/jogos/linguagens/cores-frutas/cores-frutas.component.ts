import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../shared/model/puzzle.model';
import { Drop } from '../shared/model/drop.model';
import { EmbaralharListaService } from '../shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../shared/service/jogo.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

@Component({
  selector: 'app-cores-frutas',
  templateUrl: './cores-frutas.component.html',
  styleUrls: ['./cores-frutas.component.css','../shared/style.css']
})
export class CoresFrutasComponent implements OnInit {

  public literals: any;
  public formas: Puzzle[] = [
    { imagem: '../../../assets/lp/frutas/amarelo.png', posicaoCorreta: 0 },
    { imagem: '../../../assets/lp/frutas/roxo.png', posicaoCorreta: 1 },
    { imagem: '../../../assets/lp/frutas/vermelho.png', posicaoCorreta: 2 },
    { imagem: '../../../assets/lp/frutas/verde.png', posicaoCorreta: 3 }
  ];
  public listaDrop: Drop[] = [];
  public x: string[] = ['-125px','25px','175px','325px'];
  public y: string = '50px';
  public acertou: boolean[] = [false, false, false, false];
  public acertouTudo: boolean = false;

  constructor(
    private interService: InternacionalizacaoService,
    private embaralharListaService: EmbaralharListaService,
    private jogoService: JogoService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.carregarDrops();
  }

  public carregarDrops() {
    this.embaralharListaService.embaralhaLista(this.formas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y, puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y, puzzleList: []},
      { posicao: 2, posicaoX: this.x[2], posicaoY: this.y, puzzleList: []},
      { posicao: 3, posicaoX: this.x[3], posicaoY: this.y, puzzleList: []}
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
    if(drop.puzzleList[0].posicaoCorreta == drop.posicao) {
      this.acertou[drop.posicao] = true;
      this.jogoService.adicionarPontos();
      ReacoesService.mudarReacao.emit('acertou');
    } else {
      this.acertou[drop.posicao] = false;
      this.jogoService.tirarPontos();
      ReacoesService.mudarReacao.emit('triste');
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3]) {
      this.acertouTudo = true;
      this.jogoService.adicionarNivel();
      ReacoesService.mudarReacao.emit('acertou tudo');
    }
  }

}

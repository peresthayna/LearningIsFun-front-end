import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

@Component({
  selector: 'app-acessorios',
  templateUrl: './acessorios.component.html',
  styleUrls: ['./acessorios.component.css','../shared/style.css']
})
export class AcessoriosComponent {
  public objetos: Puzzle[] = [
    { imagem: '../../../assets/ciencias/acessorios/1.png', posicaoCorreta: 6 },
    { imagem: '../../../assets/ciencias/acessorios/2.png', posicaoCorreta: 0 },
    { imagem: '../../../assets/ciencias/acessorios/3.png', posicaoCorreta: 2 },
    { imagem: '../../../assets/ciencias/acessorios/4.png', posicaoCorreta: 3 },
    { imagem: '../../../assets/ciencias/acessorios/5.png', posicaoCorreta: 4 },
    { imagem: '../../../assets/ciencias/acessorios/6.png', posicaoCorreta: 7 },
    { imagem: '../../../assets/ciencias/acessorios/7.png', posicaoCorreta: 1 },
    { imagem: '../../../assets/ciencias/acessorios/8.png', posicaoCorreta: 5 }
  ];
  public posicoesCorretasMeiaESapato: number[] = [6,7];
  public listaDrop: Drop[] = [];
  public x: string[] = ['17px','327px'];
  public y: string[] = ['58px','133px','210px','286px'];
  public acertou: boolean[] = [false, false, false, false, false, false, false, false];
  public acertouTudo: boolean = false;
  public literals: any;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService) { }

  ngOnInit() {
    this.carregarDrops();
    this.literals = this.interService.getIdioma();
  }

  public carregarDrops() {
    this.embaralhaListaService.embaralhaLista(this.objetos);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: []},
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: []},
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: []},
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: []},
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: []},
      { posicao: 6, posicaoX: this.x[0], posicaoY: this.y[3], puzzleList: []},
      { posicao: 7, posicaoX: this.x[1], posicaoY: this.y[3], puzzleList: []}
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
    if(drop.posicao === 6 || drop.posicao === 7) {
      if(drop.puzzleList[0].posicaoCorreta == this.posicoesCorretasMeiaESapato[0] || drop.puzzleList[0].posicaoCorreta == this.posicoesCorretasMeiaESapato[1]) {
        this.acertou[drop.posicao] = true;
        ReacoesService.mudarReacao.emit('acertou');
        this.jogoService.adicionarPontos();
      } else {
        this.acertou[drop.posicao] = false;
        ReacoesService.mudarReacao.emit('triste');
        this.jogoService.tirarPontos();
      }
    } else if(drop.posicao === drop.puzzleList[0].posicaoCorreta) {
      this.acertou[drop.posicao] = true;
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    } else {
      this.acertou[drop.posicao] = false;
      ReacoesService.mudarReacao.emit('triste');
        this.jogoService.tirarPontos();
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5] && this.acertou[6] && this.acertou[7]) {
      this.acertouTudo = true;
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }
}

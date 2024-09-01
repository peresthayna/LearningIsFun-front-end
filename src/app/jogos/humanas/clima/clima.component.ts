import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css', '../shared/style.css']
})
export class ClimaComponent {
  public itensClima: Puzzle[] = [
    { imagem: '../../../assets/humanas/clima/biquini.png', posicaoCorreta: 0 }, // Sol
    { imagem: '../../../assets/humanas/clima/bone.png', posicaoCorreta: 0 }, // Sol
    { imagem: '../../../assets/humanas/clima/capadechuva.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/casaco.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/chinelo.png', posicaoCorreta: 0 }, // Sol
    { imagem: '../../../assets/humanas/clima/galochas.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/guardachuva.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/oculosdesol.png', posicaoCorreta: 0 } // Sol
  ];

  public listaDrop: Drop[] = [];
  public x: string[] = ['50px','350px'];
  public y: string[] = ['50px'];
  public acertou: boolean[] = [false, false];
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
    this.embaralhaListaService.embaralhaLista(this.itensClima);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: [] },
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: [] }
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
    if(this.acertou[0] && this.acertou[1]) {
      this.acertouTudo = true;
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }
}

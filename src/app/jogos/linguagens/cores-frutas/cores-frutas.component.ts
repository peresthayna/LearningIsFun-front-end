import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../shared/model/puzzle.model';
import { Drop } from '../shared/model/drop.model';
import { EmbaralharListaService } from '../shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../shared/service/jogo.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { PuzzleNome } from '../shared/model/puzzle-nome';
import { DropNome } from '../shared/model/drop-nome';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-cores-frutas',
  templateUrl: './cores-frutas.component.html',
  styleUrls: ['./cores-frutas.component.css','../shared/style.css']
})
export class CoresFrutasComponent implements OnInit {

  public literals: any;
  public frutas: PuzzleNome[] = [];
  public listaDrop: DropNome[] = [];
  public x: string[] = ['-125px','25px','175px','325px'];
  public y: string = '50px';
  public acertou: boolean[] = [false, false, false, false];
  public acertouTudo: boolean = false;

  constructor(
    private interService: InternacionalizacaoService,
    private embaralharListaService: EmbaralharListaService,
    private jogoService: JogoService,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.carregarDrops();
    this.ttsService.lerTexto(this.literals.jogoCoresFrutasDescricao + '. ' + this.literals.jogoCoresFrutasDica, true);
  }

  public carregarDrops() {
    this.frutas = [
      { imagem: '../../../assets/lp/frutas/amarelo.png', posicaoCorreta: 0, nome: this.literals.amarelo },
      { imagem: '../../../assets/lp/frutas/roxo.png', posicaoCorreta: 1, nome: this.literals.roxo },
      { imagem: '../../../assets/lp/frutas/vermelho.png', posicaoCorreta: 2, nome: this.literals.vermelho },
      { imagem: '../../../assets/lp/frutas/verde.png', posicaoCorreta: 3, nome: this.literals.verde }
    ];
    this.embaralharListaService.embaralhaLista(this.frutas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y, puzzleList: [], nome: this.literals.banana },
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y, puzzleList: [], nome: this.literals.uva },
      { posicao: 2, posicaoX: this.x[2], posicaoY: this.y, puzzleList: [], nome: this.literals.morango },
      { posicao: 3, posicaoX: this.x[3], posicaoY: this.y, puzzleList: [], nome: this.literals.pera }
    ];
  }

  public drop(event: CdkDragDrop<PuzzleNome[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public dropResposta(event: CdkDragDrop<PuzzleNome[]>, drop: DropNome) {
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

  public verificaRespostas(drop: DropNome): void {
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

  public lerTexto(texto: string): void {
    this.ttsService.lerTexto(texto);
  }

  public parar(): void {
    this.ttsService.pararLeitura();
  }

}

import { Component } from '@angular/core';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { PuzzleDuasRespostas } from '../../linguagens/shared/model/puzzle-duas-respostas.model';
import { DropDuasRespostas } from '../../linguagens/shared/model/drop-duas-respostas.model';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';
import { PuzzleNomeDuasRespostas } from '../../linguagens/shared/model/puzzle-nome-duas-respostas';
import { DropNome } from '../../linguagens/shared/model/drop-nome';
import { DropNomeDuasRespostas } from '../../linguagens/shared/model/drop-nome-duas-respostas';

@Component({
  selector: 'app-formas',
  templateUrl: './formas.component.html',
  styleUrls: ['./formas.component.css','../shared/style.css']
})
export class FormasComponent {
  public literals: any;
  public formas: PuzzleNomeDuasRespostas[] = [];
  public listaDrop: DropNomeDuasRespostas[] = [];
  public x: string[] = ['-30px','243px'];
  public y: string[] = ['-2px','119px','235px'];
  public acertou: boolean[] = [false, false, false, false, false, false];
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
    this.lerTexto(this.literals.jogoQtdeFormasDescricao + '. ' + this.literals.jogoQtdeFormasDica);
  }

  public carregarDrops() {
    this.formas = [
      { imagem: '../../../assets/matematica/quantidade-formas/1.jpg', posicaoCorreta: [0, 3], nome: this.literals.umCoracao },
      { imagem: '../../../assets/matematica/quantidade-formas/2.jpg', posicaoCorreta: [2, 5], nome: this.literals.doisQuadrados },
      { imagem: '../../../assets/matematica/quantidade-formas/3.jpg', posicaoCorreta: [1, 4], nome: this.literals.tresEstrelas },
      { imagem: '../../../assets/matematica/quantidade-formas/4.jpg', posicaoCorreta: [2, 5], nome: this.literals.doisCirculos },
      { imagem: '../../../assets/matematica/quantidade-formas/5.jpg', posicaoCorreta: [1, 4], nome: this.literals.tresTriangulos },
      { imagem: '../../../assets/matematica/quantidade-formas/6.jpg', posicaoCorreta: [0, 3], nome: this.literals.umCirculo }
    ];
    this.embaralharListaService.embaralhaLista(this.formas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: [], nome: '1'},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: [], nome: '3' },
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: [], nome: '2' },
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: [], nome: '1' },
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: [], nome: '3' },
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: [], nome: '2' }
    ];
  }

  public drop(event: CdkDragDrop<PuzzleNomeDuasRespostas[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public dropResposta(event: any, drop: any) {
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

  public verificaRespostas(drop: DropNomeDuasRespostas): void {
    if(drop.puzzleList[0].posicaoCorreta.includes(drop.posicao)) {
      this.acertou[drop.posicao] = true;
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    } else {
      this.jogoService.tirarPontos();
      this.acertou[drop.posicao] = false;
      ReacoesService.mudarReacao.emit('triste');
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5]) {
      this.acertouTudo = true;
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }

  public lerTexto(texto: string): void {
    this.ttsService.pararLeitura();
    setTimeout(() => {
      this.ttsService.lerTexto(texto);
    }, 200);
  }

  public parar(): void {
    this.ttsService.pararLeitura();
  }
}

import { ParteDoCorpo } from './../../matematica/shared/model/parte-do-corpo.model';
import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';
import { PuzzleNome } from '../../linguagens/shared/model/puzzle-nome';
import { DropNome } from '../../linguagens/shared/model/drop-nome';

@Component({
  selector: 'app-corpo-humano',
  templateUrl: './corpo-humano.component.html',
  styleUrls: ['./corpo-humano.component.css','../shared/style.css']
})
export class CorpoHumanoComponent {

  public partesDoCorpo: PuzzleNome[] = [];
  public listaDrop: DropNome[] = [];
  public x: string[] = ['24px','317px'];
  public y: string[] = ['0px','71px','141px','211px','282px'];
  public acertou: boolean[] = [false, false, false, false, false, false, false, false, false, false];
  public acertouTudo: boolean = false;
  public literals: any;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.carregarDrops();
    this.ttsService.lerTexto(this.literals.jogoCorpoHumanoDescricao + '. ' + this.literals.jogoCorpoHumanoDica, true);
  }

  public carregarDrops() {
    this.partesDoCorpo = [
      { imagem: '../../../assets/ciencias/corpoHumano/1.png', posicaoCorreta: 0, nome: this.literals.olhos },
      { imagem: '../../../assets/ciencias/corpoHumano/2.png', posicaoCorreta: 4, nome: this.literals.boca },
      { imagem: '../../../assets/ciencias/corpoHumano/3.png', posicaoCorreta: 2, nome: this.literals.nariz },
      { imagem: '../../../assets/ciencias/corpoHumano/4.png', posicaoCorreta: 6, nome: this.literals.perna },
      { imagem: '../../../assets/ciencias/corpoHumano/5.png', posicaoCorreta: 8, nome: this.literals.joelho },
      { imagem: '../../../assets/ciencias/corpoHumano/6.png', posicaoCorreta: 9, nome: this.literals.pes },
      { imagem: '../../../assets/ciencias/corpoHumano/7.png', posicaoCorreta: 7, nome: this.literals.braco },
      { imagem: '../../../assets/ciencias/corpoHumano/8.png', posicaoCorreta: 5, nome: this.literals.maos },
      { imagem: '../../../assets/ciencias/corpoHumano/9.png', posicaoCorreta: 1, nome: this.literals.cabeca },
      { imagem: '../../../assets/ciencias/corpoHumano/10.png', posicaoCorreta: 3, nome: this.literals.orelhas }
    ];
    this.embaralhaListaService.embaralhaLista(this.partesDoCorpo);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: [], nome: this.literals.olhos },
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: [], nome: this.literals.cabeca },
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: [], nome: this.literals.nariz },
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: [], nome: this.literals.orelhas },
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: [], nome: this.literals.boca },
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: [], nome: this.literals.maos },
      { posicao: 6, posicaoX: this.x[0], posicaoY: this.y[3], puzzleList: [], nome: this.literals.perna },
      { posicao: 7, posicaoX: this.x[1], posicaoY: this.y[3], puzzleList: [], nome: this.literals.braco },
      { posicao: 8, posicaoX: this.x[0], posicaoY: this.y[4], puzzleList: [], nome: this.literals.joelho },
      { posicao: 9, posicaoX: this.x[1], posicaoY: this.y[4], puzzleList: [], nome: this.literals.pes }
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

  public lerTexto(texto: string): void {
    this.ttsService.lerTexto(texto);
  }

  public parar(): void {
    this.ttsService.pararLeitura();
  }
}

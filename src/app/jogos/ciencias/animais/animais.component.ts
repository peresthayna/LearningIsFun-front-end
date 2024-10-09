import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { PuzzleNome } from '../../linguagens/shared/model/puzzle-nome';
import { DropNome } from '../../linguagens/shared/model/drop-nome';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css','../shared/style.css']
})
export class AnimaisComponent {
  public literals: any;
  public formas: PuzzleNome[] = [];
  public listaDrop: DropNome[] = [];
  public x: string[] = ['-110px','40px','190px','340px'];
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
    this.ttsService.lerTexto(this.literals.jogoFilhotesDescricao + '. ' + this.literals.jogoFilhotesDica, true);
  }

  public carregarDrops() {
    this.formas = [
      { imagem: '../../../assets/ciencias/animais/filhote.png', posicaoCorreta: 0, nome: this.literals.cachorrinho },
      { imagem: '../../../assets/ciencias/animais/passarinho.png', posicaoCorreta: 1, nome: this.literals.pintinho },
      { imagem: '../../../assets/ciencias/animais/leaozinho.png', posicaoCorreta: 2, nome: this.literals.leaozinho },
      { imagem: '../../../assets/ciencias/animais/ursinho.png', posicaoCorreta: 3, nome: this.literals.ursinho }
    ];
    this.embaralharListaService.embaralhaLista(this.formas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y, puzzleList: [], nome: this.literals.cachorro },
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y, puzzleList: [], nome: this.literals.galo },
      { posicao: 2, posicaoX: this.x[2], posicaoY: this.y, puzzleList: [], nome: this.literals.leao },
      { posicao: 3, posicaoX: this.x[3], posicaoY: this.y, puzzleList: [], nome: this.literals.urso }
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
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    } else {
      this.acertou[drop.posicao] = false;
      ReacoesService.mudarReacao.emit('triste');
      this.jogoService.tirarPontos();
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3]) {
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

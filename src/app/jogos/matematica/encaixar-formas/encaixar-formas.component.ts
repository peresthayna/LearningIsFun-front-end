import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { Drop } from '../../linguagens/shared/model/drop.model';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';
import { PuzzleNome } from '../../linguagens/shared/model/puzzle-nome';
import { DropNome } from '../../linguagens/shared/model/drop-nome';

@Component({
  selector: 'app-encaixar-formas',
  templateUrl: './encaixar-formas.component.html',
  styleUrls: ['./encaixar-formas.component.css','../shared/style.css']
})
export class EncaixarFormasComponent {
  public literals: any;
  public formas: PuzzleNome[] = [];
  public listaDrop: DropNome[] = [];
  public x: string[] = ['-110px','40px','190px','340px'];
  public y: string = '55px';
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
    this.lerTexto(this.literals.jogoEncaixarFormasDescricao + '. ' + this.literals.jogoEncaixarFormasDica);
  }

  public carregarDrops() {
    this.formas = [
      { imagem: '../../../assets/matematica/encaixar-formas/circulo.png', posicaoCorreta: 1, nome: this.literals.circulo },
      { imagem: '../../../assets/matematica/encaixar-formas/quadrado.png', posicaoCorreta: 2, nome: this.literals.quadrado },
      { imagem: '../../../assets/matematica/encaixar-formas/retangulo.png', posicaoCorreta: 3, nome: this.literals.retangulo },
      { imagem: '../../../assets/matematica/encaixar-formas/triangulo.png', posicaoCorreta: 0, nome: this.literals.triangulo }
    ];
    this.embaralharListaService.embaralhaLista(this.formas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y, puzzleList: [], nome: this.literals.triangulo},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y, puzzleList: [], nome: this.literals.quadrado},
      { posicao: 2, posicaoX: this.x[2], posicaoY: this.y, puzzleList: [], nome: this.literals.retangulo},
      { posicao: 3, posicaoX: this.x[3], posicaoY: this.y, puzzleList: [], nome: this.literals.triangulo }
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
      this.jogoService.tirarPontos();
      this.acertou[drop.posicao] = false;
      ReacoesService.mudarReacao.emit('triste');
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3]) {
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

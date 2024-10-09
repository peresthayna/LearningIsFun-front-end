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
  selector: 'app-acessorios',
  templateUrl: './acessorios.component.html',
  styleUrls: ['./acessorios.component.css','../shared/style.css']
})
export class AcessoriosComponent {
  public objetos: PuzzleNome[] = [];
  public posicoesCorretasMeiaESapato: number[] = [6,7];
  public listaDrop: DropNome[] = [];
  public x: string[] = ['17px','327px'];
  public y: string[] = ['58px','133px','210px','286px'];
  public acertou: boolean[] = [false, false, false, false, false, false, false, false];
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
    this.ttsService.lerTexto(this.literals.jogoAcessoriosDescricao + '. ' + this.literals.jogoAcessoriosDica, true)
  }

  public carregarDrops() {
    this.objetos = [
      { imagem: '../../../assets/ciencias/acessorios/1.png', posicaoCorreta: 6, nome: this.literals.meias },
      { imagem: '../../../assets/ciencias/acessorios/2.png', posicaoCorreta: 0, nome: this.literals.laco },
      { imagem: '../../../assets/ciencias/acessorios/3.png', posicaoCorreta: 2, nome: this.literals.oculos },
      { imagem: '../../../assets/ciencias/acessorios/4.png', posicaoCorreta: 3, nome: this.literals.anel },
      { imagem: '../../../assets/ciencias/acessorios/5.png', posicaoCorreta: 4, nome: this.literals.saia },
      { imagem: '../../../assets/ciencias/acessorios/6.png', posicaoCorreta: 7, nome: this.literals.sapatilha },
      { imagem: '../../../assets/ciencias/acessorios/7.png', posicaoCorreta: 1, nome: this.literals.brincos },
      { imagem: '../../../assets/ciencias/acessorios/8.png', posicaoCorreta: 5, nome: this.literals.blusa }
    ];
    this.embaralhaListaService.embaralhaLista(this.objetos);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: [], nome: this.literals.cabelos},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: [], nome: this.literals.orelhas},
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: [], nome: this.literals.olhos},
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: [], nome: this.literals.maos},
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: [], nome: this.literals.pernas},
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: [], nome: this.literals.tronco},
      { posicao: 6, posicaoX: this.x[0], posicaoY: this.y[3], puzzleList: [], nome: this.literals.pes},
      { posicao: 7, posicaoX: this.x[1], posicaoY: this.y[3], puzzleList: [], nome: this.literals.pes}
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

  public lerTexto(texto: string): void {
    this.ttsService.lerTexto(texto);
  }

  public parar(): void {
    this.ttsService.pararLeitura();
  }
}

import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { PuzzleNome } from '../../linguagens/shared/model/puzzle-nome';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

export class Coluna {
  literals: string;
  puzzleItems: PuzzleNome[];
  posicao: number;
  class: string;
  img: string;

  constructor(literals: string, puzzleItems: PuzzleNome[], posicao: number, classCss: string, img: string) {
    this.literals = literals;
    this.puzzleItems = puzzleItems;
    this.posicao = posicao;
    this.class = classCss;
    this.img = img;
  }
}

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css', '../shared/style.css']
})
export class ClimaComponent {
  public puzzleItems: PuzzleNome[] = [];
  public colunas: Coluna[] = [];
  public literals: any;
  public acertou: boolean[] = [false, false, false, false, false, false, false, false];
  public acertouTudo: boolean = false;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.ttsService.lerTexto(this.literals.jogoClimaDescricao + '. ' + this.literals.jogoClimaDica, true);
    this.carregarColunas();
    this.embaralhaListaService.embaralhaLista(this.puzzleItems);
  }

  public carregarColunas(): void {
    this.puzzleItems = [
      { imagem: '../../../assets/humanas/clima/biquini.png', posicaoCorreta: 0, nome: this.literals.biquini }, // Sol
      { imagem: '../../../assets/humanas/clima/bone.png', posicaoCorreta: 0, nome: this.literals.bone }, // Sol
      { imagem: '../../../assets/humanas/clima/capadechuva.png', posicaoCorreta: 1, nome: this.literals.capaChuva }, // Chuva
      { imagem: '../../../assets/humanas/clima/casaco.png', posicaoCorreta: 1, nome: this.literals.casaco }, // Chuva
      { imagem: '../../../assets/humanas/clima/chinelo.png', posicaoCorreta: 0, nome: this.literals.chinelo }, // Sol
      { imagem: '../../../assets/humanas/clima/galochas.png', posicaoCorreta: 1, nome: this.literals.galochas }, // Chuva
      { imagem: '../../../assets/humanas/clima/guardachuva.png', posicaoCorreta: 1, nome: this.literals.guardaChuva }, // Chuva
      { imagem: '../../../assets/humanas/clima/oculosdesol.png', posicaoCorreta: 0, nome: this.literals.oculosSol } // Sol
    ];
    this.colunas = [
      new Coluna(this.literals.sol, [], 0, 'drop-place-sun', '../../../assets/humanas/clima/sol.jpg'),
      new Coluna(this.literals.chuva, [], 1, 'drop-place-rain', '../../../assets/humanas/clima/chuva.png'),
      new Coluna(this.literals.objetos, this.puzzleItems, -1, 'drop-place-objects', '')
    ];
  }


  public drop(event: CdkDragDrop<PuzzleNome[]>, coluna: Coluna) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    this.verificarResposta(event, coluna);
  }

  public verificarResposta(event: CdkDragDrop<PuzzleNome[]>, coluna: Coluna) {
    if(coluna.posicao === -1
      || event.container === event.previousContainer) {
        return;
      }

    if(event.container.data[event.currentIndex].posicaoCorreta === coluna.posicao) {
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    } else {
      ReacoesService.mudarReacao.emit('triste');
      this.jogoService.tirarPontos();
    }
    this.acertouTudo = this.colunas.every(coluna =>
      coluna.puzzleItems.every(item => item.posicaoCorreta === coluna.posicao)
    );
    if(this.acertouTudo) {
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

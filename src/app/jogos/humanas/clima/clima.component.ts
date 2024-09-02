import { Component } from '@angular/core';
import { Puzzle } from '../../linguagens/shared/model/puzzle.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

export class Coluna {
  literals: string;
  puzzleItems: Puzzle[];
  posicao: number;
  class: string;
  img: string;

  constructor(literals: string, puzzleItems: Puzzle[], posicao: number, classCss: string, img: string) {
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
  public puzzleItems: Puzzle[] = [
    { imagem: '../../../assets/humanas/clima/biquini.png', posicaoCorreta: 0 }, // Sol
    { imagem: '../../../assets/humanas/clima/bone.png', posicaoCorreta: 0 }, // Sol
    { imagem: '../../../assets/humanas/clima/capadechuva.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/casaco.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/chinelo.png', posicaoCorreta: 0 }, // Sol
    { imagem: '../../../assets/humanas/clima/galochas.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/guardachuva.png', posicaoCorreta: 1 }, // Chuva
    { imagem: '../../../assets/humanas/clima/oculosdesol.png', posicaoCorreta: 0 } // Sol
  ];

  public colunas: Coluna[] = [
    new Coluna('sol', [], 0, 'drop-place-sun', '../../../assets/humanas/clima/sol.jpg'),
    new Coluna('chuva', [], 1, 'drop-place-rain', '../../../assets/humanas/clima/chuva.png'),
    new Coluna('objetos', this.puzzleItems, -1, 'drop-place-objects', '')
  ];
  public literals: any;
  public acertou: boolean[] = [false, false, false, false, false, false, false, false];
  public acertouTudo: boolean = false;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.embaralhaListaService.embaralhaLista(this.puzzleItems);
  }


  public drop(event: CdkDragDrop<Puzzle[]>, coluna: Coluna) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    this.verificarResposta(event, coluna);
  }

  public verificarResposta(event: CdkDragDrop<Puzzle[]>, coluna: Coluna) {
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
}

import { Coracao } from './../shared/model/coracao.model';
import { Component, OnInit } from '@angular/core';
import { Resposta } from '../shared/model/resposta.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-coracoes',
  templateUrl: './coracoes.component.html',
  styleUrls: ['./coracoes.component.css', '../shared/style.css']
})
export class CoracoesComponent implements OnInit {

  public coracoes: Coracao[] = [];
  public lista: number[] = [];
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
    this.getCoracoes();
    this.ttsService.lerTexto(this.literals.jogoCoracoesDescricao + '. ' + this.literals.jogoCoracoesDica, true);
  }

  public getCoracoes(): void {
    ReacoesService.mudarReacao.emit('curiosa');
    for(let i=0; i<10; i++) {
      this.lista[i] = i+1;
    }
    this.embaralhaListaService.embaralhaLista(this.lista);
    for(let i=0; i<8; i++) {
      this.coracoes[i] = new Coracao();
      this.coracoes[i].imagem = '/assets/matematica/coracoes/coracoes_' + this.lista[i] + '.png';
      this.coracoes[i].respostaCerta = this.lista[i];
      this.coracoes[i].posicao = i;
      this.coracoes[i].respostas[0] = new Resposta();
      this.coracoes[i].respostas[0].resposta = this.lista[i];
      let numeros: number[] = [];
      for (let j=1; j<10; j++) {
        if ((j)!==this.lista[i]) {
          numeros.push(j);
        }
      }
      this.embaralhaListaService.embaralhaLista(numeros);
      for (let j = 1; j < 3; j++) {
        this.coracoes[i].respostas[j] = new Resposta();
        this.coracoes[i].respostas[j].resposta = numeros[j];
      }
      for (let j=0; j<3; j++) {
        this.coracoes[i].respostas[j].cor = '#ffffff';
        this.coracoes[i].respostas[j].isBloqueado = false;
      }
      this.embaralhaListaService.embaralhaLista(this.coracoes[i].respostas);
    }
  }

  public verificarResposta(coracao: Coracao, resposta: Resposta)  {
    if(resposta.resposta === coracao.respostaCerta) {
      resposta.cor = '#00ff00';
      coracao.acertou = true;
      for(let i = 0; i < 3; i++) {
        coracao.respostas[i].isBloqueado = true;
      }
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    } else {
      this.jogoService.tirarPontos();
      resposta.cor = '#ff0000';
      resposta.isBloqueado = true;
      ReacoesService.mudarReacao.emit('triste');

    }
    this.verificarAcertouTudo();
  }

  public verificarAcertouTudo(): void {
    this.acertouTudo = true;
    for(let i=0; i<8; i++) {
      if(!this.coracoes[i].acertou) {
        this.acertouTudo = false;
      }
    }
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

import { Palavra } from './../shared/model/palavra.model';
import { Component, OnInit } from '@angular/core';
import { Resposta } from '../shared/model/resposta.model';
import { EmbaralharListaService } from '../shared/service/embaralha-lista.service';
import { JogoService } from '../shared/service/jogo.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { TextToSpeechService } from '../../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-cores',
  templateUrl: './cores.component.html',
  styleUrls: ['./cores.component.css','../shared/style.css']
})
export class CoresComponent implements OnInit {

  public palavras: Palavra[] = [];
  public alfabeto: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
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
    this.getPalavras();
    this.ttsService.lerTexto(this.literals.jogoCoresDescricao + '. ' + this.literals.jogoCoresDica);
  }

  public getPalavras(): void {
    ReacoesService.mudarReacao.emit('curiosa');
    this.palavras[0] = new Palavra(); this.palavras[0].palavra = this.literals.palavraVermelho; this.palavras[0].respostaCerta = this.literals.respostaVermelho;
    this.palavras[1] = new Palavra(); this.palavras[1].palavra = this.literals.palavraVerde; this.palavras[1].respostaCerta = this.literals.respostaVerde;
    this.palavras[2] = new Palavra(); this.palavras[2].palavra = this.literals.palavraAzul; this.palavras[2].respostaCerta = this.literals.respostaAzul;
    this.palavras[3] = new Palavra(); this.palavras[3].palavra = this.literals.palavraRoxo; this.palavras[3].respostaCerta = this.literals.respostaRoxo;
    this.palavras[4] = new Palavra(); this.palavras[4].palavra = this.literals.palavraRosa; this.palavras[4].respostaCerta = this.literals.respostaRosa;
    this.palavras[5] = new Palavra(); this.palavras[5].palavra = this.literals.palavraAmarelo; this.palavras[5].respostaCerta = this.literals.respostaAmarelo;
    this.palavras[6] = new Palavra(); this.palavras[6].palavra = this.literals.palavraMarrom; this.palavras[6].respostaCerta = this.literals.respostaMarrom;
    this.palavras[7] = new Palavra(); this.palavras[7].palavra = this.literals.palavraPreto; this.palavras[7].respostaCerta = this.literals.respostaPreto;
    this.embaralhaListaService.embaralhaLista(this.alfabeto);
    for(let i=0; i<8; i++) {
      this.palavras[i].respostas[0] = new Resposta();
      this.palavras[i].respostas[1] = new Resposta();
      this.palavras[i].respostas[2] = new Resposta();
    }
    this.palavras[0].respostas[0].resposta = this.literals.respostaVermelho;
    this.palavras[1].respostas[0].resposta = this.literals.respostaVerde;
    this.palavras[2].respostas[0].resposta = this.literals.respostaAzul;
    this.palavras[3].respostas[0].resposta = this.literals.respostaRoxo;
    this.palavras[4].respostas[0].resposta = this.literals.respostaRosa;
    this.palavras[5].respostas[0].resposta = this.literals.respostaAmarelo;
    this.palavras[6].respostas[0].resposta = this.literals.respostaMarrom;
    this.palavras[7].respostas[0].resposta = this.literals.respostaPreto;
    for(let i=0; i<8; i++) {
      this.palavras[i].imagem = '/assets/lp/cores/' + (i+1) + '.png';
      this.embaralhaListaService.embaralhaLista(this.alfabeto);
      for (let j = 1; j < 3; j++) {
        this.palavras[i].respostas[j] = new Resposta();
        if(this.alfabeto[j] == this.palavras[i].respostaCerta) {
          j--;
          this.embaralhaListaService.embaralhaLista(this.alfabeto);
        } else {
          this.palavras[i].respostas[j].resposta = this.alfabeto[j];
        }
      }
      for (let j=0; j<3; j++) {
        this.palavras[i].respostas[j].cor = '#ffffff';
        this.palavras[i].respostas[j].isBloqueado = false;
      }
      this.embaralhaListaService.embaralhaLista(this.palavras[i].respostas);
    }
    this.embaralhaListaService.embaralhaLista(this.palavras);
  }

  public verificarResposta(palavra: Palavra, resposta: Resposta)  {
    if(resposta.resposta === palavra.respostaCerta) {
      resposta.cor = '#00ff00';
      palavra.acertou = true;
      for(let i = 0; i < 3; i++) {
        palavra.respostas[i].isBloqueado = true;
      }
      this.jogoService.adicionarPontos();
      ReacoesService.mudarReacao.emit('acertou');
    }
    else {
      resposta.cor = '#ff0000';
      resposta.isBloqueado = true;
      this.jogoService.tirarPontos();
      ReacoesService.mudarReacao.emit('triste');
    }
    this.verificarAcertouTudo();
  }

  public verificarAcertouTudo(): void {
    this.acertouTudo = true;
    for(let i=0; i<8; i++) {
      if(!this.palavras[i].acertou) {
        this.acertouTudo = false;
      }
    }
    if(this.acertouTudo) {
      this.jogoService.adicionarNivel();
      ReacoesService.mudarReacao.emit('acertou tudo');
    }
  }

  public lerTexto(texto: string): void {
    this.ttsService.pararLeitura();
    setTimeout(() => {
      this.ttsService.lerTexto(texto);
    }, 200);
  }

  public lerUndescore(texto: string): void {
    texto = texto.replace(/_/g, "");
    this.lerTexto(texto);
  }

  public parar(): void {
    this.ttsService.pararLeitura();
  }

}

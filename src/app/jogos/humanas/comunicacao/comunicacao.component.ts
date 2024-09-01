import { Component } from '@angular/core';
import { Palavra } from '../../linguagens/shared/model/palavra.model';
import { EmbaralharListaService } from '../../linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { JogoService } from '../../linguagens/shared/service/jogo.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';
import { Resposta } from '../../linguagens/shared/model/resposta.model';

@Component({
  selector: 'app-comunicacao',
  templateUrl: './comunicacao.component.html',
  styleUrls: ['./comunicacao.component.css', '../shared/style.css']
})
export class ComunicacaoComponent {
  public palavras: Palavra[] = [];
  public alfabeto: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public acertouTudo: boolean = false;
  public literals: any;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService
  ) { }

  ngOnInit() {
    this.getPalavras();
    this.literals = this.interService.getIdioma();
  }

  public getPalavras(): void {
    ReacoesService.mudarReacao.emit('curiosa');
    this.palavras[0] = new Palavra(); this.palavras[0].palavra = '_ELEVISÃO'; this.palavras[0].respostaCerta = 'T';
    this.palavras[1] = new Palavra(); this.palavras[1].palavra = '_ÁDIO'; this.palavras[1].respostaCerta = 'R';
    this.palavras[2] = new Palavra(); this.palavras[2].palavra = '_ORNAL'; this.palavras[2].respostaCerta = 'J';
    this.palavras[3] = new Palavra(); this.palavras[3].palavra = '_EVISTA'; this.palavras[3].respostaCerta = 'R';
    this.palavras[4] = new Palavra(); this.palavras[4].palavra = '_INEMA'; this.palavras[4].respostaCerta = 'C';
    this.palavras[5] = new Palavra(); this.palavras[5].palavra = '_EATRO'; this.palavras[5].respostaCerta = 'T';
    this.palavras[6] = new Palavra(); this.palavras[6].palavra = '_ELULAR'; this.palavras[6].respostaCerta = 'C';
    this.palavras[7] = new Palavra(); this.palavras[7].palavra = '_OMPUTADOR'; this.palavras[7].respostaCerta = 'C';
    this.embaralhaListaService.embaralhaLista(this.alfabeto);
    for(let i=0; i<8; i++) {
      this.palavras[i].respostas[0] = new Resposta();
      this.palavras[i].respostas[1] = new Resposta();
      this.palavras[i].respostas[2] = new Resposta();
    }
    this.palavras[0].respostas[0].resposta = 'T';
    this.palavras[1].respostas[0].resposta = 'R';
    this.palavras[2].respostas[0].resposta = 'J';
    this.palavras[3].respostas[0].resposta = 'R';
    this.palavras[4].respostas[0].resposta = 'C';
    this.palavras[5].respostas[0].resposta = 'T';
    this.palavras[6].respostas[0].resposta = 'C';
    this.palavras[7].respostas[0].resposta = 'C';
    for(let i=0; i<8; i++) {
      this.palavras[i].imagem = '/assets/humanas/comunicacao/' + (i+1) + '.png';
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
      ReacoesService.mudarReacao.emit('acertou');
      this.jogoService.adicionarPontos();
    }
    else {
      this.jogoService.tirarPontos();
      resposta.cor = '#ff0000';
      resposta.isBloqueado = true;
      ReacoesService.mudarReacao.emit('errou');
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
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }
}

import { Palavra } from './../shared/model/palavra.model';
import { Component, OnInit } from '@angular/core';
import { InternacionalizacaoService } from 'src/app/main/internacionalizacao/internacionalizacao.service';
import { Resposta } from '../shared/model/resposta.model';
import { EmbaralharListaService } from '../shared/service/embaralha-lista.service';
import { UsuarioService } from 'src/app/main/usuario/shared/service/usuario.service';
import { UsuarioConsulta } from 'src/app/main/usuario/shared/model/usuario-consulta.dto.model';
import { JogoService } from '../shared/service/jogo.service';

@Component({
  selector: 'app-cores',
  templateUrl: './cores.component.html',
  styleUrls: ['./cores.component.css','../shared/style.css']
})
export class CoresComponent implements OnInit {

  public palavras: Palavra[] = [];
  public alfabeto: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public ativarLeoOk: boolean = false;
  public literals: any;
  private usuario: UsuarioConsulta = new UsuarioConsulta();
  public recarregarPerfil: boolean = false;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService,
  ) { }

  ngOnInit() {
    this.getPalavras();
    this.literals = this.interService.getIdioma();
  }

  public getPalavras(): void {
    this.ativarLeoCurioso = true;
    this.palavras[0] = new Palavra(); this.palavras[0].palavra = '_ERMELHO'; this.palavras[0].respostaCerta = 'V';
    this.palavras[1] = new Palavra(); this.palavras[1].palavra = '_ERDE'; this.palavras[1].respostaCerta = 'V';
    this.palavras[2] = new Palavra(); this.palavras[2].palavra = '_ZUL'; this.palavras[2].respostaCerta = 'A';
    this.palavras[3] = new Palavra(); this.palavras[3].palavra = '_OXO'; this.palavras[3].respostaCerta = 'R';
    this.palavras[4] = new Palavra(); this.palavras[4].palavra = '_OSA'; this.palavras[4].respostaCerta = 'R';
    this.palavras[5] = new Palavra(); this.palavras[5].palavra = '_MARELO'; this.palavras[5].respostaCerta = 'A';
    this.palavras[6] = new Palavra(); this.palavras[6].palavra = '_ARROM'; this.palavras[6].respostaCerta = 'M';
    this.palavras[7] = new Palavra(); this.palavras[7].palavra = '_RETO'; this.palavras[7].respostaCerta = 'P';
    this.embaralhaListaService.embaralhaLista(this.alfabeto);
    for(let i=0; i<8; i++) {
      this.palavras[i].respostas[0] = new Resposta();
      this.palavras[i].respostas[1] = new Resposta();
      this.palavras[i].respostas[2] = new Resposta();
    }
    this.palavras[0].respostas[0].resposta = 'V';
    this.palavras[1].respostas[0].resposta = 'V';
    this.palavras[2].respostas[0].resposta = 'A';
    this.palavras[3].respostas[0].resposta = 'R';
    this.palavras[4].respostas[0].resposta = 'R';
    this.palavras[5].respostas[0].resposta = 'A';
    this.palavras[6].respostas[0].resposta = 'M';
    this.palavras[7].respostas[0].resposta = 'P';
    for(let i=0; i<8; i++) {
      this.palavras[i].imagem = '/assets/linguagens/cores/' + (i+1) + '.png';
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
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = true;
      this.ativarLeoTriste = false;
      this.adicionarPontos();
    }
    else {
      this.tirarPontos();
      resposta.cor = '#ff0000';
      resposta.isBloqueado = true;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = true;
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
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = false;
      this.ativarLeoOk = true;
      this.adicionarNivel();
    }
  }

  public adicionarPontos(): void {
    this.jogoService.adicionarPontos();
  }

  public adicionarNivel(): void {
    this.jogoService.adicionarNivel();
  }

  public tirarPontos(): void {
    this.jogoService.tirarPontos();
  }

}

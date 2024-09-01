import { Component, OnInit } from '@angular/core';
import { Tema } from './shared/model/tema.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subtema } from './shared/model/subtema.model';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';
import { Jogo } from './shared/model/jogo.model';
import { TextToSpeechService } from '../../componentes/shared/services/text-to-speech.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  public tema: Tema = new Tema();
  public literals: any;

  constructor(
    private route: ActivatedRoute,
    private interService: InternacionalizacaoService,
    private router: Router,
    private ttsService: TextToSpeechService
  ) { }

  ngOnInit(): void {
  this.ttsService.pararLeitura();
  this.literals = this.interService.getIdioma();
    this.route.params.subscribe(params => {
      this.tema.id = params['id']
      if(this.tema.id == 1) {
        this.tema.nome = this.literals.jogosEducativos;
        this.tema.background = 'rosa';
        this.tema.subtemas[0] = new Subtema();
        this.tema.subtemas[0].id = 1;
        this.tema.subtemas[0].nome = this.literals.lp;
        this.tema.subtemas[0].imagem = 'assets/lp/abc.png';
        this.tema.subtemas[0].jogos[0] = new Jogo();
        this.tema.subtemas[0].jogos[0].id = 1;
        this.tema.subtemas[0].jogos[0].imagem = 'assets/lp/iniciais.png';
        this.tema.subtemas[0].jogos[0].url = 'iniciais';
        this.tema.subtemas[0].jogos[0].nome = this.literals.jogoIniciais;
        this.tema.subtemas[0].jogos[1] = new Jogo();
        this.tema.subtemas[0].jogos[1].id = 2;
        this.tema.subtemas[0].jogos[1].imagem = 'assets/lp/arvore.jpg';
        this.tema.subtemas[0].jogos[1].url = 'arvore';
        this.tema.subtemas[0].jogos[1].nome = this.literals.jogoAlfabeto;
        this.tema.subtemas[1] = new Subtema();
        this.tema.subtemas[1].id = 2;
        this.tema.subtemas[1].nome = this.literals.arte;
        this.tema.subtemas[1].imagem = 'assets/lp/arte.jpg';
        this.tema.subtemas[1].jogos[0] = new Jogo();
        this.tema.subtemas[1].jogos[0].id = 3;
        this.tema.subtemas[1].jogos[0].imagem = 'assets/lp/frutas.png';
        this.tema.subtemas[1].jogos[0].url = 'frutas';
        this.tema.subtemas[1].jogos[0].nome = this.literals.jogoCoresFrutas;
        this.tema.subtemas[1].jogos[1] = new Jogo();
        this.tema.subtemas[1].jogos[1].id = 4;
        this.tema.subtemas[1].jogos[1].imagem = 'assets/lp/cores.jpg';
        this.tema.subtemas[1].jogos[1].url = 'cores';
        this.tema.subtemas[1].jogos[1].nome = this.literals.jogoCores;
      } else if(this.tema.id == 2) {
        this.tema.nome = this.literals.jogosEducativos;
        this.tema.background = 'vermelho';
        this.tema.subtemas[0] = new Subtema();
        this.tema.subtemas[0].id = 3;
        this.tema.subtemas[0].nome = this.literals.quantidade;
        this.tema.subtemas[0].imagem = 'assets/math/quant.png';
        this.tema.subtemas[0].jogos[0] = new Jogo();
        this.tema.subtemas[0].jogos[0].id = 5;
        this.tema.subtemas[0].jogos[0].imagem = 'assets/math/coracoes.jpg';
        this.tema.subtemas[0].jogos[0].url = 'coracoes';
        this.tema.subtemas[0].jogos[0].nome = this.literals.jogoCoracoes;
        this.tema.subtemas[0].jogos[1] = new Jogo();
        this.tema.subtemas[0].jogos[1].id = 6;
        this.tema.subtemas[0].jogos[1].imagem = 'assets/math/quant.jpg';
        this.tema.subtemas[0].jogos[1].url = 'quantidades';
        this.tema.subtemas[0].jogos[1].nome = this.literals.jogoQuantidades;
        this.tema.subtemas[1] = new Subtema();
        this.tema.subtemas[1].id = 4;
        this.tema.subtemas[1].nome = this.literals.formasGeometricas;
        this.tema.subtemas[1].imagem = 'assets/math/abaco.jpg';
        this.tema.subtemas[1].jogos[0] = new Jogo();
        this.tema.subtemas[1].jogos[0].id = 7;
        this.tema.subtemas[1].jogos[0].imagem = 'assets/math/formas.jpg';
        this.tema.subtemas[1].jogos[0].url = 'formas';
        this.tema.subtemas[1].jogos[0].nome = this.literals.jogoQtdeFormas;
        this.tema.subtemas[1].jogos[1] = new Jogo();
        this.tema.subtemas[1].jogos[1].id = 8;
        this.tema.subtemas[1].jogos[1].imagem = 'assets/math/encaixar.png';
        this.tema.subtemas[1].jogos[1].url = 'encaixar';
        this.tema.subtemas[1].jogos[1].nome = this.literals.jogoEncaixarFormas;
      } else if(this.tema.id == 3) {
        this.tema.nome = this.literals.jogosEducativos;
        this.tema.background = 'verde';
        this.tema.subtemas[0] = new Subtema();
        this.tema.subtemas[0].id = 5;
        this.tema.subtemas[0].nome = this.literals.corpoHumano;
        this.tema.subtemas[0].imagem = 'assets/cien/anatomia.jpg';
        this.tema.subtemas[0].jogos[0] = new Jogo();
        this.tema.subtemas[0].jogos[0].id = 9;
        this.tema.subtemas[0].jogos[0].imagem = 'assets/cien/body.png';
        this.tema.subtemas[0].jogos[0].url = 'anatomia';
        this.tema.subtemas[0].jogos[0].nome = this.literals.jogoCorpoHumano;
        this.tema.subtemas[0].jogos[1] = new Jogo();
        this.tema.subtemas[0].jogos[1].id = 10;
        this.tema.subtemas[0].jogos[1].imagem = 'assets/cien/roupas.jpg';
        this.tema.subtemas[0].jogos[1].url = 'acessorios';
        this.tema.subtemas[0].jogos[1].nome = this.literals.jogoAcessorios;
        this.tema.subtemas[1] = new Subtema();
        this.tema.subtemas[1].id = 6;
        this.tema.subtemas[1].nome = this.literals.natureza;
        this.tema.subtemas[1].imagem = 'assets/cien/natureza.jpg';
        this.tema.subtemas[1].jogos[0] = new Jogo();
        this.tema.subtemas[1].jogos[0].id = 11;
        this.tema.subtemas[1].jogos[0].imagem = 'assets/cien/natureza.png';
        this.tema.subtemas[1].jogos[0].url = 'natureza';
        this.tema.subtemas[1].jogos[0].nome = this.literals.jogoSeresVivos;
        this.tema.subtemas[1].jogos[1] = new Jogo();
        this.tema.subtemas[1].jogos[1].id = 12;
        this.tema.subtemas[1].jogos[1].imagem = 'assets/cien/filhotes.jpg';
        this.tema.subtemas[1].jogos[1].url = 'filhotes';
        this.tema.subtemas[1].jogos[1].nome = this.literals.jogoFilhotes;
      } else {
        this.tema.nome = this.literals.jogosEducativos;
        this.tema.background = 'azul';
        this.tema.subtemas[0] = new Subtema();
        this.tema.subtemas[0].id = 7;
        this.tema.subtemas[0].nome = this.literals.geografia;
        this.tema.subtemas[0].imagem = 'assets/hum/planeta.jpg';
        this.tema.subtemas[0].jogos[0] = new Jogo();
        this.tema.subtemas[0].jogos[0].id = 13;
        this.tema.subtemas[0].jogos[0].imagem = 'assets/hum/clima.png';
        this.tema.subtemas[0].jogos[0].url = 'clima';
        this.tema.subtemas[0].jogos[0].nome = this.literals.jogoClima;
        this.tema.subtemas[0].jogos[1] = new Jogo();
        this.tema.subtemas[0].jogos[1].id = 14;
        this.tema.subtemas[0].jogos[1].imagem = 'assets/hum/veiculos.jpg';
        this.tema.subtemas[0].jogos[1].url = 'transporte';
        this.tema.subtemas[0].jogos[1].nome = this.literals.jogoVeiculos;
        this.tema.subtemas[1] = new Subtema();
        this.tema.subtemas[1].id = 8;
        this.tema.subtemas[1].nome = this.literals.historia;
        this.tema.subtemas[1].imagem = 'assets/hum/historias.png';
        this.tema.subtemas[1].jogos[0] = new Jogo();
        this.tema.subtemas[1].jogos[0].id = 15;
        this.tema.subtemas[1].jogos[0].imagem = 'assets/hum/folclore.jpg';
        this.tema.subtemas[1].jogos[0].url = 'folclore';
        this.tema.subtemas[1].jogos[0].nome = this.literals.jogoFolclore;
        this.tema.subtemas[1].jogos[1] = new Jogo();
        this.tema.subtemas[1].jogos[1].id = 16;
        this.tema.subtemas[1].jogos[1].imagem = 'assets/hum/meios-comunicacao.jpg';
        this.tema.subtemas[1].jogos[1].url = 'comunicacao';
        this.tema.subtemas[1].jogos[1].nome = this.literals.jogoMeiosComunicacao;
      }
    });
  }

  public navigate(rota: string): void {
    this.router.navigate([rota]);
  }

  public lerTexto(texto: string): void {
    this.ttsService.lerTexto(texto);
  }

  public pararLeitura(): void {
    this.ttsService.pararLeitura();
  }
}

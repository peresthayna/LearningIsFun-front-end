import { EmbaralharListaService } from '../../jogos/linguagens/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from '../../main/internacionalizacao/internacionalizacao.service';
import { TextToSpeechService } from '../shared/services/text-to-speech.service';
import { ReacoesService } from './../shared/services/reacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reacoes',
  templateUrl: './reacoes.component.html',
  styleUrls: ['./reacoes.component.css']
})
export class ReacoesComponent implements OnInit {

  public reacoes: boolean[] = [false, false, true, false];
  public literals: any;
  public listaReacoesPositivas: string[] = [];
  public listaReacoesNegativas: string[] = [];
  public listaReacoesCuriosas: string[] = [];
  public listaReacoesConclusao: string[] = [];

  constructor(
    private ttsService: TextToSpeechService,
    private interService: InternacionalizacaoService,
    private embaralha: EmbaralharListaService
  ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
    this.listaReacoesPositivas = ['positiva1', 'positiva2', 'positiva3', 'positiva4', 'positiva5'];
    this.listaReacoesNegativas = ['negativa1', 'negativa2', 'negativa3', 'negativa4', 'negativa5'];
    this.listaReacoesCuriosas = ['observando1', 'observando2', 'observando3'];
    this.listaReacoesConclusao = ['concluiu1', 'concluiu2', 'concluiu3'];
    this.embaralha.embaralhaLista(this.listaReacoesPositivas);
    this.embaralha.embaralhaLista(this.listaReacoesNegativas);
    this.embaralha.embaralhaLista(this.listaReacoesCuriosas);
    this.embaralha.embaralhaLista(this.listaReacoesConclusao);
    ReacoesService.mudarReacao.subscribe(reacao => {
      if(reacao == 'acertou tudo') {
        this.reacoes = [true, false, false, false];
        setTimeout(() => {
          this.ttsService.lerTexto(this.literals[this.listaReacoesConclusao[0]]);
          this.embaralha.embaralhaLista(this.listaReacoesConclusao);
        }, 1000);
      } else if(reacao == 'acertou') {
        this.reacoes = [false, true, false, false];
        this.ttsService.lerTexto(this.literals[this.listaReacoesPositivas[0]]);
        this.embaralha.embaralhaLista(this.listaReacoesPositivas);
      } else if(reacao == 'curiosa') {
        this.reacoes = [false, false, true, false];
        this.ttsService.lerTexto(this.literals[this.listaReacoesCuriosas[0]]);
        this.embaralha.embaralhaLista(this.listaReacoesCuriosas);
      } else {
        this.reacoes = [false, false, false, true];
        this.ttsService.lerTexto(this.literals[this.listaReacoesNegativas[0]]);
        this.embaralha.embaralhaLista(this.listaReacoesNegativas);
      }
    })
  }

}

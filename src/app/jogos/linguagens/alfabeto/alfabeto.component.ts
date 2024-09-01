import { Component, OnInit } from '@angular/core';
import { DropItem } from '../shared/model/drop-item.model';
import { Objeto } from '../shared/model/objeto.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmbaralharListaService } from '../shared/service/embaralha-lista.service';
import { JogoService } from '../shared/service/jogo.service';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { ReacoesService } from '../../../componentes/shared/services/reacoes.service';

@Component({
  selector: 'app-alfabeto',
  templateUrl: './alfabeto.component.html',
  styleUrls: ['./alfabeto.component.css','../shared/style.css']
})
export class AlfabetoComponent implements OnInit {

  alfabeto: DropItem[] = [];
  macas: Objeto[] = [];
  lista: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public acertou: boolean[] = [];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public literals: any;
  public recarregarPerfil: boolean = false;

  constructor(private embaralharListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private jogoService: JogoService) {
    }

  ngOnInit() {
    this.macas = this.getMacas(this.lista);
    this.alfabeto = this.getLetras(this.lista);
    this.literals = this.interService.getIdioma();
  }

  public getLetras(lista: string[]): DropItem[] {
    let alfabeto: DropItem[] = [];
    let x: string[] = ['280px','200px','330px','140px','240px','130px','80px','100px','180px','150px','370px','240px',
    '100px','150px','40px','390px','230px','300px','170px','300px','360px','230px','100px','50px','370px','295px'];
    let y: string[] = ['90px','70px','260px','100px','80px','310px','180px','280px','120px','240px','150px','130px',
    '140px','150px','190px','190px','180px','190px','200px','290px','220px','230px','240px','250px','280px','135px'];
    this.embaralharListaService.embaralhaLista(this.lista);
    for(let i=0; i<lista.length; i++) {
      alfabeto[i] = new DropItem;
      alfabeto[i].letra = lista[i];
      alfabeto[i].posicaoX = x[i];
      alfabeto[i].posicaoY = y[i];
      alfabeto[i].posicao = i;
      alfabeto[i].listaObjetos = [];
    }
    return alfabeto;
  }

  public getMacas(lista: string[]): Objeto[] {
    let macas: Objeto[] = [];
    for(let i=0; i<lista.length; i++) {
      macas[i] = new Objeto;
      macas[i].letra = lista[i];
      macas[i].imagem = '/assets/lp/' + (i+1) + '.png';
    }
    return macas;
  }

  public drop(event: CdkDragDrop<Objeto[]>, drop: DropItem): void {
    if(drop.listaObjetos.length > 0) {
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

  public verificaRespostas(drop: DropItem): void {
    if(drop.letra === drop.listaObjetos[0].letra) {
      this.acertou[drop.posicao] = true;
      this.jogoService.adicionarPontos();
      ReacoesService.mudarReacao.emit('acertou');
    } else {
      this.jogoService.tirarPontos();
      this.acertou[drop.posicao] = false;
      ReacoesService.mudarReacao.emit('triste');
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5] && this.acertou[6] && this.acertou[7] && this.acertou[8] && this.acertou[9] && this.acertou[3] && this.acertou[10] && this.acertou[11] && this.acertou[12] && this.acertou[13] && this.acertou[14] && this.acertou[15] && this.acertou[16] && this.acertou[17] && this.acertou[18] && this.acertou[19] && this.acertou[20] && this.acertou[21] && this.acertou[22] && this.acertou[23] && this.acertou[24] && this.acertou[25]) {
      this.acertouTudo = true;
      ReacoesService.mudarReacao.emit('acertou tudo');
      this.jogoService.adicionarNivel();
    }
  }

}

import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../shared/model/puzzle.model';
import { Drop } from '../shared/model/drop.model';
import { UsuarioConsulta } from 'src/app/main/usuario/shared/model/usuario-consulta.dto.model';
import { InternacionalizacaoService } from 'src/app/main/internacionalizacao/internacionalizacao.service';
import { EmbaralharListaService } from '../shared/service/embaralha-lista.service';
import { UsuarioService } from 'src/app/main/usuario/shared/service/usuario.service';

@Component({
  selector: 'app-cores-frutas',
  templateUrl: './cores-frutas.component.html',
  styleUrls: ['./cores-frutas.component.css','../shared/style.css']
})
export class CoresFrutasComponent implements OnInit {

  public literals: any;
  public formas: Puzzle[] = [
    { imagem: '../../../assets/linguagens/cores-frutas/amarelo.png', posicaoCorreta: 0 },
    { imagem: '../../../assets/linguagens/cores-frutas/roxo.png', posicaoCorreta: 1 },
    { imagem: '../../../assets/linguagens/cores-frutas/vermelho.png', posicaoCorreta: 2 },
    { imagem: '../../../assets/linguagens/cores-frutas/verde.png', posicaoCorreta: 3 }
  ];
  public listaDrop: Drop[] = [];
  public x: string[] = ['-125px','25px','175px','325px'];
  public y: string = '50px';
  public acertou: boolean[] = [false, false, false, false];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public usuario: UsuarioConsulta = new UsuarioConsulta();
  public recarregarPerfil: boolean = false;

  constructor(
    private interService: InternacionalizacaoService,
    private embaralharListaService: EmbaralharListaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.carregarDrops();
  }

  public carregarDrops() {
    this.embaralharListaService.embaralhaLista(this.formas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y, puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y, puzzleList: []},
      { posicao: 2, posicaoX: this.x[2], posicaoY: this.y, puzzleList: []},
      { posicao: 3, posicaoX: this.x[3], posicaoY: this.y, puzzleList: []}
    ];
  }

  public drop(event: CdkDragDrop<Puzzle[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public dropResposta(event: CdkDragDrop<Puzzle[]>, drop: Drop) {
    if(drop.puzzleList.length > 0) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
      );
    //this.verificaRespostas(drop);
  }

  /*public verificaRespostas(drop: Drop): void {
    if(drop.puzzleList[0].posicaoCorreta == drop.posicao) {
      this.acertou[drop.posicao] = true;
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = true;
      this.ativarLeoTriste = false;
      this.adicionarPontos();
    } else {
      this.tirarPontos();
      this.acertou[drop.posicao] = false;
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = true;
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3]) {
      this.acertouTudo = true;
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = false;
      this.adicionarNivel();
    }
  }

  public adicionarPontos(): void {
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario'))).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.pontos++;
      this.usuarioService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(usuario => this.recarregarPerfil = !this.recarregarPerfil);
    });
  }

  public adicionarNivel(): void {
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario'))).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.nivel++;
      this.usuario.pontos++;
      this.usuarioService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(usuario => this.recarregarPerfil = !this.recarregarPerfil);
    });
  }

  public tirarPontos(): void {
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario'))).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.pontos--;
      this.usuarioService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(usuario => this.recarregarPerfil = !this.recarregarPerfil);
    });
  }*/

}

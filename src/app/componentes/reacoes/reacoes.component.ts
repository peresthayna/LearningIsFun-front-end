import { ReacoesService } from './../shared/services/reacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reacoes',
  templateUrl: './reacoes.component.html',
  styleUrls: ['./reacoes.component.css']
})
export class ReacoesComponent implements OnInit {

  public reacoes: boolean[] = [false, false, true, false];

  constructor() { }

  ngOnInit(): void {
    ReacoesService.mudarReacao.subscribe(reacao => {
      if(reacao == 'acertou tudo') {
        this.reacoes = [true, false, false, false];
      } else if(reacao == 'acertou') {
        this.reacoes = [false, true, false, false];
      } else if(reacao == 'curiosa') {
        this.reacoes = [false, false, true, false];
      } else {
        this.reacoes = [false, false, false, true];
      }
    })
  }

}

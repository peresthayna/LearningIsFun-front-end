import { Injectable } from '@angular/core';
import { PuzzlePosicao } from '../model/puzzle-posicao.model';

@Injectable({
  providedIn: 'root'
})
export class EmbaralharListaService {

  constructor() { }

  embaralhaLista(lista: any[])
  {
    for (let j = lista.length; j;) {
      let randomNumber = Math.random() * j-- | 0;
      let tmp = lista[randomNumber];
      lista[randomNumber] = lista[j];
      lista[j] = tmp;
    }
  }
}

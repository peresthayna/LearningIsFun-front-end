import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReacoesService {

  public static mudarReacao: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }


}

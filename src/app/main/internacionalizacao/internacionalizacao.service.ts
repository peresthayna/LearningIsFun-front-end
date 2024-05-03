import { es_es } from './es_es';
import { en_us } from './en_us';
import { Injectable } from '@angular/core';
import { pt_br } from './pt_br';

@Injectable({
  providedIn: 'root'
})
export class InternacionalizacaoService {

  private idiomas: string[] = ['pt-br', 'en-us', 'es-es'];
  private idiomaPadrao: string = 'pt-br';

  constructor() {

  }

  public getIdioma(): any {
    let idioma = this.getIdiomaSelecionado();

    switch (idioma) {
      case 'pt-br': return pt_br;
      case 'en-us': return en_us;
      case 'es-es': return es_es;
      default: return pt_br;
    }
  }

  public getIdiomasDisponiveis(): string[] {
    return this.idiomas;
  }

  public getIdiomaSelecionado(): string {
    let idioma = localStorage.getItem('Language');
    let idiomasEncontrados: string[] = this.idiomas.filter(i => i.toLowerCase() == idioma ? idioma.toLowerCase() : null);
    if(idiomasEncontrados && idiomasEncontrados.length > 0) {
      idioma = idiomasEncontrados[0];
    } else {
      idioma = this.idiomaPadrao;
    }

    return idioma;
  }
}

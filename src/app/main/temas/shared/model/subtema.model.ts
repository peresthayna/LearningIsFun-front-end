import { Jogo } from "./jogo.model";

export class Subtema {
  id: number;
  nome: string;
  jogos: Jogo[] = [];
  imagem: string;
}

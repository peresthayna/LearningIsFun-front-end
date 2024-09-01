import { Resposta } from "./resposta.model";

export class Coracao {
  public respostas: Resposta[];
  public imagem: string;
  public respostaCerta: number;
  public posicao: number;
  public acertou: boolean;

  constructor() {
    this.respostas = [];
  }
}
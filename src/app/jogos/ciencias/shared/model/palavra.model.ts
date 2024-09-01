import { Resposta } from "./resposta.model";

export class Palavra {
  public respostas: Resposta[];
  public imagem: string;
  public respostaCerta: string;
  public palavra: string;
  public acertou: boolean;

  constructor() {
    this.respostas = [];
  }
}
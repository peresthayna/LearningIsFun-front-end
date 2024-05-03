import { Subtema } from "./subtema.model";

export class Tema {
  id: number;
  nome: string;
  subtemas: Subtema[] = [];
  background: string;
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { UsuarioComponent } from './main/usuario/usuario.component';
import { EscolherUsuarioComponent } from './main/usuario/escolher-usuario/escolher-usuario.component';
import { RankingComponent } from './main/usuario/ranking/ranking.component';
import { TemasComponent } from './main/temas/temas.component';
import { IniciaisComponent } from './jogos/linguagens/iniciais/iniciais.component';
import { AlfabetoComponent } from './jogos/linguagens/alfabeto/alfabeto.component';
import { CoresFrutasComponent } from './jogos/linguagens/cores-frutas/cores-frutas.component';
import { CoresComponent } from './jogos/linguagens/cores/cores.component';
import { CoracoesComponent } from './jogos/matematica/coracoes/coracoes.component';
import { QuantosTemosComponent } from './jogos/matematica/quantos-temos/quantos-temos.component';
import { EncaixarFormasComponent } from './jogos/matematica/encaixar-formas/encaixar-formas.component';
import { FormasComponent } from './jogos/matematica/formas/formas.component';
import { AcessoriosComponent } from './jogos/ciencias/acessorios/acessorios.component';
import { CorpoHumanoComponent } from './jogos/ciencias/corpo-humano/corpo-humano.component';
import { SeresVivosComponent } from './jogos/ciencias/seres-vivos/seres-vivos.component';
import { AnimaisComponent } from './jogos/ciencias/animais/animais.component';
import { FolcloreComponent } from './jogos/humanas/folclore/folclore.component';
import { TransporteComponent } from './jogos/humanas/transporte/transporte.component';
import { ComunicacaoComponent } from './jogos/humanas/comunicacao/comunicacao.component';
import { ClimaComponent } from './jogos/humanas/clima/clima.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: UsuarioComponent },
  { path: 'login', component: EscolherUsuarioComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'temas/:id', component: TemasComponent },
  //lp
  { path: 'iniciais', component: IniciaisComponent },
  { path: 'arvore', component: AlfabetoComponent },
  { path: 'frutas', component: CoresFrutasComponent },
  { path: 'cores', component: CoresComponent },
  //math
  { path: 'coracoes', component: CoracoesComponent },
  { path: 'quantidades', component: QuantosTemosComponent },
  { path: 'formas', component: FormasComponent },
  { path: 'encaixar', component: EncaixarFormasComponent },
  //cien
  { path: 'acessorios', component: AcessoriosComponent },
  { path: 'anatomia', component: CorpoHumanoComponent },
  { path: 'natureza', component: SeresVivosComponent },
  { path: 'filhotes', component: AnimaisComponent },
  //hum
  { path: 'folclore', component: FolcloreComponent },
  { path: 'transporte', component: TransporteComponent },
  { path: 'comunicacao', component: ComunicacaoComponent },
  { path: 'clima', component: ClimaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

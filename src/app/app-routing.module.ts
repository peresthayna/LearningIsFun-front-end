import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { UsuarioComponent } from './main/usuario/usuario.component';
import { RankingComponent } from './main/usuario/ranking/ranking.component';
import { EscolherUsuarioComponent } from './main/usuario/escolher-usuario/escolher-usuario.component';
import { TemasComponent } from './main/temas/temas.component';
import { IniciaisComponent } from './jogos/linguagens/iniciais/iniciais.component';
import { AlfabetoComponent } from './jogos/linguagens/alfabeto/alfabeto.component';
import { CoresFrutasComponent } from './jogos/linguagens/cores-frutas/cores-frutas.component';
import { CoresComponent } from './jogos/linguagens/cores/cores.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

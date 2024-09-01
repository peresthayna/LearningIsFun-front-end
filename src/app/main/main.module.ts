import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RankingComponent } from './usuario/ranking/ranking.component';
import { EscolherUsuarioComponent } from './usuario/escolher-usuario/escolher-usuario.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { TooltipModule } from 'primeng/tooltip';
import { LinguagensComponent } from './linguagens/linguagens.component';
import { TemasComponent } from './temas/temas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioComponent,
    RankingComponent,
    EscolherUsuarioComponent,
    LinguagensComponent,
    TemasComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    TooltipModule,
    FormsModule
  ]
})
export class MainModule { }

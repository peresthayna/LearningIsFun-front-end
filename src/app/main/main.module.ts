import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LinguagensComponent } from './linguagens/linguagens.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RankingComponent } from './usuario/ranking/ranking.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { EscolherUsuarioComponent } from './usuario/escolher-usuario/escolher-usuario.component';
import { TooltipModule } from 'primeng/tooltip';
import { TemasComponent } from './temas/temas.component';

@NgModule({
  declarations: [
    HomeComponent,
    LinguagensComponent,
    UsuarioComponent,
    RankingComponent,
    EscolherUsuarioComponent,
    TemasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ComponentesModule,
    TooltipModule
  ],
  exports: [
    HomeComponent,
    LinguagensComponent,
    UsuarioComponent
  ]
})
export class MainModule { }

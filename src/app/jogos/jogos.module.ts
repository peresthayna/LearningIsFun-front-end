import { ComponentesModule } from './../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AlfabetoComponent } from './linguagens/alfabeto/alfabeto.component';
import { IniciaisComponent } from './linguagens/iniciais/iniciais.component';
import { FormsModule } from '@angular/forms';
import { CoresComponent } from './linguagens/cores/cores.component';
import { CoresFrutasComponent } from './linguagens/cores-frutas/cores-frutas.component';
import { CoracoesComponent } from './matematica/coracoes/coracoes.component';
import { QuantosTemosComponent } from './matematica/quantos-temos/quantos-temos.component';
import { EncaixarFormasComponent } from './matematica/encaixar-formas/encaixar-formas.component';
import { FormasComponent } from './matematica/formas/formas.component';
import { AcessoriosComponent } from './ciencias/acessorios/acessorios.component';
import { CorpoHumanoComponent } from './ciencias/corpo-humano/corpo-humano.component';
import { SeresVivosComponent } from './ciencias/seres-vivos/seres-vivos.component';
import { AnimaisComponent } from './ciencias/animais/animais.component';
import { FolcloreComponent } from './humanas/folclore/folclore.component';
import { TransporteComponent } from './humanas/transporte/transporte.component';
import { ClimaComponent } from './humanas/clima/clima.component';
import { ComunicacaoComponent } from './humanas/comunicacao/comunicacao.component';


@NgModule({
  declarations: [
    AlfabetoComponent,
    IniciaisComponent,
    CoresComponent,
    CoresFrutasComponent,
    CoracoesComponent,
    QuantosTemosComponent,
    EncaixarFormasComponent,
    FormasComponent,
    AcessoriosComponent,
    CorpoHumanoComponent,
    SeresVivosComponent,
    AnimaisComponent,
    FolcloreComponent,
    TransporteComponent,
    ClimaComponent,
    ComunicacaoComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ComponentesModule,
    FormsModule
  ]
})
export class JogosModule { }

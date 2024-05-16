import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from '../componentes/componentes.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AlfabetoComponent } from './linguagens/alfabeto/alfabeto.component';
import { IniciaisComponent } from './linguagens/iniciais/iniciais.component';


@NgModule({
  declarations: [
    AlfabetoComponent,
    IniciaisComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    DragDropModule
  ]
})
export class JogosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from '../componentes/componentes.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AlfabetoComponent } from './linguagens/alfabeto/alfabeto.component';


@NgModule({
  declarations: [
    AlfabetoComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    DragDropModule
  ]
})
export class JogosModule { }

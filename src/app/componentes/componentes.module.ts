import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBackComponent } from './btn-back/btn-back.component';
import { SoundComponent } from './sound/sound.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReloadComponent } from './reload/reload.component';
import { ReacoesComponent } from './reacoes/reacoes.component';



@NgModule({
  declarations: [
    BtnBackComponent,
    SoundComponent,
    PerfilComponent,
    ReloadComponent,
    ReacoesComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    BtnBackComponent,
    SoundComponent,
    PerfilComponent,
    ReacoesComponent,
    ReloadComponent
  ]
})
export class ComponentesModule { }

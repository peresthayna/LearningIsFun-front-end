import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBackComponent } from './btn-back/btn-back.component';
import { SoundComponent } from './sound/sound.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReloadComponent } from './reload/reload.component';
import { ReacoesComponent } from './reacoes/reacoes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BtnBackComponent,
    SoundComponent,
    PerfilComponent,
    ReloadComponent,
    ReacoesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ], exports: [
    BtnBackComponent,
    SoundComponent,
    PerfilComponent,
    ReacoesComponent,
    ReloadComponent,
    BtnBackComponent,
  ]
})
export class ComponentesModule { }

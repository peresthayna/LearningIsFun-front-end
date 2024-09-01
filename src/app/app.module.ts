import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioService } from './main/usuario/shared/service/usuario.service';
import { MainModule } from './main/main.module';
import { ComponentesModule } from './componentes/componentes.module';
import { JogosModule } from './jogos/jogos.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    ComponentesModule,
    JogosModule
  ],
  providers: [
    UsuarioService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import { FormsModule } from '@angular/forms';
import { ComponentesModule } from './componentes/componentes.module';
import { JogosModule } from './jogos/jogos.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    FormsModule,
    ComponentesModule,
    JogosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

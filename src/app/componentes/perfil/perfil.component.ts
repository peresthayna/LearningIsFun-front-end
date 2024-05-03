import { Component, Input, OnInit } from '@angular/core';
import { UsuarioConsulta } from 'src/app/main/usuario/shared/model/usuario-consulta.dto.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() public usuario: UsuarioConsulta = new UsuarioConsulta();

  constructor() { }

  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.clear();
    window.location.reload();
  }

}

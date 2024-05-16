import { Component, Input, OnInit } from '@angular/core';
import { UsuarioConsulta } from 'src/app/main/usuario/shared/model/usuario-consulta.dto.model';
import { UsuarioService } from 'src/app/main/usuario/shared/service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: UsuarioConsulta = new UsuarioConsulta();
  public podeExibir: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.obterUsuarioLogado;
    if(this.usuario != null) { this.podeExibir = true }
    UsuarioService.recarregar.subscribe(value => { if(value) { this.usuarioService.getUsuarioPorId(this.usuario.id).subscribe(u => this.usuario = u) }} )
  }

  public logout(): void {
    this.usuarioService.deslogar();
    this.podeExibir = false;
    window.location.reload();
  }

}

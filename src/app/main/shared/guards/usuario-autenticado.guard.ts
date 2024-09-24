import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../../usuario/shared/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (this.usuarioService.logado) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}

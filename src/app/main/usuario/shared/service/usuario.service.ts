import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioConsulta } from '../model/usuario-consulta.dto.model';
import { UsuarioCadastro } from '../model/usuario-cadastro.dto.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public static recarregar: EventEmitter<boolean> = new EventEmitter<boolean>();
  private readonly URL: string = 'http://127.0.0.1:8080/usuarios';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getUsuarios(): Observable<UsuarioConsulta[]> {
    return this.http.get<UsuarioConsulta[]>(this.URL);
  }

  public getUsuariosOrdenadosData(): Observable<UsuarioConsulta[]> {
    return this.http.get<UsuarioConsulta[]>(this.URL+'/ordenados-data');
  }

  public getUsuariosOrdenadosNivel(): Observable<UsuarioConsulta[]> {
    return this.http.get<UsuarioConsulta[]>(this.URL+'/ordenados-nivel');
  }

  public getUsuarioPorId(id: number): Observable<UsuarioConsulta> {
    return this.http.get<UsuarioConsulta>(this.URL+'/buscar/'+id);
  }

  public cadastrarUsuario(usuario: UsuarioCadastro): Observable<void> {
    return this.http.post<void>(this.URL, usuario);
  }

  public atualizarUsuario(idUsuario: number, usuario: UsuarioConsulta): Observable<void> {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    return this.http.put<void>(this.URL+'/atualizar/'+idUsuario, usuario);
  }

  public deletarUsuario(idUsuario: number): Observable<void> {
    return this.http.delete<void>(this.URL+'/deletar/'+idUsuario);
  }

  /*LOGIN*/
  public logar(usuario: UsuarioConsulta): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['']);
  }

  get logado() {
    return localStorage.getItem('usuario') ? true : false;
  }

  public deslogar(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['']);
  }

  get obterUsuarioLogado(): UsuarioConsulta {
    return localStorage.getItem('usuario')
      ? JSON.parse(localStorage.getItem('usuario')!)
      : null;
  }

  get obterIdUsuarioLogado(): number | null {
    return localStorage.getItem('usuario')
      ? (JSON.parse(localStorage.getItem('usuario')!) as UsuarioConsulta).id
      : null;
  }

}

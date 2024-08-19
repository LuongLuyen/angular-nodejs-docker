import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.API}/login`, credentials)
    .pipe(
      tap(response => {
        this.setToken(response.token)
      })
    )
  }

  logout() {
    this.removeToken();
  }

  isLoggedIn(): boolean {
    if(this.getToken()){
      if(this.getToken() !== "undefined"){
        return true
      }else {
        return false
      }
    }
    return false
  }

  private getToken(): string | null {
    if (this.isLocalStorageSupported()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (this.isLocalStorageSupported()) {
      localStorage.setItem('token', token);
    }
  }

  private removeToken(): void {
    if (this.isLocalStorageSupported()) {
      localStorage.removeItem('token');
    }
  }

  private isLocalStorageSupported(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  admin():boolean {
    const token = this.getToken()
    if (token){
      if(token.charAt(token.length - 1)==="A"){
        return true
      }else{
        return false
      }
    }
    return false
  }
  getIdUser():string{
    const token = this.getToken()
    if (token){
      return token.charAt(0)
    }
    return '0'
  }
}

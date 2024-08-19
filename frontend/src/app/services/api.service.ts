// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API = environment.apiUrl;

  constructor(private http: HttpClient) {
   
  }

  getOneUser(id:string): Observable<any> {
    return this.http.get(`${this.API}/user/${id}`);
  }
  getAllUser(): Observable<any> {
    return this.http.get(`${this.API}/user`)
  }


  themThietBiPhong(data: any): Observable<any> {
    return this.http.post(`${this.API}/thiet-bi`, data)
  }
  capNhatThietBiPhong(data: any): Observable<any> {
    return this.http.put(`${this.API}/thiet-bi`, data)
  }
  getThietBiHsd(): Observable<any> {
    return  this.http.get(`${this.API}/thiet-bi-hsd`)
  }
  getPhongHoc(): Observable<any> {
    return  this.http.get(`${this.API}/thiet-bi-ph`)
  }
  getThietBi(): Observable<any> {
    return this.http.get(`${this.API}/thiet-bi`)
  }
  kiemTraHsd(data: any): Observable<any> {
    return  this.http.post(`${this.API}/het-han`, data)
  }
  capNhatSoLuong(data: any): Observable<any> {
    return  this.http.put(`${this.API}/thiet-bi-sl`, data)
  }
  xoaThietBiPhong(id: any): Observable<any> {
    return this.http.post(`${this.API}/thiet-bi-delete`,id)
  }


  getLichSu(): Observable<any> {
    return this.http.get(`${this.API}/lich-su`)
  }
  getOneLichSu(id:string): Observable<any> {
    return  this.http.get(`${this.API}/lich-su/${id}`)
  }
  getOneThietBi(id:string): Observable<any> {
    return this.http.get(`${this.API}/thiet-bi/${id}`)
  }
  getLichSuUser(id:string): Observable<any> {
    return  this.http.get(`${this.API}/lich-su-u/${id}`)
  }
  getLichSuByIdThietBi(id:string): Observable<any> {
    return   this.http.get(`${this.API}/lich-su-tb/${id}`)
  }
  traThietBiPhong(data: any): Observable<any> {
    return     this.http.put(`${this.API}/lich-su`, data)
  }
  createLichSu(data: { muon:string, tra:string, lop:string, giaovien:string,tiet:string,deviceId_id:string,userId_id:string,so_luong:string,ngay_dang_ky:string,da_tra:string,tiet_tra:string}): Observable<any> {
    return  this.http.post<any>(`${this.API}/lich-su`, data)
  }
}

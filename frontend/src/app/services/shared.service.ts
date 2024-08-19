import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private thietBi = new BehaviorSubject<any>(null)
  private lichSu = new BehaviorSubject<any>(null)
  private id = new BehaviorSubject<string>("")
  getThietBi = this.thietBi.asObservable()
  getLicSu = this.lichSu.asObservable()
  getId = this.id.asObservable()

  setThietBi(data: any) {
    this.thietBi.next(data)
  }

  setLichSu(data: any) {
    this.lichSu.next(data)
  }
  setId(id: string) {
    this.id.next(id)
  }
  getDMY(){
    const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  tinhNgayTra(tongtiet:number, ngay_dang_ky:string):Array<string>{
    let ndk=new Date(ngay_dang_ky)
    const tiet:string = tongtiet.toString().slice(-1)
   if (tongtiet >= 0) {
     const daysToAdd = tongtiet / 10;
     const resultDate = new Date(ngay_dang_ky);
     resultDate.setDate(ndk.getDate() + daysToAdd);
     if (tiet === '0'){
       return ["10"  +ngay_dang_ky ]
     }else {
       return [tiet, resultDate.toISOString().split('T')[0]]
     }
    }
    return []
  }
}

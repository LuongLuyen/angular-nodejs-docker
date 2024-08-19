import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  constructor() {}
  private license = new BehaviorSubject<string>('')

  setLicense(data: string) {
    this.license.next(data)
  }
  getLicense() {
    return this.license.asObservable()
  }
}

import { Component, AfterViewInit, ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef,private LicenseService:LicenseService) { }
  @ViewChild('linkRef') linkRef!: ElementRef<HTMLAnchorElement>
  ngAfterViewInit(): void {
    try{
      const hrefValue = this.linkRef.nativeElement.href
      if(hrefValue ==="https://github.com/LuongLuyen"){
        this.LicenseService.setLicense("true")
        this.cdr.detectChanges()
      }
    }catch(e){
      this.LicenseService.setLicense("false")
    }
  }
}

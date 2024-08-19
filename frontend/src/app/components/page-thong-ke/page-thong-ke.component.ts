import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { SearchThongKeComponent } from '../search-thong-ke/search-thong-ke.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { ExcelService } from '../../services/excel.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-page-thong-ke',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, SearchThongKeComponent, CommonModule],
  templateUrl: './page-thong-ke.component.html',
  styleUrls: ['./page-thong-ke.component.css']
})
export class PageThongKeComponent implements OnInit, OnDestroy {
  lichSu: any = []; // Thống kê
  thietBi: any = [];
  nguoiDung: any = [];
  hetHan: any = [];
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService, private shared: SharedService, private excelService: ExcelService) { }

  ngOnInit(): void {
    // Subscribe to API calls and store subscriptions in an array
    this.subscriptions.push(
      this.apiService.getLichSu().subscribe({
        next: (response) => {
          this.lichSu = response;
        },
        error: (error) => {
          console.log('Error!', error);
        }
      }),
      this.shared.getLicSu.subscribe(data => {
        this.lichSu = data;
      }),
      this.apiService.getThietBi().subscribe({
        next: (response) => {
          let hetHan = response.filter((x: any) => {
            return x.status === "HẾT HẠN";
          });
          this.hetHan = hetHan;
          this.thietBi = response;
        },
        error: (error) => {
          console.log('Error!', error);
        }
      }),
      this.apiService.getAllUser().subscribe({
        next: (response) => {
          this.nguoiDung = response;
        },
        error: (error) => {
          console.log('Error!', error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  exportToExcelTk() {
    let arr:Array<string> =[] 
    this.lichSu.forEach((x:any)=>{
      if(x.datra !=='T' && x.datra !=='F'){
         x.datra ="Lịch dự kiến"
      }
      arr.push(x)
    })
    this.excelService.exportAsExcelFile(arr, 'Data');
  }
  exportToExcelTb() {
    this.excelService.exportAsExcelFile(this.thietBi, 'Data');
  }
  exportToExcelNd() {
    this.excelService.exportAsExcelFile(this.nguoiDung, 'Data');
  }
  exportToExcelHh() {
    this.excelService.exportAsExcelFile(this.hetHan, 'Data');
  }

}

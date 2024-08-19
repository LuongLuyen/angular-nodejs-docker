import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchThongKeComponent } from '../search-thong-ke/search-thong-ke.component';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-dang-ky',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, CommonModule, SearchThongKeComponent],
  templateUrl: './page-dang-ky.component.html',
  styleUrls: ['./page-dang-ky.component.css']
})
export class PageDangKyComponent implements OnInit, OnDestroy {
  dangKy: any = [];
  today:string=""
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.today = this.shared.getDMY()
    const subscription1 = this.apiService.getLichSuUser(this.authService.getIdUser()).subscribe({
      next: (response) => {
        this.dangKy = response;
      },
      error: (error) => {
        console.log('error!', error);
      }
    });
    this.subscriptions.push(subscription1);

    const subscription2 = this.shared.getLicSu.subscribe(data => {
      this.dangKy = data;
    });
    this.subscriptions.push(subscription2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  reloadCurrentPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  tra(id: string, idThietBi: string): void {
    this.apiService.getOneLichSu(id).subscribe(data=>{
      if(data.da_tra ==='F'){
        const subscription3 = this.apiService.traThietBiPhong({ id: id }).subscribe(response=> {
          const subscription4 = this.apiService.getOneLichSu(id).subscribe(response => {
            const subscription5 = this.apiService.capNhatSoLuong({ quantity: response.so_luong, id: idThietBi, phepTinh: "+" }).subscribe(response => {
              this.reloadCurrentPage();
              alert("Thành công");
            });
            this.subscriptions.push(subscription5);
          });
          this.subscriptions.push(subscription4);
        });
        this.subscriptions.push(subscription3);
      }else  {
        this.apiService.getOneLichSu(data.da_tra).subscribe(data=>{
          if(data.da_tra ==="T"){
            const subscription3 = this.apiService.traThietBiPhong({ id: id }).subscribe(response=> {
              const subscription4 = this.apiService.getOneLichSu(id).subscribe(response => {
                const subscription5 = this.apiService.capNhatSoLuong({ quantity: response.so_luong, id: idThietBi, phepTinh: "no" }).subscribe(response => {
                  this.reloadCurrentPage();
                  alert("Thành công");
                });
                this.subscriptions.push(subscription5);
              });
              this.subscriptions.push(subscription4);
            });
            this.subscriptions.push(subscription3);
          }else{
            alert("Người mượn trước chưa trả")
          }
        })
      }
    })
  }
}

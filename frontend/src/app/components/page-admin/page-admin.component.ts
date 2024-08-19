import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { SearchComponent } from '../search/search.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, SearchComponent, CommonModule,RouterLink,RouterOutlet],
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit, OnDestroy {
  thietBi: any = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private shared: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const subscription1 = this.apiService.getThietBi().subscribe({
      next: (response) => {
        this.thietBi = response;
      },
      error: (error) => {
        console.log('Error!', error);
      }
    });
    this.subscriptions.push(subscription1);

    const subscription2 = this.shared.getThietBi.subscribe(data => {
      this.thietBi = data;
    });
    this.subscriptions.push(subscription2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  capnhat(id: string) {
    this.shared.setId(id);
  }

  themmoi() {
    this.shared.setId('0');
  }

  reloadCurrentPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  xoa(id: string) {
    alert("Xác nhận xóa");
    const subscription3 = this.apiService.xoaThietBiPhong({ id: id }).subscribe({
      next: (response) => {
        this.reloadCurrentPage();
      },
      error: (error) => {
        console.log('Error!', error);
      }
    });
    this.subscriptions.push(subscription3);
  }
}

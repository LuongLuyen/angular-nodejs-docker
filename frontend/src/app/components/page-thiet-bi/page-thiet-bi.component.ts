import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { SearchComponent } from '../search/search.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-thiet-bi',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, SearchComponent, CommonModule, RouterModule],
  templateUrl: './page-thiet-bi.component.html',
  styleUrls: ['./page-thiet-bi.component.css']
})
export class PageThietBiComponent implements OnInit, OnDestroy {
  thietBi: any[] = [];
  private subscription: Subscription | undefined;

  constructor(private apiService: ApiService, private shared: SharedService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.getThietBiHsd().subscribe({
      next: (response) => {
        this.thietBi = response;
      },
      error: (error) => {
        console.log('Error!', error);
      }
    });

    this.shared.getThietBi.subscribe(data => {
      this.thietBi = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  muonThietBi(id: string): void {
    this.shared.setId(id);
  }
}

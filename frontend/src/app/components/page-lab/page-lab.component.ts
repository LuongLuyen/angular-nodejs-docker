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
  selector: 'app-page-lab',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, SearchComponent, CommonModule, RouterModule],
  templateUrl: './page-lab.component.html',
  styleUrls: ['./page-lab.component.css']
})
export class PageLabComponent implements OnInit, OnDestroy {
  T1: any;
  T2: any;
  T3: any;
  T4: any;
  KT: any;
  private subscriptions: Subscription[] = []; 

  constructor(private apiService: ApiService, private shared: SharedService) { }

  tang(arr: any, t: string): any {
    let newArr = arr.filter((x: any) => {
      return x.code.includes(t);
    });
    return newArr;
  }

  ngOnInit(): void {
    const subscription = this.apiService.getPhongHoc().subscribe({
      next: (response) => {
        this.T1 = this.tang(response, 'T1');
        this.T2 = this.tang(response, 'T2');
        this.T3 = this.tang(response, 'T3');
        this.T4 = this.tang(response, 'T4');
        this.KT = this.tang(response, 'KT');
      },
      error: (error) => {
        console.log('Error!', error);
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  muonLab(id: string) {
    this.shared.setId(id);
  }
}

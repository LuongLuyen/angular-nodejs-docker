import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { SearchComponent } from '../search/search.component';
import { ThongBaoComponent } from '../thong-bao/thong-bao.component';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,UserComponent,ThongBaoComponent],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent {

}

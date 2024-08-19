import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-them-cap-nhat',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, FormsModule, CommonModule],
  templateUrl: './page-them-cap-nhat.component.html',
  styleUrls: ['./page-them-cap-nhat.component.css']
})
export class PageThemCapNhatComponent implements OnInit, OnDestroy {
  name: string = '';
  mon: string = '';
  code: string = '';
  unit: string = '';
  price: string = '';
  quantity: string = '';
  status: string = '';
  location: string = '';
  hansudung: string = '';
  userId_id: string = '';
  ngaynhap: string = '';

  deviceId_id: string = '';

  mons: string[] = ['NGỮ VĂN', 'TOÁN HỌC', 'LỊCH SỬ', 'VẬT LÍ', 'ĐỊA LÍ', 'SINH HỌC', 'HÓA HỌC', 'THỂ DỤC', 'QUỐC PHÒNG AN NINH', 'TIN HỌC'];
  units: string[] = ["BỘ", "CÁI", "QUYỂN", "G", "KHẨU", "CHIẾC", "TỜ", "HỘP", "ML", "TỆP", "PHÒNG"];
  quantitys: number[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private shared: SharedService,
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quantitys = Array.from({ length: Number(100) }, (_, i) => i + 1);
    this.shared.getId.subscribe((id) => {
      this.deviceId_id = id;
      if (id !== '0') {
        this.api.getOneThietBi(id).subscribe(data => {
          this.name = data.name;
          this.mon = data.mon;
          this.code = data.code;
          this.unit = data.unit;
          this.price = data.price;
          this.quantity = data.quantity;
          this.status = data.status;
          this.hansudung = data.hansudung;
          this.userId_id = data.userId_id;
          this.ngaynhap = data.ngaynhap;
          this.location = data.location;
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Hủy tất cả các subscriptions khi component bị hủy
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  create() {
    if (this.deviceId_id === '0') {
      // Thêm mới
      if (this.name !== "" && this.mon !== "" && this.code !== "" && this.unit !== "" && this.price !== "" && this.quantity !== "" && this.status !== "" && this.location !== "" && this.hansudung !== "") {
        const data = {
          name: this.name.toUpperCase(),
          mon: this.mon,
          code: this.code,
          unit: this.unit,
          price: this.price,
          quantity: this.quantity,
          status: this.status,
          location: this.location.toUpperCase(),
          hansudung: this.hansudung,
          userId_id: this.auth.getIdUser(),
          ngaynhap: this.shared.getDMY()
        };
        this.subscriptions.push(
          this.api.themThietBiPhong(data).subscribe({
            next: (response) => {
              this.router.navigate(['/quan-ly']);
            },
            error: (error) => {
              console.log('Error!', error);
            }
          })
        );
      } else {
        alert("Kiểm tra lại thông tin");
      }
    } else {
      // Cập nhật
      if (this.name !== "" && this.mon !== "" && this.code !== "" && this.unit !== "" && this.price !== "" && this.quantity !== "" && this.status !== "" && this.location !== "" && this.hansudung !== "") {
        const data = {
          name: this.name,
          mon: this.mon,
          code: this.code,
          unit: this.unit,
          price: this.price,
          quantity: this.quantity,
          status: this.status,
          location: this.location,
          hansudung: this.hansudung,
          userId_id: this.userId_id,
          ngaynhap: this.ngaynhap,
          id: this.deviceId_id
        };
        this.subscriptions.push(
          this.api.capNhatThietBiPhong(data).subscribe({
            next: (response) => {
              this.router.navigate(['/quan-ly']);
            },
            error: (error) => {
              console.log('Error!', error);
            }
          })
        );
      } else {
        alert("Kiểm tra lại thông tin");
      }
    }
  }
}

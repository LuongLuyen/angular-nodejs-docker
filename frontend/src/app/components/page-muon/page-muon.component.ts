import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from '../user/user.component';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-muon',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserComponent, FormsModule, CommonModule],
  templateUrl: './page-muon.component.html',
  styleUrls: ['./page-muon.component.css']
})
export class PageMuonComponent implements OnInit, OnDestroy {
  user: any = [];
  thietBi: any = [];
  today!: string;

  ngayMuon: string = '';
  lop: string = '';
  tietMuon: string = '';
  tietTra: string = '';
  soLuong: string = '';
  ngayTra: string = '';

  options: number[] = [];
  lops: string[] = ["10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B", "12C"];
  thietBiDangMuon: any = [];
  select: any;
  isPhong: boolean = true;

  private subscriptions: Subscription[] = []; // Quản lý tất cả các subscriptions

  constructor(
    private shared: SharedService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shared.getId.subscribe((id) => {
      if (id) {
        this.apiService.getOneThietBi(id).subscribe(
          (response) => {
            if (response.unit === "PHÒNG") {
              this.isPhong = false;
            }
            this.thietBi = response;
            this.options = Array.from({ length: Number(this.thietBi.quantity) }, (_, i) => i + 1);
            this.apiService.getLichSuByIdThietBi(this.thietBi.id).subscribe(
              (response) => {
                this.thietBiDangMuon = response.filter((x: any) => {
                  return x.da_tra === "F";
                });
              }
            );
          }
        );
      } else {
        this.router.navigate(['/trang-chu']);
      }
    });

    this.apiService.getOneUser(this.authService.getIdUser()).subscribe(
      (response) => {
        this.user = response;
      }
    );

    this.today = this.shared.getDMY();
  }

  ngOnDestroy(): void {
    // Hủy tất cả các subscriptions khi component bị hủy
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  create() {
    const select = this.thietBiDangMuon.filter((x: any) => {
      return this.select == x.id;
    });
    //  Muon khi kho con 
    if (this.thietBi.quantity !== '0') {
      if (this.ngayMuon !== "" && this.tietTra !== "" && this.lop !== "" && this.tietMuon !== "" && this.soLuong !== "") {
        const tinhNT = this.shared.tinhNgayTra(Number(this.tietMuon) + Number(this.tietTra), this.ngayMuon);
        this.apiService.createLichSu({
          muon: this.ngayMuon,
          tra: tinhNT[1],
          lop: this.lop,
          giaovien: this.user.name,
          tiet: this.tietMuon,
          deviceId_id: this.thietBi.id,
          userId_id: this.user.id,
          so_luong: this.soLuong,
          ngay_dang_ky: this.today,
          da_tra: "F",
          tiet_tra: tinhNT[0]
        }).subscribe(
          (response) => {
            this.router.navigate(['/dang-ky']);
          }
        );
        this.apiService.capNhatSoLuong({ quantity: this.soLuong, id: this.thietBi.id, phepTinh: "-" }).subscribe();
      } else {
        alert("[Kho còn] Kiểm tra lại thông tin");
      }
    } else {
      // muon khi kho het
      if (new Date(select[0].ngay_tra) < new Date(this.today)) {
        this.ngayMuon = this.today;
      } else {
        this.ngayMuon = select[0].ngay_tra;
      }
      this.tietMuon = select[0].tiet_tra;
      this.soLuong = select[0].so_luong;
      if (this.ngayMuon !== "" && this.tietTra !== "" && this.lop !== "" && this.tietMuon !== "" && this.soLuong !== "") {
        const tinhNT = this.shared.tinhNgayTra(Number(this.tietMuon) + Number(this.tietTra), this.ngayMuon);
        this.apiService.createLichSu({
          muon: this.ngayMuon,
          tra: tinhNT[1],
          lop: this.lop,
          giaovien: this.user.name,
          tiet: this.tietMuon,
          deviceId_id: this.thietBi.id,
          userId_id: this.user.id,
          so_luong: this.soLuong,
          ngay_dang_ky: this.today,
          da_tra: `${select[0].id}`,
          tiet_tra: tinhNT[0]
        }).subscribe(
          (response) => {
            this.router.navigate(['/dang-ky']);
          }
        );
        this.apiService.capNhatSoLuong({ quantity: this.soLuong, id: this.thietBi.id, phepTinh: "no" }).subscribe();
      } else {
        alert("[Kho hết] Kiểm tra lại thông tin");
      }
    }
  }
}

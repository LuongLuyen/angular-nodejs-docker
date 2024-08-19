import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface Item {
  nguoidung: string;
  mon: string;
  quantity: string;
  ngaytra: string;
  thietbi:string
}

@Component({
  selector: 'app-search-thong-ke',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-thong-ke.component.html',
  styleUrl: './search-thong-ke.component.css'
})
export class SearchThongKeComponent {
  searchUser: string = '';
  searchTB: string = '';
  selectedOption: string = '';
  startDate: string = '';
  endDate: string = '';
  options: string[] = ['NGỮ VĂN', 'TOÁN HỌC', 'LỊCH SỬ', 'VẬT LÍ', 'ĐỊA LÍ', 'SINH HỌC', 'HÓA HỌC', 'THỂ DỤC', 'QUỐC PHÒNG AN NINH','TIN HỌC'];
  items: Item[] = [];
  filteredItems: Item[] = [];

  constructor(private apiService: ApiService,private shared: SharedService,private router: Router) { }

  ngOnInit() {
    this.apiService.getLichSu().subscribe(data => {
      this.items = data;
      this.filteredItems = data;
    });
  }

  onSearch() {
    this.filteredItems = this.items.filter(item => 
      item.nguoidung.toLowerCase().includes(this.searchUser.toLowerCase()) &&
      item.thietbi.toLowerCase().includes(this.searchTB.toLowerCase()) &&
      (this.selectedOption ? item.mon.toUpperCase() === this.selectedOption : true) &&
      (this.startDate ? new Date(item.ngaytra) >= new Date(this.startDate) : true) &&
      (this.endDate ? new Date(item.ngaytra) <= new Date(this.endDate) : true)
    )
    this.shared.setLichSu(this.filteredItems)
  }
  reloadCurrentPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl])
    });
  }
}

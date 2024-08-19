import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Item {
  name: string
  mon: string
  quantity: string
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit  {
  searchTerm: string = ''
  selectedOption: string = ''
  options: string[] = ['NGỮ VĂN', 'TOÁN HỌC', 'LỊCH SỬ', 'VẬT LÍ', 'ĐỊA LÍ', 'SINH HỌC', 'HÓA HỌC', 'THỂ DỤC', 'QUỐC PHÒNG AN NINH']
  items: Item[] = []
  filteredItems: Item[] = []
  constructor(private apiService: ApiService,private shared: SharedService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    const currentUrl = this.route.snapshot.url.join('/')
    if (currentUrl === 'thiet-bi'){
      this.apiService.getThietBiHsd().subscribe(data => {
        this.items = data
        this.filteredItems = data
      })
    }else if(currentUrl === 'quan-ly'){
      this.apiService.getThietBi().subscribe(data => {
        this.items = data
        this.filteredItems = data
      })
    }
  }

  onSearch() {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedOption ? item.mon.toUpperCase() === this.selectedOption : true)
    )
    this.shared.setThietBi(this.filteredItems)
  }
  reloadCurrentPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl])
    });
  }
}

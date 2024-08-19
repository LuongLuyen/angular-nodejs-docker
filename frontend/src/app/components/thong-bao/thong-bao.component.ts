import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-thong-bao',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './thong-bao.component.html',
  styleUrl: './thong-bao.component.css'
})
export class ThongBaoComponent {
  constructor(private authService: AuthService,private apiService: ApiService,private shared:SharedService) { }
  homNay:any =[]
  quaHan:any =[]
  today:string =''

  ngOnInit(): void {
    this.apiService.getLichSuUser(this.authService.getIdUser()).subscribe({
      next: (response) => {
        this.today = this.shared.getDMY()
        const data = response
        let homNay = data.filter((x:any)=>{
          return  new Date(x.ngaytra).getTime() === new Date(this.today).getTime()
        })
        this.homNay = homNay
        let quaHan = data.filter((x:any)=>{
          return  new Date(x.ngaytra) < new Date(this.today)
        })
        this.quaHan = quaHan
      },
      error: (error) => {
        console.log('error!', error)
      }
    })}

}

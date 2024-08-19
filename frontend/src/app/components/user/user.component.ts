import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,private apiService: ApiService) { }
  user:any =[]

  logout(){
    this.authService.logout()
    this.router.navigate(['/login']) 
  }

  ngOnInit(): void {
    this.apiService.getOneUser(this.authService.getIdUser()).subscribe({
      next: (response) => {
        this.user = response
      },
      error: (error) => {
        console.log('error!', error)
      }
    })
  }
}

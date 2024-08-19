import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { catchError, Subscription, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  userName: string = '';
  password: string = '';
  private subscriptions: Subscription[] = []; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private shared: SharedService
  ) { }

  login() {
    const today = this.shared.getDMY();
    const TIMEOUT_DURATION = 1000; 
    const subscription1 = this.authService.login({ userName: this.userName, password: this.password }).pipe(
      timeout(TIMEOUT_DURATION),
      catchError((error) => {
        this.router.navigate(['/error']);
        return throwError(error);
      })
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/trang-chu']);
      },
      error: (error) => {
        this.authService.logout();
        alert('Vui lòng kiểm tra lại thông tin và đăng nhập lại !');
      }
    });
    this.subscriptions.push(subscription1);
    const subscription2 = this.apiService.kiemTraHsd({ today: today }).subscribe();
    this.subscriptions.push(subscription2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LicenseService } from '../../services/license.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { catchError, Subscription, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-page-intro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterOutlet, LoginComponent, CommonModule],
  templateUrl: './page-intro.component.html',
  styleUrls: ['./page-intro.component.css']
})
export class PageIntroComponent implements OnInit, OnDestroy {
  status: boolean = false;
  server: boolean = false;
  private subscriptions: Subscription[] = []; 

  constructor(
    private licenseService: LicenseService,
    private cdr: ChangeDetectorRef,
    private api: ApiService
  ) { }
  ngOnInit(): void {
 
    const TIMEOUT_DURATION = 1000; // Thời gian chờ 10 giây

    const serverSubscription = this.api.getAllUser().pipe(
      timeout(TIMEOUT_DURATION),
      catchError((error) => {
        console.warn("[INFO] Trạng thái server: OFF");
        this.server = false;
        return throwError(error);
      })
    ).subscribe({
      next: (response) => {
        this.server = true;
        console.log(`[INFO] Trạng thái server: ON`);
      },
      error: (error) => {
        this.server = false;
      }
    });
    this.subscriptions.push(serverSubscription);

    const licenseSubscription = this.licenseService.getLicense().subscribe(license => {
      if (license === "true") {
        this.status = true;
        this.cdr.detectChanges();
      }
    });
    this.subscriptions.push(licenseSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

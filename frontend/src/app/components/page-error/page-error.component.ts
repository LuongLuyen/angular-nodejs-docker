import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.css'
})
export class PageErrorComponent {

}

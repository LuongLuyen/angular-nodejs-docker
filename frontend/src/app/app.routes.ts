import { Routes } from '@angular/router';
import { PageIntroComponent } from './components/page-intro/page-intro.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageLabComponent } from './components/page-lab/page-lab.component';
import { PageThietBiComponent } from './components/page-thiet-bi/page-thiet-bi.component';
import { PageDangKyComponent } from './components/page-dang-ky/page-dang-ky.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { PageThongKeComponent } from './components/page-thong-ke/page-thong-ke.component';
import { PageThemCapNhatComponent } from './components/page-them-cap-nhat/page-them-cap-nhat.component';
import { PageMuonComponent } from './components/page-muon/page-muon.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';


export const routes: Routes = [
    { path: 'login', component: PageIntroComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'trang-chu', component: PageHomeComponent, canActivate: [authGuard] },
    { path: 'thiet-bi', component: PageThietBiComponent,canActivate: [authGuard] },
    { path: 'phong-hoc', component: PageLabComponent,canActivate: [authGuard] },
    { path: 'dang-ky', component: PageDangKyComponent,canActivate: [authGuard] },
    { path: 'quan-ly', component: PageAdminComponent,canActivate: [authGuard,adminGuard] },
    { path: 'thong-ke-bao-cao', component: PageThongKeComponent,canActivate: [authGuard,adminGuard] },
    { path: 'them-cap-nhat', component: PageThemCapNhatComponent,canActivate: [authGuard] },
    { path: 'muon', component: PageMuonComponent,canActivate: [authGuard] },
    { path: 'error', component: PageErrorComponent},
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/services/auth.guard';
import { RoleGuard } from './core/auth/services/role.guard';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { SettingsComponent } from './core/settings/settings.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  //user section
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //admin section
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [RoleGuard] },
  { path: 'user-info', component: UserInfoComponent, canActivate: [RoleGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

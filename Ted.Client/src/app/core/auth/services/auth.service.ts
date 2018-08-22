import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { LoginData, RegisterData } from '../auth.model';

import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../loader/loader.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl: string = environment.apiUri + "Account/";

  private fullName: string;
  isLoggedIn: boolean;
  redirectUrl: string;

  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private toastrService: ToastrService
  ) {
    this.isLoggedIn = this.isAuthenticated();
    this.fullName = this.getFullName(this.isLoggedIn);
  }

  public login(loginData: LoginData) {
    this.loaderService.show();
    return this.http
      .post<any>(this.apiUrl + "Login", loginData)
      .subscribe(data => {
        localStorage.setItem('access_token', data.access_token);
        this.setFullName(data.access_token);
        this.isLoggedIn = true;
        this.loaderService.hide();
        this.getRole() == "User" ? this.router.navigate(['/home']) : this.router.navigate(['/dashboard']);
      }, error => {
        this.loaderService.hide();
      }
      );
  };

  public register(registerData: RegisterData) {
    this.loaderService.show();
    return this.http
      .post<any>(this.apiUrl + "Register", registerData)
      .subscribe(data => {
        localStorage.setItem('access_token', data.access_token);
        this.setFullName(data.access_token);
        this.isLoggedIn = true;
        this.toastrService.success("Congratulations! The registration is complete", "Success");
        this.loaderService.hide();
        this.getRole() == "User" ? this.router.navigate(['/home']) : this.router.navigate(['/dashboard']);
      }, error => {
        this.toastrService.error(error.error, "Error");
        this.loaderService.hide();
      });
  }

  public logout() {
    this.isLoggedIn = false;
    if (localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
    }
    this.router.navigate(['/register']);

  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getRole(): string {
    if (this.isLoggedIn) {
      return this.jwtHelper.decodeToken(this.getToken()).role;
    }
    this.logout();
  }

  setFullName(token: string) {
    this.fullName = this.jwtHelper.decodeToken(token).full_name;
  }

  private getFullName(isLogedIn: boolean): string {
    if (isLogedIn) {
      return this.jwtHelper.decodeToken(this.getToken()).full_name;
    }
    this.logout();
  }
}

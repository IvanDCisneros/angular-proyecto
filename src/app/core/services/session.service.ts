import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private helper = new JwtHelperService();
  get token() { return this.storageService.getToken(); }

  constructor(private storageService: StorageService) { }

  getRol(): string {
    return this.helper.decodeToken(this.token).role;
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

  isAuthenticated(): boolean {
    return this.token != '' && !this.isTokenExpired() ? true : false;
  }
}

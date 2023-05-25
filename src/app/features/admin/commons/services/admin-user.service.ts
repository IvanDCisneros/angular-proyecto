import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ISignInRequest } from '../../../../shared/interfaces/sign-in-request.interface';
import { IToken } from '../../../../shared/interfaces/token.interface';
import { AdminServicesModule } from './services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class AdminSignInService {

  itoken!: IToken;
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  adminSignIn(request: ISignInRequest): Observable<IToken> {
    return this.http.post<IToken>(`${this.baseUrl}/api/User/Authenticate`, request).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }
}

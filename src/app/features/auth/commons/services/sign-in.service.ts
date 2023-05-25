import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IToken } from 'src/app/shared/interfaces/token.interface';
import { environment } from 'src/environments/environment';
import { ISignInRequest } from '../../../../shared/interfaces/sign-in-request.interface';
import { AuthServicesModule } from './services.module';

@Injectable({
  providedIn: AuthServicesModule
})
export class SignInService {

  itoken!: IToken;
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  signIn(request: ISignInRequest): Observable<IToken> {
    return this.http.post<IToken>(`${this.baseUrl}/api/Clientes/Authenticate`, request).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }
}

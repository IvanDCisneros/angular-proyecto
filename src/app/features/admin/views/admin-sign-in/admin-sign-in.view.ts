import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { ISignInRequest } from '../../../../shared/interfaces/sign-in-request.interface';
import { AdminSignInService } from '../../commons/services/admin-user.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.view.html',
  styleUrls: ['./admin-sign-in.view.scss']
})
export class AdminSignInView implements OnInit {

  constructor(
    private adminSignInService: AdminSignInService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  signIn(data: ISignInRequest): void {
    this.adminSignInService.adminSignIn(data).subscribe(
    {
        next: response => {
          if (response) {
          this.storageService.setToken(response.token);
          this.toastr.success("Te has logeado con éxito", "Información", { toastComponent: ToastAnimationsComponent });
          this.router.navigateByUrl('portal/home');
          }
        },
        error: err => {
        this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }
     

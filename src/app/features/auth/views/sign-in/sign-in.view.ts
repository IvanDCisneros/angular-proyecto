import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { OpcionRetornoEnum } from '../../../../shared/constants/opcionRetorno.enum';
import { ISignInRequest } from '../../../../shared/interfaces/sign-in-request.interface';
import { SignInService } from '../../commons/services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss']
})
export class SignInView implements OnInit {

  opcionRetorno!: number;

  constructor(
      private signInService: SignInService,
      private storageService: StorageService,
      private router: Router,
      private toastr: ToastrService,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.opcionRetorno = this.route.snapshot.params['id'];
  }

  signIn(data: ISignInRequest):void{
    this.signInService.signIn(data).subscribe(
    {
      next: response => {
      if (response) {
        this.storageService.setToken(response.token);
        this.toastr.success("Te has logeado con éxito", "Información", { toastComponent: ToastAnimationsComponent });
        if (this.opcionRetorno == OpcionRetornoEnum.CarritoDeCompras)
          this.router.navigateByUrl('/payment/cart')
        else if (this.opcionRetorno == OpcionRetornoEnum.Reportes)
          this.router.navigateByUrl('/report/report-factura')
        else if (this.opcionRetorno == OpcionRetornoEnum.OrderDetail)
          this.router.navigateByUrl('/payment/order-detail')
        else
          this.router.navigateByUrl('portal/home')
        }
      },
      error: err => {
        this.toastr.error(err.error, "Algo inesperado ha sucedio:");
      }
    });
  }
}

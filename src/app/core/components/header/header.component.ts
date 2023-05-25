import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpcionRetornoEnum } from '../../../shared/constants/opcionRetorno.enum';
import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public badge: number = 0;
  IsAdmin: number = 0;
  showNav: boolean = true;
  private _mobileQueryListener!: () => void;
  get token() { return this.storageService.getToken(); }
  mobileQuery!: MediaQueryList;

  constructor(
    private router: Router,
    private cartService: CartService,
    private sessionService: SessionService,
    private storageService: StorageService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.cartService.itemInCart.subscribe(value => {
      this.badge = value;
    })
    this.cartService.sendQuantity();
    if (this.sessionService.isAuthenticated() && this.sessionService.getRol() == "Administrador")
      this.IsAdmin = 1
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl('/portal/' + route);
  }

  redirectToNewTarget(route: string): void{
    window.open('/portal/' + route, "_blank");
  }

  goToCart(): void {
    this.router.navigateByUrl('/payment/cart')
  }

  goToLogin(): void {
    if (this.sessionService.isAuthenticated() && this.sessionService.getRol() != "Administrador")
      this.router.navigateByUrl('/auth/sign-up')
    else
      this.router.navigateByUrl(`/auth/sign-in/${OpcionRetornoEnum.Home}`)
  }

  goToReporteFactura() : void {
    if (!this.sessionService.isAuthenticated())
      this.router.navigateByUrl(`/auth/sign-in/${OpcionRetornoEnum.Reportes}`)
    else
      this.router.navigateByUrl('/report/report-factura')
  }

  goToPedido(): void {
    if (this.sessionService.isAuthenticated() && this.sessionService.getRol() == "Administrador")
      this.router.navigateByUrl('/admin/pedido-list')
    else
      this.router.navigateByUrl('/admin/admin-sign-in')
  }

  goToProductos(): void {
    if (this.sessionService.isAuthenticated() && this.sessionService.getRol() == "Administrador")
      this.router.navigateByUrl('/admin/products-list')
    else
      this.router.navigateByUrl('/admin/admin-sign-in')
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { ClienteService } from '../../commons/services/cliente.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.view.html',
  styleUrls: ['./forgot-password.view.scss']
})
export class ForgotPasswordView implements OnInit {

  formGroup!: FormGroup;
  
  get usuarioFormControl(): FormControl { return this.formGroup.get('usuario') as FormControl; }

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group(
      {
        usuario: ['', [Validators.required]]
      }
    );
  }

  send(): void {
    if (this.formGroup.valid) {
      this.clienteService.recuperarPassword(this.usuarioFormControl.value).subscribe(
      {
        next: data => {
        this.toastr.success("Consulta tu bandeja de correo electronico y digita tu nueva contraseña", "Información", { toastComponent: ToastAnimationsComponent });
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }
}

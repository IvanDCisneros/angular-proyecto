import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services/session.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { ISignInRequest } from '../../../../shared/interfaces/sign-in-request.interface';
import { SignInValidator } from '../../../../shared/validators/sign-in.validator';
import { BancoService } from '../../commons/services/banco.service';
import { ClienteService } from '../../commons/services/cliente.service';
import { DepartamentoService } from '../../commons/services/departamento.service';
import { MunicipioService } from '../../commons/services/municipio.service';
import { BancoModel } from '../../models/banco.model';
import { ClienteModel } from '../../models/cliente.model';
import { DepartamentoModel } from '../../models/departamento.model';
import { MunicipioModel } from '../../models/municipios.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.view.html',
  styleUrls: ['./sign-up.view.scss']
})
export class SignUpView implements OnInit {

  private helper = new JwtHelperService();
  signUpGroup!: FormGroup;
  nuevo = true;
  mostrarAfiliado: boolean = false;
  mostrarCodigoAfiliado: boolean = false;
  mostrarCheckAfiliado: boolean = true;
  mostrarObjetosRegistro: boolean = true;
  readOnlyCodigoReferido: boolean = false;
    
  bancos!: BancoModel[];
  departamentos!: DepartamentoModel[];
  municipios!: MunicipioModel[];
  @Output() formData: EventEmitter<ISignInRequest> = new EventEmitter<ISignInRequest>();
  dataModel = new ClienteModel();

  get token() { return this.storageService.getToken(); }
  get nombreFormControl(): FormControl { return this.signUpGroup.get('nombre') as FormControl; }
  get identificacionFormControl(): FormControl { return this.signUpGroup.get('identificacion') as FormControl; }
  get direccionFormControl(): FormControl { return this.signUpGroup.get('direccion') as FormControl; }
  get idMunicipioFormControl(): FormControl { return this.signUpGroup.get('idMunicipio') as FormControl; }
  get telefonoFormControl(): FormControl { return this.signUpGroup.get('telefono') as FormControl; }
  get correoElectronicoFormControl(): FormControl { return this.signUpGroup.get('correoElectronico') as FormControl; }
  get contrasenaFormControl(): FormControl { return this.signUpGroup.get('contrasena') as FormControl; }
  get confirmFormControl(): FormControl { return this.signUpGroup.get('confirm') as FormControl; }
  get cuentaBancariaFormControl(): FormControl { return this.signUpGroup.get('cuentaBancaria') as FormControl; }
  get idBancoFormControl(): FormControl { return this.signUpGroup.get('idBanco') as FormControl; }
  get idDepartamentoFormControl(): FormControl { return this.signUpGroup.get('idDepartamento') as FormControl; }
  get codigoReferidoFormControl(): FormControl { return this.signUpGroup.get('codigoReferido') as FormControl; }
  get codigoAfiliadoFormControl(): FormControl { return this.signUpGroup.get('codigoAfiliado') as FormControl; }

  constructor(
    private formBuilder: FormBuilder,
    private bancoService: BancoService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private clienteService: ClienteService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private toastr: ToastrService  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.departamentoService.getAll().subscribe(
    {
      next: response => {
        this.getClientModel();
        this.departamentos = response;
      },
      error: error => {
        if (error.status === 404) {
          console.log("error 404", error)
        }
      }
    });
  }

  getClientModel(): void {
    if (this.sessionService.isAuthenticated()) {
      this.clienteService.obtenerCliente(this.helper.decodeToken(this.token).nameid).subscribe(
      { 
        next: data => {
        this.nuevo = false;
        this.mostrarObjetosRegistro = false;
        if (data.codigoAfiliado != '') {
          this.mostrarAfiliado = true;
          this.mostrarCheckAfiliado = false;
          this.mostrarCodigoAfiliado = true;
          this.readOnlyCodigoReferido = true;
          this.bancoService.getAll().subscribe(response => {
            this.bancos = response;
          });
          this.municipioService.obtenerMunicipiosPorIdDepartamento(data.idDepartamento).subscribe(response => {
            this.municipios = response;
          });
        }
        this.signUpGroup.patchValue(
          {
            idCliente: data.idCliente,
            identificacion: data.identificacion,
            nombre: data.nombre,
            direccion: data.direccion,
            idDepartamento: data.idDepartamento,
            idMunicipio: data.idMunicipio,
            telefono: data.telefono,
            correoElectronico: data.correoElectronico,
            cuentaBancaria: data.cuentaBancaria,
            idBanco: data.idBanco,
            codigoReferido: data.codigoReferido,
            codigoAfiliado: data.codigoAfiliado
          });
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }

  onChange(ob: MatCheckboxChange) {
    this.mostrarAfiliado = ob.checked;

    if (this.bancos === undefined) {
      this.bancoService.getAll().subscribe(
      {
        next: response => {
          this.bancos = response;
        },
        error: error => {
            if (error.status === 404) {
              console.log("error 404", error)
            }
          }
      });
    }

    this.signUpGroup.controls['cuentaBancaria'].setValue("");
    this.signUpGroup.controls['idBanco'].setValue("0");
    this.signUpGroup.controls['codigoReferido'].setValue("");
  }

  onDepartamentoChange(ob: MatSelectChange)
  {
    this.municipioService.obtenerMunicipiosPorIdDepartamento(ob.value).subscribe(
    {
      next: response => {
      this.municipios = response;
      },
      error: error => {
        if (error.status === 404) {
          console.log("error 404", error)
        }
      }
    });
  }

  initForm() {
    let signInValidator = new SignInValidator();
    this.signUpGroup = this.formBuilder.group(
      {
        idCliente: 0,
        identificacion: ['', [Validators.required]],
        nombre: [this.dataModel.nombre, [Validators.required]],
        direccion: [this.dataModel.direccion, [Validators.required]],
        idDepartamento: [this.dataModel.idDepartamento, [Validators.required]],
        idMunicipio: [this.dataModel.idMunicipio, [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        correoElectronico: [this.dataModel.correoElectronico, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        contrasena: ['', [Validators.required, signInValidator.formatPassword]],
        confirm: ['', [Validators.required, this.confirmPassword]],
        cuentaBancaria: [this.dataModel.cuentaBancaria, [Validators.pattern('[0-9]+')]],
        idBanco: [this.dataModel.idBanco],
        codigoReferido: [this.dataModel.codigoReferido],
        codigoAfiliado: [this.dataModel.codigoAfiliado]
      }
    );
  }

  send(): void {
    if (this.signUpGroup.valid) {
      let puedeContinuar: boolean = true;

      if (this.idDepartamentoFormControl.value === '' || this.idDepartamentoFormControl.value === 0) {
        this.toastr.error("Debe seleccionar un departamento.", "Lo Sentimos!!!");
        puedeContinuar = false;
      }

      if (this.idMunicipioFormControl.value === '' || this.idMunicipioFormControl.value === 0) {
        this.toastr.error("Debe seleccionar una ciudad.", "Lo Sentimos!!!");
        puedeContinuar = false;
      }
            
      if (this.mostrarAfiliado) {

        if (this.idBancoFormControl.value === '' || this.idBancoFormControl.value === 0) {
          this.toastr.error("Debe seleccionar el banco.", "Lo Sentimos!!!");
          puedeContinuar = false;
        }

        if (this.cuentaBancariaFormControl.value === '') {
          this.toastr.error("Debe digitar la cuenta bancaria.", "Lo Sentimos!!!");
          puedeContinuar = false;
        }

        if (this.codigoReferidoFormControl.value === '') {
          this.toastr.error("Debe digitar el código del afiliado referido.", "Lo Sentimos!!!");
          puedeContinuar = false;
        }
      }
      else {
        this.signUpGroup.controls['cuentaBancaria'].setValue("0");
        this.signUpGroup.controls['idBanco'].setValue("0");
        this.signUpGroup.controls['codigoReferido'].setValue("");
      }

      if (puedeContinuar) {

        if (this.nuevo) {
          this.clienteService.createCliente(this.signUpGroup.getRawValue()).subscribe(
          {
            next: data => {
              if (data.codigoAfiliado === "")
                this.toastr.success("Felicidades!!!. Ya formas parte de Mundo Indigo", "Información", { toastComponent: ToastAnimationsComponent });
              else {
                this.toastr.success("Felicidades!!!. Ya formas parte de Mundo Indigo, tu codigo de Afiliado es: " + data.codigoAfiliado, "Información", { toastComponent: ToastAnimationsComponent });
              }
              this.storageService.setToken(data.token);
              this.getClientModel();
            },
            error: err => {
              this.toastr.error(err.error, "Algo inesperado ha sucedio:");
            }
          });
        }
        else {
          this.clienteService.actualizarCliente(this.signUpGroup.getRawValue()).subscribe(
          {
              next: data => {
                this.toastr.success("Actualización de datos Correctamente", "Información", { toastComponent: ToastAnimationsComponent });
                this.storageService.setToken(data.token);
                this.getClientModel();
              },
              error: err => {
                this.toastr.error(err.error, "Algo inesperado ha sucedio:");
              }
          });
        }
      }
    }
  }

  doSomething() {

  }

  confirmPassword(formControl: AbstractControl): { [s: string]: string } {
    if (!formControl || !formControl.parent) {
      return {};
    }
    const password = formControl.parent.get('password');
    const confirm = formControl.parent.get('confirm');
    if (password && password.value && confirm && confirm.value) {
      if (password.value !== confirm.value) {
        return { confirmPassword: 'Las contraseñas no coinciden' };
      }
      return {};
    }
    return {};
  }
}

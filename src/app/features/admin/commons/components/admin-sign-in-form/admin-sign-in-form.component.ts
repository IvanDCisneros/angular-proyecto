import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignInRequest } from '../../../../../shared/interfaces/sign-in-request.interface';
import { SignInValidator } from '../../../../../shared/validators/sign-in.validator';


@Component({
  selector: 'app-admin-sign-in-form',
  templateUrl: './admin-sign-in-form.component.html',
  styleUrls: ['./admin-sign-in-form.component.scss']
})
export class AdminSignInFormComponent implements OnInit {

  group: FormGroup;
  @Output() formData: EventEmitter<ISignInRequest> = new EventEmitter<ISignInRequest>();

  get usuarioFormControl(): FormControl { return this.group.get('usuario') as FormControl; }
  get passwordFormControl(): FormControl { return this.group.get('password') as FormControl; }

  constructor(
    private formBuilder: FormBuilder) {
    let signInValidator = new SignInValidator();
    this.group = this.formBuilder.group(
      {
        usuario: ['', [Validators.required]],
        password: ['', [Validators.required, signInValidator.formatPassword]]
      }
    );
  }

  ngOnInit(): void {
  }

  send(): void {
    if (this.group.valid) {
      this.formData.emit(this.group.value);
    }
  }

}

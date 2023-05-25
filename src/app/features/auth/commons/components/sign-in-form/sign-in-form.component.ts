import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { SignInValidator } from 'src/app/shared/validators/sign-in.validator';
import { Router } from '@angular/router';
import { ISignInRequest } from '../../../../../shared/interfaces/sign-in-request.interface';



@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  group: FormGroup;
  @Output() formData: EventEmitter<ISignInRequest> = new EventEmitter<ISignInRequest>();
 
  get usuarioFormControl(): FormControl{ return this.group.get('usuario') as FormControl; }
  get passwordFormControl(): FormControl{ return this.group.get('password') as FormControl; }
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {
    let signInValidator = new SignInValidator();
    this.group = this.formBuilder.group(
      {
        usuario: ['',[Validators.required]],
        password: ['',[Validators.required, signInValidator.formatPassword]]
      }
    );
  }

  ngOnInit(): void {
  }

  send(): void{
    if(this.group.valid)
    {
      this.formData.emit(this.group.value);
    }
  }

  goToSignUp() {
    this.router.navigateByUrl('/auth/sign-up')
  }
}

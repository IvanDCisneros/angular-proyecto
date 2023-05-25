import { AbstractControl } from "@angular/forms";

export class SignInValidator {
  formatPassword(formControl: AbstractControl): { [s: string]: string | boolean } {
    if (!formControl || !formControl.parent) {
      return { formatError: false }
    }

    const password: string = formControl.value;
    if (password.length < 6) {
      return { formatError: 'El password no debe tener menos de 6 caracteres.' }
    }
    else if (password.length > 8) {
      return { formatError: 'El password no debe tener mas de 8 caracteres.' }
    }
    else {
      return {}
    }
  }
}

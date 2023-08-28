import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable({
    providedIn: 'root'
  })
export class ValidationsService{
    
 
  //Validar error de las contraseñas 
   validatePassword(campo1: string,campo2: string): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null =>{
      let elemento1 = control.get(campo1)?.value;
      let elemento2 = control.get(campo2)?.value;
      if( elemento1 != elemento2){
        control.get(campo2)?.setErrors({"error_password": true});
        return {"error_password": true};
      }
      else{
        control.get(campo2)?.setErrors(null);
        return null;
      } 
    }
  }
}
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authS: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private vs: ValidationsService,
    
    ) { }

    public formLogin = this.fb.group({
      "email": [,[Validators.required,Validators.email]],
      "password": [,[Validators.required]]
    })
    loginUser(){
      if(this.formLogin.valid){
        let credenciales: Credentials = {
          "email": this.formLogin.get("email")?.value!,
          "password": this.formLogin.get("password")?.value!
        }
        console.log("valido",credenciales);
        this.authS.logIn(credenciales).subscribe(
          response=>{
            console.log("response :",response);
            if(response.status){
              this.redirectToDashboard();
            }
          }
        )
      }
    }
    private redirectToDashboard(){
      setTimeout(()=>{
        this.router.navigate(["dashboard"]);
      },3000)
     
    }
    isPristineAndValid(value: string): boolean | undefined{
   
      let input = this.formLogin.get(value);
      //retorna 3 valores: 
      //Si el valor es valido y aun no se ha hecho cambios en el form= true
      //caso contrario pueden pasar dos cosas:
      //Si se ha tocado el formulario y es invalido, retorna falso
      //Si no se ha tocado el form y es invalido o ha pasado algo, undefined
      return (input?.valid && !input?.pristine 
        ? true 
        : (input?.touched && input?.invalid) 
        ? false 
        : undefined );
   
    }
    public messageError(campo: string): string{
      let input = this.formLogin.get(campo);
      if(input?.hasError("required")) return `El atributo ${campo} es requerido`;
      else if(input?.hasError("minlength")){
        let errorLeng = input.getError("minlength");
        return `Usted ha escrito ${errorLeng.actualLength} de ${errorLeng.requiredLength} caracteres`;
      } 
      else if(input?.hasError("email"))  return `El formato es email`;
      
      
      return "";
    }
   
}

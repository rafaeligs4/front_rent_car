import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ValidationsService } from '../../../services/validations.service';
import { Router } from '@angular/router';

interface UserRegister{
  name: string;
 email:  string;
 rol: string;
 password: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{

  constructor(
    private authS: AuthService, 
    private fb: FormBuilder,
    private vs: ValidationsService,
    private route: Router
    ) { }
  public visible = false;
  public message!: string;
  public status!: boolean;

  public formRegister = this.fb.group({
    name: [,[Validators.required, Validators.minLength(4)],[]],
    email: [,[Validators.required, Validators.email],[]],
    rol:  ["",[Validators.required],[]],
    password: [,[Validators.required, Validators.minLength(6)],[]],
    repeatPassword: [,[Validators.required, Validators.minLength(6)],[]]
  },{ validators: [this.vs.validatePassword('password','repeatPassword')]});
  
  ngOnInit(): void {

    console.log(this.authS.JWT);
  }
  
  public messageError(campo: string): string{
    let input = this.formRegister.get(campo);
    if(input?.hasError("required")) return `El atributo ${campo} es requerido`;
    else if(input?.hasError("minlength")){
      let errorLeng = input.getError("minlength");
      return `Usted ha escrito ${errorLeng.actualLength} de ${errorLeng.requiredLength} caracteres`;
    } 
    else if(input?.hasError("error_password"))  return `Las contraseñas no son iguales`;
    else if(input?.hasError("email"))  return `El formato es email`;
    
    
    return "";
  }

  isPristineAndValid(value: string): boolean | undefined{
   
    let input = this.formRegister.get(value);
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
 

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  public sumbit(){
    if(this.formRegister.valid){
      
      let local = this.formRegister;
      let userData: UserRegister = {
        name: local.get("name")?.value,
        email: local.get("email")?.value,
        rol: local.get("rol")?.value,
        password: local.get("password")?.value
      };
      this.authS.registerUser(userData).subscribe(response=>{
        console.log("status " +response.status);
        this.status=response.status!;
        this.message=response.message;
        this.toggleLiveDemo();
        this.redirectToDashboard();
      });
    }
    this.formRegister.reset();
  }

 private redirectToDashboard(){
    setTimeout(()=>{
      this.route.navigate(["dashboard"]);
    },3000)
   
  }
}

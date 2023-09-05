import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authS: AuthService,
              private router: Router,
              private fb: FormBuilder
    
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
}

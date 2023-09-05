import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable, map, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { RequestHttpInt } from '../models/request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  //variables a definir
  private uri_endpoints: string[] = ["/create-user","/get-users","update-user","/login"]
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      "observe": "response"
    })
  };
  private JWT = null || localStorage.getItem("JWT") ;

  
  //acciones 
  public registerUser(data: User): Observable<RequestHttpInt>{
    return this.http.post<RequestHttpInt>(environment.URI+environment.API_URI+this.uri_endpoints[0],data,this.httpOptions)
    .pipe(
      tap(response=>{
        if(response.status){
          localStorage.setItem("JWT",JSON.stringify(data));
        }
      }));
  }

  public getUsers():Observable<any>{
    return this.http.get<any>(environment.URI+environment.API_URI+ this.uri_endpoints[1],this.httpOptions);
  }
  public logIn(dataCredentials: any):Observable<any>{
    return this.http.post<any>(environment.URI+this.uri_endpoints[3],dataCredentials,{"observe": "response"})
    .pipe(map((response: HttpResponse<any>)=>{
      console.log(response);
      const header = response.headers;
      
      const body = response.body;
      const auth = header.get(environment.HEADER_AUTHORIZATION);
      if(auth){
        const token = auth.replace(environment.BEARER_AUTHORIZATION,"");
        localStorage.setItem("token",token!);
        return {"status": true}
      }
    
      console.log("Probando brnaches");

      return {"status": false}
    }))
    .pipe()
  }
  
  public logOut(){
    localStorage.removeItem("token");
  }

  public getToken():string{
    return localStorage.getItem("token")!;
  }
}

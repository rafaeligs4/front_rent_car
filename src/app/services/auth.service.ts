import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { RequestHttpInt } from '../models/request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  //variables a definir
  private uri_endpoints: string[] = ["/create-user","/get-users","update-user"]
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'

    })
  };
  public JWT = null || localStorage.getItem("JWT") ;

  
  //acciones 
  public registerUser(data: User): Observable<RequestHttpInt>{
    return this.http.post<RequestHttpInt>(environment.url+this.uri_endpoints[0],data,this.httpOptions)
    .pipe(
      tap(response=>{
        if(response.status){
          localStorage.setItem("JWT",JSON.stringify(data));
        }
      }));
  }

  public getUsers():Observable<any>{
    return this.http.get<any>(environment.url+this.uri_endpoints[1],this.httpOptions);
  }
  
}

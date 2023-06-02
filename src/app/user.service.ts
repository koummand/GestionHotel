import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClassClient, Client } from './listuser/model/Client';
import { Observable, throwError, of, Subscription } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { ActivatedRoute, Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly HOTEL_API_URL = 'api/clients';
  private client!:Subscription;

  constructor(private http: HttpClient) { }

  
  singIn(login:string,password:string){
   this.client = this.getUsers().subscribe({
      next: clients => clients.find((client:Client)=>client.email===login && client.password===password),
      error: catchError(this.handleHttpError)
    });
    if(this.client!=null){
      return"connexion reuissit";
      
    }else{
      return "echec de connexion";
    }
  }
  
  singOut(){

  }
  
  public getUsers():Observable<Client[]>{
    return this.http.get<Client[]>(this.HOTEL_API_URL).pipe(
      tap(clients=>console.log('clients',clients)),
      catchError(this.handleHttpError)
      );
    }
    
    public deleteUser(id:number): Observable<{}>{
      const url=`${this.HOTEL_API_URL}/${id}`;
      
      return this.http.delete<Client>(url).pipe(
        catchError(this.handleHttpError)
        );
      }
     
      
      public getUserById(id:number):Observable<Client>{
        const url=`${this.HOTEL_API_URL}/${id}`;
        if(id===0){
          return of(this.getDefaultHotel());
        }else{
          return this.http.get<Client>(url).pipe(
            catchError(this.handleHttpError)
            );
          }
        }
        
      public  singUpservice(client:Client):Observable<Client>{
          client={
            ...client,
            id:0
          };
          return this.http.post<Client>(this.HOTEL_API_URL,client).pipe(
            catchError(this.handleHttpError)
          )
        }
        
        

  public updateUser(client:Client): Observable<Client>{

 const url=`${this.HOTEL_API_URL}/${client.id}`;

   return this.http.put<Client>(url,client).pipe(
    catchError(this.handleHttpError)
   );
  }

  private handleHttpError(err: HttpErrorResponse) {
    let error: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
      error = `An error occurred: ${err.error.message}`;
    } else {
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`
      );
      error = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
      + '\n'
      + error
      );
    }

    private getDefaultHotel(): Client {
      return {
        id: 0,
        nom: '',
        sexe: '',
        telephone: 0,
        email: '',
        adresse: '',
        password: '',
       };
    }
  }
  
  
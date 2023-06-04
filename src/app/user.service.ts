
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClassClient, Client } from './listuser/model/Client';
import { Observable, throwError, of, Subscription } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private client!:Subscription;

  readonly API_URL="http://localhost:8082";
  readonly READ="/findAllClient";
  readonly READID="/getClient/id/";
  readonly WRITTE="/addClient";
  readonly UPDATE= "updateClient/id/";
  readonly DELETE="/deleteClient/id/";
  
  constructor(private http: HttpClient, private route: Router) { }

  
  singIn(login:string,password:string){
    this.client = this.getUsers().subscribe({
      next: clients => clients.find((client:Client)=>{
       
        if(client.email===login && client.password===password){
          alert('connexion reuissit');
          this.route.navigate(['/listchambre'])
         }else{
          
           this.route.navigate(['/signup'])
    
         }
      }),
      error: catchError(this.handleHttpError)
    });
    
  }
  
  singOut(){

  }
  
  public getUsers():Observable<Client[]>{
    
    return this.http.get<Client[]>(this.API_URL+this.READ).pipe(
      tap(clients=>console.log('clients',clients)),
      catchError(this.handleHttpError)
      );
    }
    
    public deleteUser(id:number): Observable<{}>{
     
      
      return this.http.delete<Client>(this.API_URL+this.DELETE+id).pipe(
        catchError(this.handleHttpError)
        );
      }
     
      
      public getUserById(id:number):Observable<Client>{
        
        if(id===0){
          return of(this.getDefaultHotel());
        }else{
          return this.http.get<Client>(this.API_URL+this.READID+id).pipe(
            catchError(this.handleHttpError)
            );
          }
        }
        
      public  singUpservice(client:Client):Observable<Client>{
        
          client={
            ...client,
            id:0
          };
          return this.http.post<Client>(this.API_URL+this.WRITTE,client).pipe(
            catchError(this.handleHttpError)
          )
        }
        
        

  public updateUser(client:Client): Observable<Client>{
   return this.http.put<Client>(this.API_URL+this.UPDATE+client.id,client).pipe(
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
  
  
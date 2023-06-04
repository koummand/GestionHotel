import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { classFournisseur, Fournisseur } from './list-fournisseur/model/Fournisseur';
import { Observable, throwError, of, Subscription } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  readonly API_URL="http://localhost:8082";
  readonly READ="/findAllfournisseur";
  readonly READID="/findfournisseurById/id/";
  readonly WRITTE="/addFournisseur";
  readonly UPDATE= "updateFournisseur/id/";
  readonly DELETE="/deleteFounrisseur/id/";

  constructor(private http: HttpClient) { 

  }



  private fournisseur!:Subscription;


  
  singIn(login:string,password:string){
   /*this.client = this.getUsers().subscribe({
      next: clients => clients.find((client:Client)=>client.nom===login && client.password===password),
      error: catchError(this.handleHttpError)
    });
    if(!!this.client){
      console.log("connexion reuissit")
    }else{
      console.log("echec de connexion");
    }*/
  }
  
  singOut(){
  }
  
  public getFournisseurs():Observable<Fournisseur[]>{
   
    return this.http.get<Fournisseur[]>(this.API_URL+this.READ).pipe(
      tap(clients=>console.log('clients',clients)),
      catchError(this.handleHttpError)
      );
    }
    
    public deleteFournisseur(id:number): Observable<{}>{
      const url=this.API_URL+this.DELETE+id;
      
      return this.http.delete<Fournisseur>(url).pipe(
        catchError(this.handleHttpError)
        );
      }
     
      
      public getFournisseurById(id:number):Observable<Fournisseur>{
        
        if(id===0){
          return of(this.getDefaultFournisseur());
        }else{
          return this.http.get<Fournisseur>(this.API_URL+this.READID+id).pipe(
            catchError(this.handleHttpError)
            );
          }
        }
        
      public  saveFournisseur(fournisseur:Fournisseur):Observable<Fournisseur>{
          fournisseur={
            ...fournisseur,
            id:0
          };
          
          return this.http.post<Fournisseur>(this.API_URL+this.WRITTE,fournisseur).pipe(
            catchError(this.handleHttpError)
          )
        }
        
        

  public updateFournisseur(fournisseur:Fournisseur): Observable<Fournisseur>{

       

   return this.http.put<Fournisseur>(this.API_URL+this.UPDATE+fournisseur.id,fournisseur).pipe(
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

    private getDefaultFournisseur(): Fournisseur {
      return {
        id: 0,
       fournisseurName: '',  
        }     
      };
    }
  
  

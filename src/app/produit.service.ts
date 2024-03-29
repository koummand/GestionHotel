import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Produit } from './list-produit/model/Produit';
import { Fournisseur } from './list-fournisseur/model/Fournisseur';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  readonly API_URL="http://localhost:8082";
  readonly READ="/findAllProduit";
  readonly READID="/findProduitById/id/";
  readonly WRITTE="/addProduit";
  readonly UPDATE= "updateProduit/id/";
  readonly DELETE="/deleteProduit/id/";

  constructor(private http: HttpClient) { }

  public getProduits(): Observable<Produit[]> {
    
    return this.http.get<Produit[]>(this.API_URL+this.READ).pipe(  
      tap(produits=>console.log('produits', produits)),
      catchError(this.handleHttpError)
    );
  }
  
  public getProduitsById(id: number): Observable<Produit> {
     
   if (id === 0) {
      return of(this.getDefaultProduit());
    }
    return this.http.get<Produit>(this.API_URL+this.READID+id).pipe(
      catchError(this.handleHttpError)
    )
  }

  public saveProduit(produit: Produit): Observable<Produit> {
    
    produit = {
      ...produit,
      //imageUrl: 'assets/img/indoors.jpg',
      id:0//to do null
      };
      return this.http.post<Produit>(this.API_URL+this.WRITTE, produit).pipe(
      catchError(this.handleHttpError)
    )
  }

  public updateProduit(produit: Produit): Observable<Produit> {
    const url = this.API_URL+this.UPDATE+produit.id;

    return this.http.put<Produit>(url, produit).pipe(
      catchError(this.handleHttpError)
    );
  }

  public deleteProduit(id: number ): Observable<{}> {
    const url = this.API_URL+this.DELETE+id;

    return this.http.delete<Produit>(url).pipe(
      catchError(this.handleHttpError)
    );
  }

  private getDefaultProduit(): Produit {
    return {
      id: 0,
      prix:0,
      designation:'',
      quantite_stock:0,
      fournisseur:{
           id:0,
           fournisseurName:''
      },
    };
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
      // The backend returned an unsuccessful response code.
}



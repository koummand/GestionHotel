import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Chambre } from './listchambre/model/Chambre';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn:'root'
})
export class ChambreService {
  
  
  readonly API_URL="http://localhost:8082";
  readonly READ="/findAllChambre";
  readonly READID="/getChambre/id/";
  readonly WRITTE="/addchambre";
  readonly UPDATE= "/updateChambre/id/";
  readonly DELETE="/deleteChambre/id/";
  

  constructor(private http: HttpClient) { }
  
  public getHotels(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.API_URL+this.READ);
  }
  
  public getHotelById(id: number): Observable<Chambre> {
   if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<Chambre>(this.API_URL+this.READID+'/'+id).pipe(
      catchError(this.handleHttpError)
    )
  }

  public createHotel(hotel: Chambre): Observable<Chambre> {
    hotel = {
      ...hotel,
      //imageUrl: 'assets/img/indoors.jpg',
      id:0//to do null
      };
    return this.http.post<Chambre>(this.API_URL+this.WRITTE, hotel).pipe(
      catchError(this.handleHttpError)
    )
  }

  public updateHotel(chambre: Chambre): Observable<Chambre> {
   

    return this.http.put<Chambre>(this.API_URL+this.UPDATE+chambre.id, chambre).pipe(
      catchError(this.handleHttpError)
    );
  }

  public deleteHotel(id: number ): Observable<{}> {
    const url = this.API_URL+this.DELETE+id;

    return this.http.delete<Chambre>(url).pipe(
      catchError(this.handleHttpError)
    );
  }

  private getDefaultHotel(): Chambre {
    return {
      id: 0,
      hotelName: '',
      description: '',
      price: 0,
      rating: 0,
      imageUrl: ''
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

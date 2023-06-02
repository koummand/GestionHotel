import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Chambre } from './listchambre/model/Chambre';
import { Injectable } from '@angular/core';
import { Client } from './listuser/model/Client';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  private readonly HOTEL_API_URL = 'api/chambres';

  constructor(private http: HttpClient) { }

  public getHotels(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.HOTEL_API_URL).pipe(  
      tap(hotels=>console.log('hotels', hotels)),
      catchError(this.handleHttpError)
    );
  }
  
  public getHotelById(id: number): Observable<Chambre> {
    const url= `${this.HOTEL_API_URL}/${id}`;
   if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<Chambre>(url).pipe(
      catchError(this.handleHttpError)
    )
  }

  public createHotel(hotel: Chambre): Observable<Chambre> {
    hotel = {
      ...hotel,
      imageUrl: 'assets/img/indoors.jpg',
      id:0//to do null
      };
    return this.http.post<Chambre>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleHttpError)
    )
  }

  public updateHotel(chambre: Chambre): Observable<Chambre> {
    const url = `${this.HOTEL_API_URL}/${chambre.id}`;

    return this.http.put<Chambre>(url, chambre).pipe(
      catchError(this.handleHttpError)
    );
  }

  public deleteHotel(id: number ): Observable<{}> {
    const url = `${this.HOTEL_API_URL}/${id}`;

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

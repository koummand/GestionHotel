import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditchambreComponent } from './editchambre/editchambre.component';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<EditchambreComponent> {
  canDeactivate(component: EditchambreComponent): boolean{
    if(component.hotelForm.dirty){
      const hotelName=((component.hotelForm.get('hotelName')) as AbstractControl<any, any>).value || 'Nouvelle chambre';
      return confirm(`voulez vous annuler les changement effectuer sur ${hotelName}`)
    }
    return true;
  }
  
}

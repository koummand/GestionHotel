import { Component, OnInit } from '@angular/core';
import { Chambre } from './model/Chambre';
import { ChambreService } from '../chambre.service';


@Component({
  selector: 'app-listchambre',
  templateUrl: './listchambre.component.html',
  styleUrls: ['./listchambre.component.css']
})
export class ListchambreComponent implements OnInit{

  public title ="Liste des Chambres";
  public showBadge:boolean=true;
  private _hotelFilter='mot';
  public filtersHotels :Chambre[]=[];
  public receiveRating!:string;
  public errorMessage!:string;
  public hotels: Chambre[] = [];
  
   public get hotelFilter():string{
    return this._hotelFilter;
   }

  public set hotelFilter(filter:string){
    this._hotelFilter=filter;
    this.filtersHotels= this.hotelFilter? this.filterchambres(this.hotelFilter) : this.hotels;
  }
  private filterchambres(criteria:string):Chambre[]{
      criteria= criteria.toLocaleLowerCase();
      const response= this.hotels.filter(
        (chambre:Chambre)=>chambre.hotelName.toLocaleLowerCase().indexOf(criteria) != -1 
      );
      return response;
  }
    constructor(private chambreService: ChambreService){}
  
    ngOnInit() {
     this.chambreService.getHotels().subscribe({
      next:hotel=>{
        this.hotels=hotel,
          this.filtersHotels=this.hotels;  
      },
      error:err=>this.errorMessage=err
     });
      this.hotelFilter='';
    }

    public togleIsnewbadge():void{
      this.showBadge=!this.showBadge;
    }
    public receiveRatingClicked(message:string):void{
        this.receiveRating=message;
    }
  
  
  }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chambre } from '../listchambre/model/Chambre';
import { ChambreService } from '../chambre.service';

@Component({
  selector: 'app-singlechambre',
  templateUrl: './singlechambre.component.html',
  styleUrls: ['./singlechambre.component.css']
})
export class SinglechambreComponent implements OnInit {
  
    public chambre: Chambre = <Chambre>{ };

      public id!:number;
      public hotelName!: string;
      public description!: string;
      public price!: number;
      public imageUrl!: string;
      public rating!: number;
      public tags?: string[]
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private chambreService: ChambreService
    ) {
      this.id= this.chambre.id
      this.hotelName= this.chambre.hotelName
      this.description= this.chambre.description
      this.price= this.chambre.price
      this.imageUrl= this.chambre.imageUrl
      this.rating= this.chambre.rating
      this.tags= this.chambre.tags
     }
  
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.chambreService.getHotelById(id).subscribe(
        (chambre: Chambre) => {
          this.chambre = chambre;  
      })
    }
    
    public backToList(): void {
      this.router.navigate(['/listchambre']);
    }
    public reservation(): void {
      this.router.navigate(['/reservation']);
    }
  }
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
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private chambreService: ChambreService
    ) { }
  
    ngOnInit(): void {
      const id = +(this.route.snapshot.paramMap.get('id') as string);
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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../list-produit/model/Produit'; 
import { ProduitService } from '../produit.service'; 

@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.component.html',
  styleUrls: ['./single-produit.component.css']
})
export class SingleProduitComponent implements OnInit {

    public produit: Produit = <Produit>{ };
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private produitService: ProduitService
    ) { }
  
    ngOnInit(): void {
      const id = +(this.route.snapshot.paramMap.get('id') as string);
      this.produitService.getProduitsById(id).subscribe(
        (produit: Produit) => {
          this.produit = produit;  
      })
    }
  
    public backToList(): void {
      this.router.navigate(['/listproduit']);
    }
    public passercommande(): void {
      this.router.navigate(['/command']);
    }
  }


import { Component,OnInit } from '@angular/core';
import { Produit } from './model/Produit';
import { ProduitService } from '../produit.service';
import { Fournisseur } from '../list-fournisseur/model/Fournisseur';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent  implements OnInit{
  
    public title ="Liste des Produits";
    private _produitFilter='mot';
    public filtersProduits :Produit[]=[];
    public errorMessage!:string;
    public produits: Produit[] = [];
    public fournisseurs:Fournisseur[]=[];
    
     public get produitFilter():string{
      return this._produitFilter;
     }
  
    public set produitFilter(filter:string){
      this._produitFilter=filter;

      this.filtersProduits= this.produitFilter? this.filterproduits(this.produitFilter) : this.produits;
    }
    private filterproduits(criteria:string):Produit[]{
        criteria= criteria.toLocaleLowerCase();
        const response= this.produits.filter(
          (produit:Produit)=>produit.designation.toLocaleLowerCase().indexOf(criteria) != -1 
        );
        return response;
    }
      constructor(private produitService: ProduitService){}
    
      ngOnInit() {
       this.produitService.getProduits().subscribe({
        next:produit=>{
          this.produits=produit,
            this.filtersProduits=this.produits;  
        },
        error:err=>this.errorMessage=err
       });
        this.produitFilter='';   
    
    
    }
  

}
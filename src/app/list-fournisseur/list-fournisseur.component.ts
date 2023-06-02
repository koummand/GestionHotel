import { Component, OnInit } from '@angular/core';
import { Fournisseur } from './model/Fournisseur';
import { UserService } from '../user.service';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit{

   fournisseurs : Fournisseur[]=[];

  public title ="Liste des fournisseur";
  private _fournisseurFilter='mot';
  public filtersFournisseurs :Fournisseur[]=[];
  public errorMessage!:string;
  
   public get fournisseurFilter():string{
    return this._fournisseurFilter;
   }

  public set fournisseurFilter(filter:string){
    this._fournisseurFilter=filter;
    this.filtersFournisseurs= this.fournisseurFilter? this.filterfournisseurs(this.fournisseurFilter) : this.fournisseurs;
  }
  private filterfournisseurs(criteria:string):Fournisseur[]{
      criteria= criteria.toLocaleLowerCase();
      const response= this.fournisseurs.filter(
        (fournisseur:Fournisseur)=>fournisseur.fournisseurName.toLocaleLowerCase().indexOf(criteria) != -1
      );
      return response;
  }
    constructor(private fournisserService: FournisseurService){}
  
    ngOnInit() {
     this.fournisserService.getFournisseurs().subscribe({
      next:fournisseurs =>{
        this.fournisseurs=fournisseurs,
          this.filtersFournisseurs=this.fournisseurs;  
      },
      error:err=>this.errorMessage=err
     });
      this.fournisseurFilter='';
    }
  
  }

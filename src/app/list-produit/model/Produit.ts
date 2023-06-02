import { Fournisseur } from "src/app/list-fournisseur/model/Fournisseur";

export interface Produit{
 
 id:number;

prix:number;

designation:string;

quantite_stock:number;

fournisseur:Fournisseur;
}


export class ClassProduit{
 constructor(
    private id:number,

    private  prix:number,

    private désignation:string,

    private  quantité_stock:number,

    private fournisseur:Fournisseur
 ){}

}

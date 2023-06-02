import{InMemoryDbService} from 'angular-in-memory-web-api';
import { Produit } from '../list-produit/model/Produit';


export class ProduitData implements InMemoryDbService{

       createDb():Record<string,Produit[]>{
        
        const produits:Produit[]=[
              {  
                id: 1,
                prix:10,
                designation: "lait",
                quantite_stock: 23,
               
                fournisseur:    {
                  id:3,
                  fournisseurName: "compagnie maxwel",
                 
                }
            },
              {
                id: 2,
                prix:30,
                designation: "poulet",
                quantite_stock: 60,
               
                fournisseur:    {
                  id: 2,
                  fournisseurName: "quickly chicken",
                 
                }
            },
              {
                id: 3,
                prix:70,
                designation: "riz",
                quantite_stock: 12,
               
                fournisseur:    {
                  id:1,
                  fournisseurName: "compagnie riz",
                 
                }
            },
            {
                id: 4,
                prix:57,
                designation: "Wisky",
                quantite_stock: 63,
               
                fournisseur:    {
                  id:4,
                  fournisseurName: "wiskao currently",
                 
                }
            }
          ];
        return {produits};
       }
       genId(produits:Produit[]):number{
        return produits.length>0 ? Math.max(...produits.map(produit=>produit.id))+1 : 1;
       }
}
import{InMemoryDbService} from 'angular-in-memory-web-api';
import { Fournisseur } from '../list-fournisseur/model/Fournisseur';


export class FounrnisseurData implements InMemoryDbService{

       createDb():Record<string,Fournisseur[]>{
        
        const fournisseurs:Fournisseur[]=[
            {
                id: 1,
                fournisseurName: "compagnie riz",     
            },
              {
                id: 2,
                fournisseurName: "quickly chicken",
            },
              {
                id: 3,
                fournisseurName: "compagnie maxwel",
            },
            {
                id: 4,
                fournisseurName: "wiskao currently",
                } ];
        return {fournisseurs};
       }
       genId(fournisseurs:Fournisseur[]):number{
        return fournisseurs.length>0 ? Math.max(...fournisseurs.map(fournisseur=>fournisseur.id))+1 : 1;
       }
}
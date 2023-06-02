import{InMemoryDbService} from 'angular-in-memory-web-api';
import { Chambre } from '../listchambre/model/Chambre';
import { Client } from '../listuser/model/Client';


export class ChambreData implements InMemoryDbService{

       createDb():Record<string,Chambre[]>{
        
        const chambres:Chambre[]=[
              {
              id:1,
              hotelName: "suite 234 kribie",
              description: "une vue magnifique sur le bord de la mer",
              price: 235.5,
              imageUrl: "/assets/img/hotel-room.jpg",
              rating: 3.5,
              tags:['Nouveau']
            },
              {
              id:2,
              hotelName: "suite 109 buea",
              description: "douche interne un lit de deux place ",
              price: 128.40,
              imageUrl: "/assets/img/indoors.jpg",
              rating: 5,
              tags:['Nouveau']
            },
              {
              id:3,
              hotelName: "suite 56 kribie",
              description: "vue sur la plage deux lit de deux place ",
              price: 346.5,
              imageUrl: "/assets/img/the-interior.jpg",
              rating: 2.5,
              tags:['Nouveau']
            },
            {
              id:4,
              hotelName: "suite 245 buea",
              description: "Chambre avec douche interne avec jacousie ",
              price: 167.83,
              imageUrl: "/assets/img/window.jpg",
              rating: 4,
              tags:['Nouveau']
            }
          ];
         
      
        return {chambres};
       }
     
        genId(chambres:Chambre[] | Client[]):number{
          return chambres.length>0 ? Math.max(...chambres.map(chambre=>chambre.id))+1 : 1;
         }
      
}
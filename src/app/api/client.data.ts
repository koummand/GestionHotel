import{InMemoryDbService} from 'angular-in-memory-web-api';
import { Client } from '../listuser/model/Client';

export class ClientData implements InMemoryDbService{

       createDb():Record<string,Client[]>{
        
        const clients:Client[]=[
              {
                id: 1,
                nom: "koummand justin",
                sexe: "homme",
                telephone: 650606184,
                email: "koummandjustin@gmail.com",
                password:"secret123",
                adresse: "yaoundé"
              
            },
              {
                id: 2,
                nom: "woudamvou daniel",
                sexe: "homme",
                telephone: 655599181,
                email: "woudamvoudaniel@gmail.com",
                password:"secret143",
                adresse: "yaoundé"
               
            },
              {
                id: 3,
                nom: "michelle agnesse",
                sexe: "femme",
                telephone: 620466947,
                email: "michelleAgnes@gmail.com",
                password:"secret189",
                adresse: "douala"
                
            },
            {
                id: 4,
                nom: "mamounette diana",
                sexe: "femme",
                telephone: 698251829,  
                email: "mamounettediana@gmail.com",
                password:"secret153",
                adresse: "kribi",
                
            }
          ];
        return {clients};
       }
       genId(clients:Client[]):number{
        return clients.length>0 ? Math.max(...clients.map(client=>client.id))+1 : 1;
       }
}
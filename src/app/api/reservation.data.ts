import{InMemoryDbService} from 'angular-in-memory-web-api';
import { Client } from '../listuser/model/Client';
import { Reservation } from '../reservation/model/Reservation';

export class ClientData implements InMemoryDbService{

       createDb():Record<string,Reservation[]>{
        
        const reservations :Reservation[]=[
              {
                id: 1,
                numeroFacture :"456",
                dateDebut: new Date(),
                dateFin: new Date(),
                nombreDenuit: 6,
                description: "",
                price: 24,
                client:{
                        id: 4,
                    nom: "mamounette diana",
                    sexe: "femme",
                    telephone: 698251829,  
                    email: "mamounettediana@gmail.com",
                    password:"secret153",
                    adresse: "kribi",
                    },
                
                chambre:{
                    id:3,
                    hotelName: "chambre 8",
                    description: "Chambre avec douche interne deux lit de deux place et une table",
                    price: 50,
                    imageUrl: "/assets/img/the-interior.jpg",
                    rating: 2.5,
                    tags:['Nouveau']
                    }
            },
            {
                id: 2,
                numeroFacture :"456",
                dateDebut: new Date(),
                dateFin: new Date(),
                nombreDenuit: 6,
                description: "",
                price: 24,
                client:{
                        id: 4,
                    nom: "mamounette diana",
                    sexe: "femme",
                    telephone: 698251829,  
                    email: "mamounettediana@gmail.com",
                    password:"secret153",
                    adresse: "kribi",
                    },
                
                chambre:{
                    id:3,
                    hotelName: "chambre 8",
                    description: "Chambre avec douche interne deux lit de deux place et une table",
                    price: 50,
                    imageUrl: "/assets/img/the-interior.jpg",
                    rating: 2.5,
                    tags:['Nouveau']
                    }
                },
                {
                    id: 3,
                    numeroFacture :"456",
                    dateDebut: new Date(),
                    dateFin: new Date(),
                    nombreDenuit: 6,
                    description: "",
                    price: 24,
                    client:{
                            id: 4,
                        nom: "mamounette diana",
                        sexe: "femme",
                        telephone: 698251829,  
                        email: "mamounettediana@gmail.com",
                        password:"secret153",
                        adresse: "kribi",
                        },
                    
                    chambre:{
                        id:3,
                        hotelName: "chambre 8",
                        description: "Chambre avec douche interne deux lit de deux place et une table",
                        price: 50,
                        imageUrl: "/assets/img/the-interior.jpg",
                        rating: 2.5,
                        tags:['Nouveau']
                        }
            },
            {
                id: 1,
                numeroFacture :"456",
                dateDebut: new Date(),
                dateFin: new Date(),
                nombreDenuit: 6,
                description: "",
                price: 24,
                client:{
                        id: 4,
                    nom: "mamounette diana",
                    sexe: "femme",
                    telephone: 698251829,  
                    email: "mamounettediana@gmail.com",
                    password:"secret153",
                    adresse: "kribi",
                    },
                
                chambre:{
                    id:4,
                    hotelName: "chambre 8",
                    description: "Chambre avec douche interne deux lit de deux place et une table",
                    price: 50,
                    imageUrl: "/assets/img/the-interior.jpg",
                    rating: 2.5,
                    tags:['Nouveau']
                    }           }
          ];
        return {reservations};
       }
       genId(reservations:Reservation[]):number{
        return reservations.length>0 ? Math.max(...reservations.map(reservation=>reservation.id))+1 : 1;
       }
}
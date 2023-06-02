import { Chambre } from "src/app/listchambre/model/Chambre";
import { Client } from "src/app/listuser/model/Client";

export interface Reservation {
    id: number;
    numeroFacture: string;
    dateDebut:Date;
    dateFin:Date;
    nombreDenuit:number;
    description: string;
    price: number;
    client: Client;
    chambre:Chambre;
  }
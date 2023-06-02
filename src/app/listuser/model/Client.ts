import { Chambre } from "src/app/listchambre/model/Chambre";

export interface Client {
    id: number;
   nom: string;
    sexe: string;
    telephone: number;
   email: string;
   password:string
   adresse: string;
  

 }
  export class ClassClient implements Client{
    constructor(
       public  id: number,
       public nom: string,
       public sexe: string,
       public telephone: number,
       public email: string,
       public password:string,
       public adresse: string,
      
      ){}

  }
export interface Fournisseur{

	id:number;
	
   fournisseurName:string;
}

export class classFournisseur{
    constructor(private id:number, private fournisseurName:string){}
}
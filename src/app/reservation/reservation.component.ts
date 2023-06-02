import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Client } from '../listuser/model/Client';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericGlobalValidator } from '../Validators/generic-global.validator';
import { Chambre } from '../listchambre/model/Chambre';
import { ChambreService } from '../chambre.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  ReservationFormGroup!:FormGroup;
  errorMessage!:string;
  public client!: Client;
  public chambre!:Chambre;
  private isFormSubmitted!: boolean;
  public pageTitle!: string;
  public chambres!: Chambre[];
  private globalGenericValidator!: GenericGlobalValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: 'Le nom du client est obligatoire.',
      minlength: 'Le nom du client doit comporter au moins trois caractères.',
      maxlength: 'Le nom du client ne peut pas dépasser 50 caractères.'
    },
    telephone: {
      required: 'le numero de telephone du client est obligatoire.',
      pattern: 'Veuillez entrer un numro a 9 nombre svp.'
    }
  };

  constructor(public formBuilder:FormBuilder, public route: ActivatedRoute,
     public userService:UserService, public router:Router, public chambreService: ChambreService){ 
     
     }

ngOnInit(): void {
  this.chambreService.getHotels().subscribe({
    next: (chambre)=> this.chambres=chambre,
    error: (err)=>this.errorMessage=err
  });
  this.globalGenericValidator = new GenericGlobalValidator(this.validationMessages);
 
  // first attempt
  this.ReservationFormGroup= this.formBuilder.group({
    nom:['',Validators.required],
    sexe:[''],
    telephone :['',[Validators.required, Validators.pattern(/[0-9]{9,}/)]],
    email:['',[Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    adress:['',Validators.required],
    chambre:['']
      });

  this.route.paramMap.subscribe(params => {
    const id = +(params.get('id') as string);
    this.getSelectedClient(id) ;
  }) 
}

public getSelectedClient(id: number): void {
  this.userService.getUserById(id).subscribe((client: Client) => {
    this.displayClient(client)
  }
  );
}
public displayClient(client: Client): void {
  this.client = client;
   if(this.client.id===0){
    this.pageTitle="S'Enregistrer";
   }else{
    this.pageTitle=`Modifier vos Informations ${this.client.nom}`;
  }
  this.ReservationFormGroup.patchValue({
    nom: this.client.nom,
    sexe: this.client.sexe,
    telephone: this.client.telephone,
    email: this.client.email,
    adress: this.client.adresse, 
    chambre: this.chambre });
}

public saveClient(): void {
  
  this.isFormSubmitted = true;
  this.ReservationFormGroup.updateValueAndValidity({
    onlySelf: true,
    emitEvent: true
  });

  if (this.ReservationFormGroup.valid) {
    if (this.ReservationFormGroup.dirty) {
      const client: Client = {
        ...this.client,
        ...this.ReservationFormGroup.value
      };

      // add or edit logic
      if (client.id === 0) {
        this.userService.singUpservice(client).subscribe({
          next: () => this.saveCompleted(),
          error: (err) => this.errorMessage = err
        });
      } else {
        this.userService.updateUser(client).subscribe({
          next: () => this.saveCompleted(),
          error: (err) => this.errorMessage = err
        });
      }
    } else {
      this.saveCompleted();
    }
  } else {
    this.errorMessage = `Corrigez les erreurs svp.`;
  }
}

public deleteClient(): void {
  
  if (this.client.id === 0) {
    this.saveCompleted();
  } else {
    if (confirm(`Voulez-vous réelement supprimer ${this.client.nom} ?`)) {
      this.userService.deleteUser(this.client.id).subscribe({
        next: () => this.saveCompleted(),
        error: (err) => this.errorMessage = err
      });
    }
  }

}
public saveCompleted(): void {
  this.ReservationFormGroup.reset();
  this.router.navigate(['/listuser']);
}
}


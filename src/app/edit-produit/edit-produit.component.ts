import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, fromEvent, merge, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { Produit } from '../list-produit/model/Produit';
import { ProduitService } from '../produit.service';
import { NumberValidators } from '../Validators/number.validator';
import { GenericGlobalValidator } from '../Validators/generic-global.validator';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../list-fournisseur/model/Fournisseur';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit, AfterViewInit {
  

    
      @ViewChildren(FormControlName, { read: ElementRef }) inputElements!: ElementRef[];
    
      public produitForm!: FormGroup;
      public errorMessage!: string;
      public formErrors: { [key: string]: string } = {};
      public validationMessages: { [key: string]: { [key: string]: string } } = {
        designation: {
          required: 'Le nom du produit est obligatoire.',
          minlength: 'Le nom du produit doit comporter au moins trois caractères.',
          maxlength: 'Le nom du produit ne peut pas dépasser 50 caractères.'
        },
        prix: {
          required: 'le prix du produit est obligatoire.',
          pattern: 'Veuillez entrer un nombre svp.'
        }
      };
      public produit!: Produit;
      public pageTitle!: string;
      public fournisseurs: Fournisseur[]=[];
    
      private globalGenericValidator!: GenericGlobalValidator;
      private isFormSubmitted!: boolean;
    
      constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private produitService: ProduitService,
        private fournnisseurService: FournisseurService
        
    
      ) { }
    
      ngOnInit(): void {
        this.globalGenericValidator = new GenericGlobalValidator(this.validationMessages);
      this.fournnisseurService.getFournisseurs().subscribe({
          next:fourniseur=>{
            this.fournisseurs=fourniseur
          }
      });
        // first attempt
    
        this.produitForm = this.formBuilder.group({
          designation: [ '',[ Validators.required,Validators.minLength(3), Validators.maxLength(50) ]],
          prix: ['', Validators.required],
          quantite: ['', Validators.required],
          fournisseur: ['',Validators.required]
        });
    
        this.route.paramMap.subscribe(params => {
          const id = +(params.get('id') as string);
          this.getSelectedProduit(id) ;
        }) 
      }
    
      ngAfterViewInit() {
        //todo without RxJS => changeDetection Error
        /*this.hotelForm.valueChanges().subscribe(()=>{
          this.formErrors=this.globalGenericValidator.createErrorMessages(this.hotelForm);
          console.log('error', this.formErrors);
        });*/
        this.formErrors = this.globalGenericValidator.createErrorMessages(this.produitForm);
    
        this.validateForm();
      }
    
      public hideErrorMessage(): void {
        this.errorMessage= '';
      }
    
      public getSelectedProduit(id: number): void {
        this.produitService.getProduitsById(id).subscribe((produit: Produit) => {
          this.displayHotel(produit)
        }
        );
      }
    
      public displayHotel(produit: Produit): void {
        this.produit = produit;
         if(this.produit.id===0){
          this.pageTitle="Ajouter un produit";
         }else{
          this.pageTitle=`modifier le produit ${this.produit.designation}`;
        }
        this.produitForm.patchValue({
          designation: this.produit.designation,
          prix: this.produit.prix,
          quantite: this.produit.quantite_stock,
          fournisseur: this.produit.fournisseur,
        });
      }

    
     
    
      public saveProduit(): void {
    
        this.isFormSubmitted = true;
        this.produitForm.updateValueAndValidity({
          onlySelf: true,
          emitEvent: true
        });
    
        if (this.produitForm.valid) {
          if (this.produitForm.dirty) {
            const produit: Produit = {
              ...this.produit,
              ...this.produitForm.value
            };
  
            // add or edit logic
            if (produit.id === 0) {
              this.produitService.saveProduit(produit).subscribe({
                next: () => this.saveCompleted(),
                error: (err) => this.errorMessage = err
              });
            } else {
              this.produitService.updateProduit(produit).subscribe({
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
    
      public deleteProduit(): void {
    
        if (this.produit.id === 0) {
          this.saveCompleted();
        } else {
          if (confirm(`Voulez-vous réelement supprimer ${this.produit.designation} ?`)) {
            this.produitService.deleteProduit(this.produit.id).subscribe({
              next: () => this.saveCompleted(),
              error: (err) => this.errorMessage = err
            });
          }
        }
    
      }
    
    
      public saveCompleted(): void {
        this.produitForm.reset();
        this.router.navigate(['/listproduit']);
      }
    
      public validateForm(): void {
        const formControlBlurs: Observable<unknown>[] = this.inputElements
          .map((formControlElemRef: ElementRef) => fromEvent(formControlElemRef.nativeElement, 'blur'));
    
        merge(this.produitForm.valueChanges, ...formControlBlurs).pipe(
          // debounceTime(300)
          debounce(() => this.isFormSubmitted ? EMPTY : timer(300))
        ).subscribe(() => {
          this.formErrors = this.globalGenericValidator.createErrorMessages(this.produitForm,this.isFormSubmitted);
           
          console.log('value on subscribe errors: ', this.formErrors);
        });
      }
    
    }

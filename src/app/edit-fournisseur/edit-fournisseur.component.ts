import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, fromEvent, merge, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { Chambre } from '../listchambre/model/Chambre';
import { ChambreService } from '../chambre.service';
import { NumberValidators } from '../Validators/number.validator';
import { GenericGlobalValidator } from '../Validators/generic-global.validator';
import { Fournisseur } from '../list-fournisseur/model/Fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.css']
})

export class EditFournisseurComponent implements OnInit, AfterViewInit {
    
      @ViewChildren(FormControlName, { read: ElementRef }) inputElements!: ElementRef[];
    
      public fournisseurForm!: FormGroup;
      public errorMessage!: string;
      public formErrors: { [key: string]: string } = {};
      public validationMessages: { [key: string]: { [key: string]: string } } = {
        fournisseurName: {
          required: 'Le nom du fournisseur est obligatoire.',
          minlength: 'Le nom du fournisseur doit comporter au moins trois caractères.',
          maxlength: 'Le nom du fournisseur ne peut pas dépasser 50 caractères.'
        },
      };

      public fournisseur!: Fournisseur;
      public pageTitle!: string;
    
      private globalGenericValidator!: GenericGlobalValidator;
      private isFormSubmitted!: boolean;
    
      constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private fournisseurService: FournisseurService
    
      ) { }
    
      ngOnInit(): void {
        this.globalGenericValidator = new GenericGlobalValidator(this.validationMessages);
    
        // first attempt
    
        this.fournisseurForm = this.formBuilder.group({
          fournisseurName: [ '',[ Validators.required,Validators.minLength(3), Validators.maxLength(50) ]],
        });
    
        this.route.paramMap.subscribe(params => {
          const id = +(params.get('id') as string);
          this.getSelectedFournisseur(id) ;
        }) 
      }
    
      ngAfterViewInit() {
        //todo without RxJS => changeDetection Error
        /*this.hotelForm.valueChanges().subscribe(()=>{
          this.formErrors=this.globalGenericValidator.createErrorMessages(this.hotelForm);
          console.log('error', this.formErrors);
        });*/
        this.formErrors = this.globalGenericValidator.createErrorMessages(this.fournisseurForm);
    
        this.validateForm();
      }
    
      public hideErrorMessage(): void {
        this.errorMessage= '';
      }
    
      public getSelectedFournisseur(id: number): void {
        this.fournisseurService.getFournisseurById(id).subscribe((fournisseur: Fournisseur) => {
          this.displayHotel(fournisseur)
        }
        );
      }
    
      public displayHotel(fournisseur: Fournisseur): void {
        this.fournisseur = fournisseur;
         if(this.fournisseur.id===0){
          this.pageTitle="ajouter un fournisseur";
         }else{
          this.pageTitle=`modifier le fournisseur ${this.fournisseur.fournisseurName}`;
        }
        this.fournisseurForm.patchValue({
          fournisseurName: this.fournisseur.fournisseurName,
          
        });
      }
    
  
    
      public saveFournisseur(): void {
    
        this.isFormSubmitted = true;
        this.fournisseurForm.updateValueAndValidity({
          onlySelf: true,
          emitEvent: true
        });
    
        if (this.fournisseurForm.valid) {
          if (this.fournisseurForm.dirty) {
            const fournisseur: Fournisseur = {
              ...this.fournisseur,
              ...this.fournisseurForm.value
            };
    
            // add or edit logic
            if (fournisseur.id === 0) {
              this.fournisseurService.saveFournisseur(fournisseur).subscribe({
                next: () => this.saveCompleted(),
                error: (err) => this.errorMessage = err
              });
            } else {
              this.fournisseurService.updateFournisseur(fournisseur).subscribe({
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
    
      public deleteFournisseur(): void {
    
        if (this.fournisseur.id === 0) {
          this.saveCompleted();
        } else {
          if (confirm(`Voulez-vous réelement supprimer ${this.fournisseur.fournisseurName} ?`)) {
            this.fournisseurService.deleteFournisseur(this.fournisseur.id).subscribe({
              next: () => this.saveCompleted(),
              error: (err) => this.errorMessage = err
            });
          }
        }
    
      }
    
    
      public saveCompleted(): void {
        this.fournisseurForm.reset();
        this.router.navigate(['/listfournisseur']);
      }
    
      public validateForm(): void {
        const formControlBlurs: Observable<unknown>[] = this.inputElements
          .map((formControlElemRef: ElementRef) => fromEvent(formControlElemRef.nativeElement, 'blur'));
    
        merge(this.fournisseurForm.valueChanges, ...formControlBlurs).pipe(
          // debounceTime(300)
          debounce(() => this.isFormSubmitted ? EMPTY : timer(300))
        ).subscribe(() => {
          this.formErrors = this.globalGenericValidator.createErrorMessages(this.fournisseurForm,this.isFormSubmitted);
           
          console.log('value on subscribe errors: ', this.formErrors);
        });
      }
    
    }

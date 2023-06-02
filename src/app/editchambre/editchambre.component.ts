import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, fromEvent, merge, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { Chambre } from '../listchambre/model/Chambre';
import { ChambreService } from '../chambre.service';
import { NumberValidators } from '../Validators/number.validator';
import { GenericGlobalValidator } from '../Validators/generic-global.validator';
@Component({
  selector: 'app-editchambre',
  templateUrl: './editchambre.component.html',
  styleUrls: ['./editchambre.component.css']
})
export class EditchambreComponent implements OnInit, AfterViewInit {
  
    @ViewChildren(FormControlName, { read: ElementRef }) inputElements!: ElementRef[];
  
    public hotelForm!: FormGroup;
    public errorMessage!: string;
    public formErrors: { [key: string]: string } = {};
    public validationMessages: { [key: string]: { [key: string]: string } } = {
      hotelName: {
        required: 'Le nom de l\'hôtel est obligatoire.',
        minlength: 'Le nom de l\'hôtel doit comporter au moins trois caractères.',
        maxlength: 'Le nom de l\'hôtel ne peut pas dépasser 50 caractères.'
      },
      price: {
        required: 'le prix de l\'hôtel est obligatoire.',
        pattern: 'Veuillez entrer un nombre svp.'
      },
      rating: {
        range: 'Donnez une note à l\'hôtel entre 1 (le plus bas) et 5 (le plus élevé).'
      }
    };
    public hotel!: Chambre;
    public pageTitle!: string;
  
    private globalGenericValidator!: GenericGlobalValidator;
    private isFormSubmitted!: boolean;
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private hotelService: ChambreService
  
    ) { }
  
    ngOnInit(): void {
      this.globalGenericValidator = new GenericGlobalValidator(this.validationMessages);
  
      // first attempt
  
      this.hotelForm = this.formBuilder.group({
        hotelName: [ '',[ Validators.required,Validators.minLength(3), Validators.maxLength(50) ]],
        price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        rating: ['', NumberValidators.range(1, 5)],
        tags: this.formBuilder.array([]),
        description: ['',Validators.required]
      });
  
      this.route.paramMap.subscribe(params => {
        const id = +(params.get('id') as string);
        this.getSelectedHotel(id) ;
      }) 
    }
  
    ngAfterViewInit() {
      //todo without RxJS => changeDetection Error
      /*this.hotelForm.valueChanges().subscribe(()=>{
        this.formErrors=this.globalGenericValidator.createErrorMessages(this.hotelForm);
        console.log('error', this.formErrors);
      });*/
      this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm);
  
      this.validateForm();
    }
  
    public hideErrorMessage(): void {
      this.errorMessage= '';
    }
  
    public getSelectedHotel(id: number): void {
      this.hotelService.getHotelById(id).subscribe((hotel: Chambre) => {
        this.displayHotel(hotel)
      }
      );
    }
  
    public displayHotel(hotel: Chambre): void {
      this.hotel = hotel;
       if(this.hotel.id===0){
        this.pageTitle="créer une chambre";
       }else{
        this.pageTitle=`modifier la chambre ${this.hotel.hotelName}`;
      }
      this.hotelForm.patchValue({
        hotelName: this.hotel.hotelName,
        price: this.hotel.price,
        rating: this.hotel.rating,
        description: this.hotel.description,
      });
      this.hotelForm.setControl('tags', this.formBuilder.array(this.hotel.tags || []));
    }
  
    public get tags(): FormArray {
      return this.hotelForm.get('tags') as FormArray;
    }
  
    public addTag(): void {
      this.tags.push(new FormControl());
    }
  
    public deleteTag(index: number): void {
      this.tags.removeAt(index);
      this.tags.markAsDirty();
    }
  
    public saveHotel(): void {
  
      this.isFormSubmitted = true;
      this.hotelForm.updateValueAndValidity({
        onlySelf: true,
        emitEvent: true
      });
  
      if (this.hotelForm.valid) {
        if (this.hotelForm.dirty) {
          const hotel: Chambre = {
            ...this.hotel,
            ...this.hotelForm.value
          };
  
          // add or edit logic
          if (hotel.id === 0) {
            this.hotelService.createHotel(hotel).subscribe({
              next: () => this.saveCompleted(),
              error: (err) => this.errorMessage = err
            });
          } else {
            this.hotelService.updateHotel(hotel).subscribe({
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
  
    public deleteHotel(): void {
  
      if (this.hotel.id === 0) {
        this.saveCompleted();
      } else {
        if (confirm(`Voulez-vous réelement supprimer ${this.hotel.hotelName} ?`)) {
          this.hotelService.deleteHotel(this.hotel.id).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        }
      }
  
    }
  
  
    public saveCompleted(): void {
      this.hotelForm.reset();
      this.router.navigate(['/listchambre']);
    }
  
    public validateForm(): void {
      const formControlBlurs: Observable<unknown>[] = this.inputElements
        .map((formControlElemRef: ElementRef) => fromEvent(formControlElemRef.nativeElement, 'blur'));
  
      merge(this.hotelForm.valueChanges, ...formControlBlurs).pipe(
        // debounceTime(300)
        debounce(() => this.isFormSubmitted ? EMPTY : timer(300))
      ).subscribe(() => {
        this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm,this.isFormSubmitted);
         
        console.log('value on subscribe errors: ', this.formErrors);
      });
    }
  
  }

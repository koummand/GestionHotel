import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  singInFormGroup!:FormGroup ;
  errorMessage!:string;

  constructor(public formBuilder:FormBuilder, public userService:UserService, public router:Router){ }

ngOnInit(){
  this.initForm();
}

initForm(){
  this.singInFormGroup= this.formBuilder.group({
  login:['',Validators.required],
  password:['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
                                                       
  });
 
}
onSubmit(){

    const login= this.singInFormGroup.get('login')?.value ;
    const password= this.singInFormGroup.get('password')?.value;
   let result= this.userService.singIn(login, password);
   
   if(result==="connexion reuissit"){
    alert(result) ;
    this.saveCompleted();
    this.router.navigate(['/listchambre'])
   }else{
     alert(result+" l'email ou le mot de passe ne correspond pas");
    this.singInFormGroup.reset();
   }
}

public senregistrez(): void {
  this.router.navigate(['/signup']);
}
public saveCompleted(): void {
  this.singInFormGroup.reset();
  ;
}
}

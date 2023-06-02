import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {
  singInFormGroup!: FormGroup;
  errorMessge!: string;

  constructor(public formBuilder: FormBuilder, public userService: UserService, public router: Router) {
  };

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.singInFormGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]

    })
    
  }
  onSubmit() {
    const login = this.singInFormGroup.get('login')?.value;
    const password = this.singInFormGroup.get('password')?.value;
    this.userService.singIn(login, password)
     
  }

}

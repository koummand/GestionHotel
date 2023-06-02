import { Component, OnInit } from '@angular/core';
import { Client } from './model/Client';
import { UserService } from '../user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
   clients : Client[]=[];

  public title ="Liste des clients";
  private _clientFilter='mot';
  public filtersClients :Client[]=[];
  public errorMessage!:string;
  
   public get clientFilter():string{
    return this._clientFilter;
   }

  public set clientFilter(filter:string){
    this._clientFilter=filter;
    this.filtersClients= this.clientFilter? this.filterclients(this.clientFilter) : this.clients;
  }
  private filterclients(criteria:string):Client[]{
      criteria= criteria.toLocaleLowerCase();
      const response= this.clients.filter(
        (client:Client)=>client.nom.toLocaleLowerCase().indexOf(criteria) != -1
      );
      return response;
  }
    constructor(private userService: UserService){}
  
    ngOnInit() {
     this.userService.getUsers().subscribe({
      next:clients =>{
        this.clients=clients,
          this.filtersClients=this.clients;  
      },
      error:err=>this.errorMessage=err
     });
      this.clientFilter='';
    }
  
  }



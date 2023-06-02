import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../listuser/model/Client'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-singleclient',
  templateUrl: './singleclient.component.html',
  styleUrls: ['./singleclient.component.css']
})
export class SingleclientComponent implements OnInit {
  
  
    
      public client: Client = <Client>{ };
    
      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
      ) { }
    
      ngOnInit(): void {
        const id = +(this.route.snapshot.paramMap.get('id') as string);
    
        this.userService.getUsers().subscribe((clients: Client[]) => {
  
            this.client = clients.find((client: Client) => client.id === id ) as Client;
          
        })
      }
    
      public backToList(): void {
        this.router.navigate(['/listuser']);
      }
   
    }

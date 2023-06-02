import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { SinglechambreComponent } from './singlechambre/singlechambre.component';
import { ListchambreComponent } from './listchambre/listchambre.component';
import { NewchambreComponent } from './newchambre/newchambre.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
import { ListuserComponent } from './listuser/listuser.component';
import { NewemployerComponent } from './newemployer/newemployer.component';
import { SingleemployerComponent } from './singleemployer/singleemployer.component';
import { ListemployerComponent } from './listemployer/listemployer.component';

@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    SingupComponent,
    SinglechambreComponent,
    ListchambreComponent,
    NewchambreComponent,
    SingleuserComponent,
    ListuserComponent,
    NewemployerComponent,
    SingleemployerComponent,
    ListemployerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

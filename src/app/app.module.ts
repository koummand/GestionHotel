import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from'angular-in-memory-web-api';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { SinglechambreComponent } from './singlechambre/singlechambre.component';
import { ListchambreComponent } from './listchambre/listchambre.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
import { PipeRecomma } from'./pipe/replaComma';

import { ListuserComponent } from './listuser/listuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RemoveCommaPipe } from './remove-comma.pipe';
import { EditchambreComponent } from './editchambre/editchambre.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationService } from './reservation.service';
import { ChambreService } from './chambre.service';
import { EmployerService } from './employer.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
import { AuthGardService } from './auth-gard.service';
import { HotelEditGuard } from './hotel-edit.guard';
import { ChambreData } from './api/chambre.data';
import { RouterModule, Routes } from '@angular/router';
import { SingleclientComponent } from './singleclient/singleclient.component';
import { ClientData } from './api/client.data';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { SingleProduitComponent } from './single-produit/single-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { EditFournisseurComponent } from './edit-fournisseur/edit-fournisseur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FounrnisseurData } from './api/fournisseur.data';
import { ProduitData } from './api/produit.data';

const appRoutes: Routes=[
  {path:'listchambre', component: ListchambreComponent},
  {path:'listuser', component: ListuserComponent},
  {path:'listfournisseur', component: ListFournisseurComponent},
  {path:'listproduit', component: ListProduitComponent},

  {path:'client/:id/edit', component: SingupComponent},
  {path:'client/:id', component: SingleclientComponent},
  {path:'fournisseur/:id/edit', component: EditFournisseurComponent},
  {path:'produit/:id/edit', component: EditProduitComponent},
  {path:'produit/:id', component: SingleProduitComponent},

  {path:'singleuser', component: SingleuserComponent},
  {path:'signIn', component: SinginComponent },
  {path:'signup', component: SingupComponent },
  { path: 'hotels/:id/edit',component: EditchambreComponent,canDeactivate:[HotelEditGuard]},
  { path: 'hotels/:id', component: SinglechambreComponent, canActivate:[AuthGardService]},
  {path:'reservation', component: ReservationComponent},
  {path:'home', component:HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]
registerLocaleData(localeFr,'fr');
@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    SingupComponent,
    SinglechambreComponent,
    ListchambreComponent,
    SingleuserComponent,
    ListuserComponent,
    HeaderComponent,
    StarRatingComponent,
    RemoveCommaPipe,
    EditchambreComponent,
    HomeComponent,
    ReservationComponent,
    StarRatingComponent,
    SingleclientComponent,
    PipeRecomma,
    ListProduitComponent,
    SingleProduitComponent,
    EditProduitComponent,
    ListFournisseurComponent,
    EditFournisseurComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    InMemoryWebApiModule.forFeature(FounrnisseurData),
    InMemoryWebApiModule.forFeature(ProduitData),
    InMemoryWebApiModule.forFeature(ClientData),
    InMemoryWebApiModule.forFeature(ChambreData),



  ],
  providers: [UserService,ReservationService,ChambreService,EmployerService],
  bootstrap: [AppComponent]
  
})
export class AppModule {

}

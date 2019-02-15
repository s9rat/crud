import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddClientComponent } from './add-client/add-client.component';
import { ClientsComponent } from './clients/clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';

// Routes array define component along with the path name for url

const routes: Routes = [
  { path: '', redirectTo: '/add-client', pathMatch: 'full' },
  { path: 'add-client', component: AddClientComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'edit-client/:id', component: EditClientComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client.service';  // CRUD API service class
import { Client } from './../shared/client';   // Client interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Client: Client[];                 // Save clients data in Client's array.
  hideWhenNoStudent: boolean = false; // Hide clients data table when no client.
  noData: boolean = false;            // Showing No Client Message, when no client in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)


  constructor(
    public crudApi: ClientService, // Inject client CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.dataState(); // Initialize client's list, when component is ready
    let s = this.crudApi.GetClientsList();
    console.log(s);
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Client = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Client.push(a as Client);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of clients data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in client data list in real-time.
  dataState() {
    this.crudApi.GetClientsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  // Method to delete client object
  SupprimerClient(client) {
    if (window.confirm('Are sure you want to delete this client ?')) { // Asking from user before Deleting client data.
      this.crudApi.SupprimerClient(client.$key) // Using Delete client API to delete client.
      this.toastr.success(client.firstName + ' successfully deleted!'); // Alert message will show up when client successfully deleted.
    }
  }

}
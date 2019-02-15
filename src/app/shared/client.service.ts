import { Injectable } from '@angular/core';
import { Client } from '../shared/client';  // Client data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsRef: AngularFireList<any>;    // Reference to Client data list, its an Observable
  clientRef: AngularFireObject<any>;   // Reference to Client object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Client
  AjouterClient(client: Client) {
    this.clientsRef.push({
      prenom: client.prenom,
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
      ville: client.ville
    })
  }

  // Fetch Single Client Object
  GetClient(id: string) {
    this.clientRef = this.db.object('client/' + id);
    return this.clientRef;
  }

  // Fetch Listes Clients
  GetClientsList() {
    this.clientsRef = this.db.list('client');
    return this.clientsRef;
  }

  // Update Client Object
  ModifierClient(client: Client) {
    this.clientRef.update({
      prenom: client.prenom,
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
      ville: client.ville
    })
  }

  // Delete Client Object
  SupprimerClient(id: string) {
    this.clientRef = this.db.object('clients/' + id);
    this.clientRef.remove();
  }

}

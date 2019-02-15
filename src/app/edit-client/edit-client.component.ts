import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../shared/client.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})

export class EditClientComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to client's edit form

  constructor(
    private crudApi: ClientService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.ModifierClientData();   // Call ModifierClientData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetClient(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  // Accessing form control using getters
  get nom() {
    return this.editForm.get('nom');
  }

  get prenom() {
    return this.editForm.get('prenom');
  }

  get email() {
    return this.editForm.get('email');
  }

  get telephone() {
    return this.editForm.get('telephone');
  }

  get ville() {
    return this.editForm.get('ville');
  }

  get adresse() {
    return this.editForm.get('adresse');
  }

  // Contains Reactive Form logic
  ModifierClientData() {
    this.editForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      adresse: [''],
      ville: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.ModifierClient(this.editForm.value);       // Update client data using CRUD API
    this.toastr.success(this.editForm.controls['firstName'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['clients']);               // Navigate to client's list page when client data is updated
  }

}
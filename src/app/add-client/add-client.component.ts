import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent implements OnInit {
  public clientForm: FormGroup;  // Define FormGroup to client's form

  constructor(
    public crudApi: ClientService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.crudApi.GetClientsList();  // Call ModifierClientsList() before main form is being called
    this.studenForm();              // Call client form when component is ready
  }

  // Reactive client form
  studenForm() {
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      adresse: [''],
      ville: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Accessing form control using getters
  get nom() {
    return this.clientForm.get('nom');
  }

  get prenom() {
    return this.clientForm.get('prenom');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get telephone() {
    return this.clientForm.get('telephone');
  }

  get ville() {
    return this.clientForm.get('ville');
  }

  get adresse() {
    return this.clientForm.get('adresse');
  }

  // Reset client form's values
  ResetForm() {
    this.clientForm.reset();
  }

  submitStudentData() {
    this.crudApi.AjouterClient(this.clientForm.value); // Submit client data using CRUD API
    this.toastr.success(this.clientForm.controls['nom'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
  };

}

import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private fb = new FormBuilder();

  companyForm = this.fb.group({
    companyName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]],

    companyCode: ['', [
      Validators.pattern(/^[0-9]*$/)
    ]],

    vatCode: ['', [
      Validators.pattern(/^(LT)?[0-9]+$/)
    ]],

    address: [''],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    phone: ['', [
      Validators.pattern(/^\+?[0-9]{9,11}$/),
      Validators.minLength(10),
      Validators.maxLength(12)
    ]],

    contacts: this.fb.array([])
  });

  get contacts(): FormArray {
    return this.companyForm.get('contacts') as FormArray;
  }

  addContact() {
    const contact = this.fb.group({
      firstName: [''],
      lastName: [''],
      position: [''],
      phone: ['']
    });

    this.contacts.push(contact);
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  isInvalid(field: string): boolean {
    const control = this.companyForm.get(field);
    return !!(control && control.invalid &&
      (control.touched || control.dirty));
  }

  register() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    console.log('Registered company:');
    console.log(this.companyForm.getRawValue());
  }
}

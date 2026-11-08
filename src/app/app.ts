
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string | null;

  if (typeof value === 'string' && value.trim().length === 0) {
    return { blank: true };
  }

  return null;
}

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
      Validators.maxLength(30),
      notBlank
    ]],

    companyCode: ['', [
      Validators.pattern(/^[0-9]+$/)
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
      Validators.pattern(/^\+370[0-9]{8}$/)
    ]],

    contacts: this.fb.array([])
  });

  get contacts(): FormArray {
    return this.companyForm.get('contacts') as FormArray;
  }

  addContact(): void {
    const contact = this.fb.group({
      firstName: [''],
      lastName: [''],
      position: [''],
      phone: ['', [
        Validators.pattern(/^\+370[0-9]{8}$/)
      ]]
    });

    this.contacts.push(contact);
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  isInvalid(field: string): boolean {
    const control = this.companyForm.get(field);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }

  isContactInvalid(index: number, field: string): boolean {
    const control = this.contacts.at(index).get(field);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }

  register(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    const company = this.companyForm.getRawValue();

    console.log('Company registered successfully!');
    console.log('Registered company:', company);
  }
}

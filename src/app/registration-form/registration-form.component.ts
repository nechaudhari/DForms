import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {

  dynamicFormarray:any;
  registrationForm!: FormGroup;

  constructor(private httpClient:HttpClient, private fb:FormBuilder){}

  ngOnInit(){
    this.registrationForm = this.fb.group({

    });

    this.httpClient.get('/assets/DynamicFormControl.json').subscribe(data =>{
      this.dynamicFormarray = data;
      
      this.createFormcontrol();
    });
  }

  createFormcontrol(){
    this.dynamicFormarray.forEach((element: { Required: boolean; ID: any; }) =>{
      if (element.Required === true){
        this.registrationForm.addControl(element.ID, new FormControl('', Validators.required));
      }
      else{
        this.registrationForm.addControl(element.ID, new FormControl(' '));
      }
      
    });
    console.log(this.registrationForm);
  }

}

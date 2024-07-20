import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES_META_DATA } from './shared/const/countryData';
import { CustomRegex } from './shared/const/validatorsPattern';
import { NoSpaceValidator } from './shared/validators/noSpaceValidator';
import { AsyncEmailValidator } from './shared/validators/asyncEmailValidator';
import { EmpIdValidator } from './shared/validators/empIdValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'reactiveFormMTest';
 public signUpForm !: FormGroup;

  genderArr: Array<string>=['female','male','others'];
  cuntryArr = COUNTRIES_META_DATA;

  
  ngOnInit(): void {
    this.createSignUpForm();
    this.currADdperAddEnableDisable();
    this.patchPermanentAdd();
    this.confirmPassHandler();

    this.signUpForm.get('confirmPassword')
    ?.valueChanges
    .subscribe(res =>{
      if(this.f['password'].value !== res){
      this.signUpForm.get('confirmPassword')?.setErrors({invalid: true});
     }else{
     this.signUpForm.get('confirmPassword')?.setErrors(null);
    }
   })
    
    
 }
  
  
  createSignUpForm(){
     this.signUpForm = new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(12),
                Validators.pattern(CustomRegex.username),NoSpaceValidator.noSpace]),
      email  :new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email),Validators.email,
             AsyncEmailValidator.isEmailAvailable]) , 
      empId: new FormControl(null,[Validators.required,EmpIdValidator.isEmpIdValid]),
      gender: new FormControl(null,[Validators.required]) ,
      skills: new FormArray([new FormControl(null,[Validators.required])]),
      currentAddress: new FormGroup({
        country: new FormControl(null,[Validators.required]),
        state:new FormControl(null,[Validators.required]),
        city: new FormControl(null,[Validators.required]),
        zipcode: new FormControl(null,[Validators.minLength(6),Validators.maxLength(6),Validators.required])
      }),
      permanentAddress: new FormGroup({
        country: new FormControl(null,[Validators.required]),
        state:new FormControl(null,[Validators.required]),
        city: new FormControl(null,[Validators.required]),
        zipcode: new FormControl(null,[Validators.minLength(6),Validators.maxLength(6),Validators.required])
      }) ,
      password: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
      confirmPassword: new FormControl({value: null,disabled: true},[Validators.required]),
      isAddSame: new FormControl({value: false,disabled: false})
     })
  }

  confirmPassHandler(){
    this.signUpForm.get('password')
    ?.valueChanges
    .subscribe(res =>{
      if(this.signUpForm.get('password')?.valid){
        this.signUpForm.get('confirmPassword')?.enable();
      }else{
        this.signUpForm.get('confirmPassword')?.disable();

      }
    })
  }

currADdperAddEnableDisable(){
  this.signUpForm.get('confirmAddress')?.valueChanges.subscribe(res =>{
    if(this.signUpForm.get('currentAddress')?.valid){
      this.f['isAddSame'].enable();
    }else{
      this.f['isAddSame'].disable();
      this.f['isAddSame'].patchValue(false);
   
    }
  })
}

patchPermanentAdd(){
  this.f['isAddSame'].valueChanges.subscribe((res)=>{
    if(res){
      this.f['permanentAddress']?.patchValue(this.f['currentAddress'].value);
      this.f['permanentAddress'].disable();
    }else{
      this.f['permanentAddress'].reset();
      this.f['permanentAddress'].enable();

    }
  })
}

  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
    console.log(this.signUpForm.getRawValue());
    this.signUpForm.reset();
    }
  }

  onSkillAdd(){
    if(this.skillsFormArr.length < 5){
      let getSkillControl = new FormControl(null,[Validators.required]);
      this.skillsFormArr.push(getSkillControl);
    }
  }

  onSkillRemove(i: number){
        let isGetConfirm= confirm('Are you sure the remove this skill data');
        if(isGetConfirm){
          this.skillsFormArr.removeAt(i);
        }
  }

  get f(){
    return this.signUpForm.controls
  }

  get currAddInner(){
    let formGrp = this.signUpForm.get('currentAddress') as FormGroup
    return formGrp.controls
  } 

  get perAddInner(){
    let formGrp = this.signUpForm.get('permanentAddress') as FormGroup
    return formGrp.controls
  } 

  get getUserName(){
    return this.signUpForm.get('username') as FormControl;
  }

  get skillsFormArr(){
    return this.signUpForm.get('skills') as FormArray;
  }
}

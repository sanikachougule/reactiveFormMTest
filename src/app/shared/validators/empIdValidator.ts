import { AbstractControl, ValidationErrors } from "@angular/forms";



export class EmpIdValidator{
    static isEmpIdValid(control: AbstractControl): ValidationErrors | null{
        let val= control.value as string
        if(val){
            let regExp = /^[A-Z]\d{3}$/;
            let isValid = regExp.test(val);
            if(isValid){
                return null
            }else{
                return{
                    invalidEmpId: `EmpId should starts with 1 alphabet and ends with 3 numbers`
                }
            }
        
        }else{
            return null
        }
       
    }
}
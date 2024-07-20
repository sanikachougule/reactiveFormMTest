import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";





export class AsyncEmailValidator{
    static isEmailAvailable(control: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
        let val = control.value as string;
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(val === 'jhon@gmail.com'){
                    resolve({
                        emailExistErr: 'This email id is already in use'
                    })
                }else{
                    resolve(null)
                }
            },2000)
        })
    }
}
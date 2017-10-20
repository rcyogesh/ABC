import {Component} from '@angular/core'

@Component({
 selector:'bp',
 templateUrl:'./bp.component.html'
})
export class BPComponent
{
    Systolic:number;
    Diastolic:number;
    HB:number;
    Weight:number;

    OnSubmit() {
        
    }
}
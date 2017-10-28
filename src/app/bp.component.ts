import {Component} from '@angular/core'
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Component({
 selector:'bp',
 templateUrl:'./bp.component.html'
})
export class BPComponent
{
    constructor(private http:Http) {
        this.BP = new BP();
    }

    BP:BP;

    OnSubmit() {
        let message = JSON.stringify(this.BP); 
        console.log(message);

        try{
            this.http.post("/", message)
                .toPromise();
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

export class BP {
    Systolic:number;
    Diastolic:number;
    HB:number;
    Weight:number;
}
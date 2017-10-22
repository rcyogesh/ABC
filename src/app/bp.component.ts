import {Component} from '@angular/core'
import { Http } from '@angular/http';

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
        let url = "http://localhost:1337";
        
        try{
            this.http.post(url, message)
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
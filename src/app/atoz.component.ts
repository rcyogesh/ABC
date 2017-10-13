import {Component} from '@angular/core'

@Component({
 selector:'atoz',
 templateUrl:'./atoz.component.html',
 styleUrls: ['./atoz.component.css'],
})

export class AtoZComponent {
    constructor() {
        this.Letters = [];
        var i = 65;
         for(i=65;i<91;i++) {
             this.Letters[i-65]=String.fromCharCode(i);
         }
    }

    OnSelect(l:string) {
        this.SelectedLetter = l;
    }

    Letters: Array<string>;
    SelectedLetter : string;
    //  = [
    //     "A",
    //     "B"
    // ];
}
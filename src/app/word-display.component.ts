import {Component, Input, OnInit} from '@angular/core'
import { WordsProviderService } from './words-provider.service';

@Component({
 selector:'word-display',
 templateUrl:'./word-display.component.html',
 //styleUrls: ['./word-display.component.css'],
  providers:[WordsProviderService]
})

export class WordDisplayComponent {
    private _letter:string;
    get Letter():string{ return this._letter;}
     @Input() set Letter(l:string) {
         this._letter=l;
         this.GetRelevantWords();
     }
     RelevantWords:string[];

     constructor(private wordsService:WordsProviderService) {}

     GetRelevantWords():void {
        this.RelevantWords = this.getAllWords().filter(s=>s.startsWith(this.Letter));
     }

     getAllWords():string[] {
     return this.wordsService.getWords();
    }
}
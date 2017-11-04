import {Component, Input, OnInit} from '@angular/core'
import { WordsProviderService } from './words-provider.service';

@Component({
 selector:'word-display',
 templateUrl:'./word-display.component.html',
 //styleUrls: ['./word-display.component.css'],
 providers: [WordsProviderService]
})

export class WordDisplayComponent {
    private _letter:string;
    get Letter():string{ return this._letter;}
     @Input() set Letter(l:string) {
         this._letter=l;
         this.GetRelevantWords();
     }

     @Input() ShowAllWords:boolean = true;
     RelevantWords:string[];

     constructor(private wordsService:WordsProviderService) {}

     GetRelevantWords():void {
         if(this.ShowAllWords) {
            this.wordsService.getStartsWithWordsPromise(this.Letter).then(words=>this.RelevantWords = words);
         }
         else
         {
            this.wordsService.getStartsWithWordsPromise(this.Letter).then(word=> {
                let w= [];
                w.push(word);
                this.RelevantWords = w;
            });            
         }
     }
}
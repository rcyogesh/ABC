import { Injectable } from '@angular/core'

@Injectable()
export class WordsProviderService {
    getWords():string[] {
        return [
            "Potato",
            "Tomato",
            "Egg",
            "King",
            "Queen"
         ];
    }
}
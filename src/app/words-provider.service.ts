import { Injectable } from '@angular/core'

@Injectable()
export class WordsProviderService {
    getWordsPromise():Promise<string[]> {
        return Promise.resolve( this.GetAllWords());
    }
    
    public getStartsWithWordsPromise(firstPart:string):Promise<string[]> {
        return Promise.resolve(
            this.GetAllWords().filter(s=>s.startsWith(firstPart)));
    }

    private GetAllWords(): string[] {
        return [
            "Potato",
            "Tomato",
            "Egg",
            "King",
            "Queen"
        ];
    }
}
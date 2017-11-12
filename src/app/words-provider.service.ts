import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class WordsProviderService {

    constructor(private http:Http){}

    getWordsPromise():Promise<string[]> {
        return Promise.resolve( this.GetAllWords());
    }
    
    public getStartsWithWordsPromise(firstPart:string):Promise<string[]> {
        let url = "/?letter=" + firstPart;
        if(!environment.production) {
            url = "http://localhost:1337" + url;
        }
        console.log(url);
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as string[])
             .catch(this.handleError);
    }

    public getSingleStartsWithWordPromise(firstPart:string): Promise<string[]> {
        let url = "/?OnlyOneWord=true&letter=" + firstPart;
        if(!environment.production) {
            url = "http://localhost:1337" + url;
        }
        console.log(url);
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as string[])
             .catch(this.handleError);
    }
    
    public getImage(SearchTerm:string): Promise<string> {
        let url = "/?GetImageFor=" + SearchTerm;
        if(!environment.production) {
            url = "http://localhost:1337" + url;
        }
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as string)
             .catch(this.handleError);
    }


    private handleError(error:any) : Promise<any> {
        return Promise.reject(error.message || error);
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
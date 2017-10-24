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
        // return Promise.resolve(
        //     ["yellow"]);

        let url = "";
        if (environment.production) {
            url = "/service";
        }
        else {
            url = "http://localhost:1337";
        }
        url = url + "/?letter=" + firstPart;
        console.log(url);
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as string[])
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
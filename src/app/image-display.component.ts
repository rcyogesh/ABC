import { Component, Input } from '@angular/core';
import { WordsProviderService } from './words-provider.service';

@Component({
  selector: 'image-display',
  templateUrl: './image-display.component.html',
  providers: [WordsProviderService]
})
export class ImageDisplayComponent {
    constructor(private wordsService:WordsProviderService) {
        this.ImageURL="https://static01.nyt.com/images/2017/11/12/opinion/12jacobsdouglas/12jacobsdouglas-mediumFlexible177-v5.jpg";
    }

    ImageURL:string="https://static01.nyt.com/images/2017/11/12/opinion/12jacobsdouglas/12jacobsdouglas-mediumFlexible177-v5.jpg";

    private _searchTerm:string;
    get SearchTerm():string{ return this._searchTerm;}
     @Input() set SearchTerm(l:string) {
         this._searchTerm=l;
         this.GetImageURL();
     }
     
    GetImageURL(): any {
        this.wordsService.getImage(this.SearchTerm).then(url=>this.ImageURL = url);
    }
}

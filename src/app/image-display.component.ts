import { Component, Input } from '@angular/core';
import { WordsProviderService } from './words-provider.service';

@Component({
  selector: 'image-display',
  templateUrl: './image-display.component.html',
  providers: [WordsProviderService]
})
export class ImageDisplayComponent {
    constructor(private wordsService:WordsProviderService) { }

    ImageURL:string;

    private _searchTerm:string;
    get SearchTerm():string{ return this._searchTerm;}
     @Input() set SearchTerm(l:string) {
         this._searchTerm=l;
         this.ImageURL=undefined;
         this.GetImageURL();
     }
     
    GetImageURL(): any {
        this.wordsService.getImage(this.SearchTerm).then(url=>this.ImageURL = url);
    }
}

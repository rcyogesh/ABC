import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AtoZComponent } from './atoz.component'
import { WordDisplayComponent } from './word-display.component'
import { BPComponent } from './bp.component'

@NgModule({
  declarations: [
    AppComponent,
    AtoZComponent,
    WordDisplayComponent,
    BPComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'BP',
        component: BPComponent
      },{
        path: '',
        component: AtoZComponent
      }
    ]
      )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

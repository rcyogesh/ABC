import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AtoZComponent } from './atoz.component'
import { WordDisplayComponent } from './word-display.component'

@NgModule({
  declarations: [
    AppComponent,
    AtoZComponent,
    WordDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

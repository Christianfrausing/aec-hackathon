import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// APP COMPONENTS
// Put your components here
import{ DXFJSONParserComponent } from './dxf-json-parser/dxf-json-parser.component';

@NgModule({
  declarations: [
    AppComponent,
    DXFJSONParserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

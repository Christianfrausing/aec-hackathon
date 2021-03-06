import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// 3RD PARTY MODULES
import { NgxFileDropModule } from 'ngx-file-drop';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';


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
    FormsModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

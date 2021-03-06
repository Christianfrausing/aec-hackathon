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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';


// APP COMPONENTS
// Put your components here
import { AssemblerMapperComponent } from './assembler-mapper/assembler-mapper.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';
import { StoreySelectorComponent } from './storey-selector/storey-selector.component';
import { SpaceLoaderComponent } from './space-loader/space-loader.component';
import{ DXFJSONParserComponent } from './space-loader/dxf-json-parser/dxf-json-parser.component';

@NgModule({
  declarations: [
    AppComponent,
    DXFJSONParserComponent,
    AssemblerMapperComponent,
    BuildingSelectorComponent,
    StoreySelectorComponent,
    SpaceLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

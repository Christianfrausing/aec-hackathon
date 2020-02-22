import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// 3RD PARTY MODULES
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxFileDropModule } from 'ngx-file-drop';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';


// APP SERVICES
import { GlobalsService } from './services/globals.service';

// APP COMPONENTS
// Put your components here
import { WebStorageModule } from 'ngx-store';
import { DXFJSONParserComponent } from './space-loader/dxf-json-parser/dxf-json-parser.component';
import { PathSelecterComponent } from './path-selecter/path-selecter.component';

import { AssemblerMapperComponent } from './assembler-mapper/assembler-mapper.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';
import { StoreySelectorComponent } from './storey-selector/storey-selector.component';
import { SpaceLoaderComponent } from './space-loader/space-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    DXFJSONParserComponent,
    PathSelecterComponent,
    AssemblerMapperComponent,
    BuildingSelectorComponent,
    StoreySelectorComponent,
    SpaceLoaderComponent
  ],
  imports: [
    WebStorageModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxFileDropModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

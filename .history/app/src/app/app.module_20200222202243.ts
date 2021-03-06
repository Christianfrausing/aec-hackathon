import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// 3RD PARTY MODULES
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxFileDropModule } from 'ngx-file-drop';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';


// APP SERVICES
import { GlobalsService } from './services/globals.service';
import { FusekiService } from './services/fuseki.service';

// APP COMPONENTS
// Put your components here
import { DXFJSONParserComponent } from './dxf-json-parser/dxf-json-parser.component';
import { PathSelecterComponent } from './path-selecter/path-selecter.component';

import { AssemblerMapperComponent } from './assembler-mapper/assembler-mapper.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';
import { StoreySelectorComponent } from './storey-selector/storey-selector.component';
import { SettingsComponent } from './settings/settings.component';
import { StoreyHeightsComponent } from './storey-heights/storey-heights.component';
import { WallSelectorComponent } from './wall-selector/wall-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    DXFJSONParserComponent,
    PathSelecterComponent,  
    AssemblerMapperComponent,
    BuildingSelectorComponent,
    StoreySelectorComponent,
    SettingsComponent,
    StoreyHeightsComponent,
    WallSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxFileDropModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [GlobalsService, FusekiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

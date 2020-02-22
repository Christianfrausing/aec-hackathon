import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';
import * as urljoin from 'url-join';
import { uuid } from 'uuidv4';

@Component({
  selector: 'app-storey-selector',
  templateUrl: './storey-selector.component.html',
  styleUrls: ['./storey-selector.component.css']
})
export class StoreySelectorComponent implements OnChanges {

  public storeys;
  public newStoreyName: string;
  public selectedStorey;
  public addMode: boolean = false;

  @Output() onStoreyChange = new EventEmitter<any>();

  @Input() buildingURI;

  constructor(
    private _fs: FusekiService,
    private _g: GlobalsService
  ) { }

  ngOnChanges(): void {
    if(!this.buildingURI) return;
    this.getStoreys();
  }

  getStoreys(){
    if(!this.buildingURI) return;
    const q = `
      SELECT ?storey ?name
      WHERE {
        <${this.buildingURI}> bot:hasStorey ?storey .
        ?storey a bot:Building ;
          nir:name ?name
      }`;
      this._fs.getQuery(q).subscribe(res => {
        this.storeys = res;
        if(res.length){
          this.selectedStorey = res[0];
          this.onStoreySelectionChange();
        }
      }, err => console.log(err));
  }

  public onStoreySelectionChange(){
    const storeyURI = this.selectedStorey && this.selectedStorey != undefined ? this.selectedStorey.storey.value : null;
    this.onStoreyChange.emit(storeyURI);
  }

  toggleAddMode(){
    this.addMode = !this.addMode;
  }

  addStorey(){

    // Return if no name defined
    if(!this.newStoreyName) return console.log("Please enter a storey name");

    const ns = this._g.getGlobalNamespace();
    const storeyURI = urljoin(ns, uuid());
    console.log(storeyURI);

    const q = `
      INSERT{
        ?storey a bot:Storey ;
          nir:name "${this.newStoreyName}"
      }
      WHERE {
        BIND(<${storeyURI}> AS ?storey)
      }`;
    this._fs.updateQuery(q).subscribe(res => {
      this.getStoreys();
    }, err => console.log(err));
  }

}

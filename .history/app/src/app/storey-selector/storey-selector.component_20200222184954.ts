import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';

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
    this.getStoreys(this.buildingURI);
  }

  getStoreys(buildingURI){
    const q = `
      SELECT ?storey ?name
      WHERE {
        <${buildingURI}> bot:hasStorey ?storey .
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

}

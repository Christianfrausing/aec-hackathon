import { Component, OnChanges, Input } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';

@Component({
  selector: 'app-storey-heights',
  templateUrl: './storey-heights.component.html',
  styleUrls: ['./storey-heights.component.css']
})
export class StoreyHeightsComponent implements OnChanges {

  @Input() buildingURI;

  public storeyHeights;

  constructor(
    private _fs: FusekiService
  ) { }

  ngOnChanges(): void {
    if(!this.buildingURI) return;
    console.log(this.buildingURI);
    this.getStoreyHeights();
  }

  getStoreyHeights(){
    if(!this.buildingURI) return;
    const q = `
      SELECT ?storey ?name ?height
      WHERE {
        <${this.buildingURI}> bot:hasStorey ?storey .
        ?storey nir:name ?name .
        OPTIONAL{ ?storey nir:storeyHeight ?height }
      }`;
      this._fs.getQuery(q).subscribe(res => {
        console.log(res);
      }, err => console.log(err));
  }

}

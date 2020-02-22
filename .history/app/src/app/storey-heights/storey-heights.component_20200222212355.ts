import { Component, OnChanges, Input } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';

export class StoreyHeight{
  name: string;
  storey: string;
  height: number;

  constructor(name, storey, height){
    this.name = name.value;
    this.storey = storey.value;
    this.height = height && height.value && height != undefined ? height.value : null;
  }


}

@Component({
  selector: 'app-storey-heights',
  templateUrl: './storey-heights.component.html',
  styleUrls: ['./storey-heights.component.css']
})
export class StoreyHeightsComponent implements OnChanges {

  @Input() buildingURI;

  public storeyHeights: StoreyHeight[];
  public initialHeights;

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
        this.storeyHeights = res.map(item => new StoreyHeight(item.name, item.storey, item.height));
        this.updateInitialHeights();
      }, err => console.log(err));
  }

  updateInitialHeights(){
    this.initialHeights = [...this.storeyHeights];
  }

  saveHeight(storeyURI, height){
    console.log(storeyURI)
    console.log(height)
  }

}

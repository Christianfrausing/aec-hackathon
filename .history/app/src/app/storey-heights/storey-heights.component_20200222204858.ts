import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-storey-heights',
  templateUrl: './storey-heights.component.html',
  styleUrls: ['./storey-heights.component.css']
})
export class StoreyHeightsComponent implements OnChanges {

  @Input() buildingURI;

  constructor() { }

  ngOnChanges(): void {
    if(!this.buildingURI) return;
    this.getStoreyHeights()
  }

  getStoreyHeights(){
    if(!this.buildingURI) return;
    const q = `
      SELECT ?storey ?name
      WHERE {
        <${this.buildingURI}> bot:hasStorey ?storey .
        ?storey nir:name ?name
      }`;
  }

}

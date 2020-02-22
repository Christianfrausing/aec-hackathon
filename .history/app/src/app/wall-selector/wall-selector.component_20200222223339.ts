import { Component, OnInit } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';

@Component({
  selector: 'app-wall-selector',
  templateUrl: './wall-selector.component.html',
  styleUrls: ['./wall-selector.component.css']
})
export class WallSelectorComponent implements OnInit {

  public wallTypes;

  constructor(
    private _fs: FusekiService
  ) { }

  ngOnInit(): void {
    this.getWallTypes();
  }

  getWallTypes(){
    const q = `
      SELECT ?class ?name
      WHERE{
        ?class rdfs:subClassOf nir:Wall ;
          rdfs:label ?name .
      }`;
    this._fs.getQuery(q).subscribe(res => {
      console.log(res);
      this.wallTypes = res;
    }, err => console.log(err));
  }

}

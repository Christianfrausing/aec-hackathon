import { Component, OnInit } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';

@Component({
  selector: 'app-building-selector',
  templateUrl: './building-selector.component.html',
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {

  public buildings;

  constructor(
    private _fs: FusekiService
  ) { }

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings(){
    const q = `
      SELECT ?building 
      WHERE {
        ?building a bot:Building
      }`;
      this._fs.getQuery(q).subscribe(res => {
        this.buildings = res;
        console.log(this.buildings)
      }, err => console.log(err));
  }

}

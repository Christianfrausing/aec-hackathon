import { Component, OnInit } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';
const { uuid } = require('uuidv4');
import * as urljoin from 'url-join';

@Component({
  selector: 'app-building-selector',
  templateUrl: './building-selector.component.html',
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {

  public buildings;
  public newBuildingName: string;

  constructor(
    private _fs: FusekiService,
    private _g: GlobalsService
  ) { }

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings(){
    const q = `
      SELECT ?building ?name
      WHERE {
        ?building a bot:Building ;
          nir:name ?name
      }`;
      this._fs.getQuery(q).subscribe(res => {
        this.buildings = res;
        console.log(this.buildings)
      }, err => console.log(err));
  }

  addBuilding(){

    // Return if no name defined
    if(!this.newBuildingName) return console.log("Please enter a building name");

    const ns = this._g.getGlobalNamespace();
    const buildingURI = urljoin(ns, uuid());

    const q = `
      INSERT
      WHERE {
        <${buildingURI}> a bot:Building ;
          nir:name "${this.newBuildingName}"
      }`;
    this._fs.updateQuery(q).subscribe(res => {
      this.getBuildings();
    }, err => console.log(err));
  }

}

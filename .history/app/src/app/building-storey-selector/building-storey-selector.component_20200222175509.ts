import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';
const { uuid } = require('uuidv4');
import * as urljoin from 'url-join';

@Component({
  selector: 'app-building-storey-selector',
  templateUrl: './building-storey-selector.component.html',
  styleUrls: ['./building-storey-selector.component.css']
})
export class BuildingStoreySelectorComponent implements OnInit {

  public buildings;
  public newBuildingName: string;
  public selectedBuilding;
  public addMode: boolean = false;

  @Output() onBuildingChange = new EventEmitter<any>();

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
        if(res.length){
          this.selectedBuilding = res[0];
          this.onBuildingSelectionChange();
        }
      }, err => console.log(err));
  }

  onBuildingSelectionChange(){
    const buildingURI = this.selectedBuilding && this.selectedBuilding != undefined ? this.selectedBuilding.building.value : null;
    this.onBuildingChange.emit(buildingURI);
  }

  toggleAddMode(){
    this.addMode = !this.addMode;
  }

  addBuilding(){

    // Return if no name defined
    if(!this.newBuildingName) return console.log("Please enter a building name");

    const ns = this._g.getGlobalNamespace();
    const buildingURI = urljoin(ns, uuid());

    const q = `
      INSERT{
        ?building a bot:Building ;
          nir:name "${this.newBuildingName}"
      }
      WHERE {
        BIND(<${buildingURI}> AS ?building)
      }`;
    this._fs.updateQuery(q).subscribe(res => {
      this.getBuildings();
    }, err => console.log(err));
  }

}

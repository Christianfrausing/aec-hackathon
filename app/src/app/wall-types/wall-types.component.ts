import { Component, OnInit } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';
import * as urljoin from 'url-join';
import { uuid } from 'uuidv4';

@Component({
  selector: 'app-wall-types',
  templateUrl: './wall-types.component.html',
  styleUrls: ['./wall-types.component.css']
})
export class WallTypesComponent implements OnInit {

  public superClasses = [
    {name: "Wall", uri: "nir:Wall"},
    {name: "Slab", uri: "nir:Slab"}
  ]
  public selectedSuperClass;

  public classInstances;
  public newClassInstanceName: string;

  constructor(
    private _fs: FusekiService,
    private _g: GlobalsService
  ) { }

  ngOnInit(): void {

  }

  onSuperClassChange(){
    this.getClassInstances();
  }

  getClassInstances(){
    if(!this.selectedSuperClass) return;
    const q = 
      `SELECT ?class ?name
      WHERE{
        ?class rdfs:subClassOf ${this.selectedSuperClass.uri} ;
          rdfs:label ?name .
      }`;
    this._fs.getQuery(q).subscribe(res => {
      this.classInstances = res;
    })
  }

  addClass(){
    if(!this.selectedSuperClass) return;
    if(!this.newClassInstanceName) return;

    const ns = this._g.getGlobalNamespace();
    const classURI = urljoin(ns, uuid());

    const q = 
      `INSERT{
        ?class rdfs:subClassOf ${this.selectedSuperClass.uri} ;
          rdfs:label "${this.newClassInstanceName}" .
      }
      WHERE{
        BIND(<${classURI}> AS ?class)
        MINUS{?class rdfs:label "${this.newClassInstanceName}"}
      }`
    this._fs.updateQuery(q).subscribe(res => {
      console.log(res);
      this.getClassInstances();
    }, err => console.log(err));

    this.newClassInstanceName = null;
  }

}

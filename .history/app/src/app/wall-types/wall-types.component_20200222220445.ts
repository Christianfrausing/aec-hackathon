import { Component, OnInit } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';

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
  public selectedSuperClass: string;

  public classInstances;

  constructor(
    private _fs: FusekiService
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
        ?class rdfs:subClassOf ${this.selectedSuperClass} ;
          rdfs:label ?name .
      }`;
    this._fs.getQuery(q).subscribe(res => {
      this.classInstances = res;
    })
  }

}

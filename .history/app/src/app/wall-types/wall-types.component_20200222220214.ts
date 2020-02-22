import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {

  }

  onSuperClassChange(){
    this.getClassInstances();
  }

  getClassInstances(){
    if(!this.selectedSuperClass) return;
    console.log(this.selectedSuperClass);
  }

}

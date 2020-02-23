import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wall-types',
  templateUrl: './wall-types.component.html',
  styleUrls: ['./wall-types.component.css']
})
export class WallTypesComponent implements OnInit {

  @Input() buildingURI: string;

  public superClasses = [
    {name: "Wall", uri: "nir:Wall"},
    {name: "Slab", uri: "nir:Slab"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-storey-selector',
  templateUrl: './storey-selector.component.html',
  styleUrls: ['./storey-selector.component.css']
})
export class StoreySelectorComponent implements OnInit {

  @Input() buildingURI;

  constructor() { }

  ngOnInit(): void {
  }

}

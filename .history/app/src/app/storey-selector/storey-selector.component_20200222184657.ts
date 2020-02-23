import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-storey-selector',
  templateUrl: './storey-selector.component.html',
  styleUrls: ['./storey-selector.component.css']
})
export class StoreySelectorComponent implements OnChanges {

  public storeys;
  public newStoreyName: string;
  public selectedStoreys;
  public addMode: boolean = false;

  @Output() onStoreyChange = new EventEmitter<any>();

  @Input() buildingURI;

  constructor() { }

  ngOnChanges(): void {
    if(!this.buildingURI) return;


  }

}

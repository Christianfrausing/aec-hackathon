import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';

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

  constructor(
    private _fs: FusekiService,
    private _g: GlobalsService
  ) { }

  ngOnChanges(): void {
    if(!this.buildingURI) return;


  }

}

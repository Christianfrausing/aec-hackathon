import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-space-loader',
  templateUrl: './space-loader.component.html',
  styleUrls: ['./space-loader.component.css']
})
export class SpaceLoaderComponent implements OnInit {

  @Output() parsedJSON = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onParseFinish(json){
    this.parsedJSON.emit(json);
  }

}

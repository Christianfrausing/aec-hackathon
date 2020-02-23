import { Component, OnInit } from '@angular/core';
import { FusekiService } from '../services/fuseki.service';

@Component({
  selector: 'app-building-selector',
  templateUrl: './building-selector.component.html',
  styleUrls: ['./building-selector.component.css']
})
export class BuildingSelectorComponent implements OnInit {

  constructor(
    private _fs: FusekiService
  ) { }

  ngOnInit(): void {
  }

}

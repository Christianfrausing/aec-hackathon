import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PaperScope, Project, Path, Point } from 'paper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('canvasElement') canvasElement: ElementRef;

  public endpoint;
  public scope: PaperScope;
  public project: Project;

  ngOnInit(){
    console.log(this.canvasElement.nativeElement);
  }

  // Emitted when DXF parser has data
  // (til Jonas)
  onParseFinish(ev){
    console.log(ev);
  }

}

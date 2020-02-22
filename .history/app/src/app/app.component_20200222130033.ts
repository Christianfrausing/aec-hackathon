import { Component, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { PaperScope, Project, Path, Point } from 'paper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{

  @ViewChild('canvasElement') canvasElement: ElementRef;

  public endpoint;
  public scope;
  public project;

  ngOnChanges(){
    console.log(this.canvasElement.nativeElement);
    this.buildPaper();
    
  }

  buildPaper(){
    if(this.canvasElement == undefined) return;
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);

    const path = new Path.Circle({
      center: [80, 50],
      radius: 30,
      strokeColor: 'black'
    });
  }

  // Emitted when DXF parser has data
  // (til Jonas)
  onParseFinish(ev){
    console.log(ev);
  }

}

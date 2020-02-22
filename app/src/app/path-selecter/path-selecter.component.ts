import { Component, ViewChild, ElementRef, OnInit, OnChanges, Input, Inject } from '@angular/core';
import { PaperScope, Project, Path, Point, Segment,Curve,Color} from 'paper';
import { inject } from '@angular/core/testing';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-path-selecter',
  templateUrl: './path-selecter.component.html',
  styleUrls: ['./path-selecter.component.css']
})
export class PathSelecterComponent implements OnChanges {

  constructor() {
   var self_ = this;
  }

  @Input() jasonPassed;

  @ViewChild('canvasElement') canvasElement: ElementRef;

  public endpoint;
  public scope;
  public project;
  public arrayPath = [];
  public color = Color.random()
  
   
  

  ngOnChanges(){
    console.log(this.jasonPassed)
    console.log(this.canvasElement.nativeElement);
    
    this.buildPaper(this.jasonPassed);    
  }

  
  onRightClick()
  {
    this.arrayPath = []
    this.color = Color.random()

  }

  pathEnterEvent(path){
    path.strokeColor = 'red';
  }

  pathClickEvent(path){
    console.log(path)      

    if(this.arrayPath.length == 0){
    var path2 = path.clone()
    path2.strokeColor = 'green'
    path2.strokeWidth = 10      
    this.arrayPath.push(path2)      
  } 
  if(this.arrayPath.length != 0){
    var path2 = path.clone()
    //path2.strokeColor = 'green'
    path2.strokeWidth = 10 
    
    
    var path3 = path2.join(this.arrayPath[this.arrayPath.length-1])
    
    path3.strokeColor = this.color
    path3.strokeWidth = 15 
    this.arrayPath.push(path3)   

    console.log(path3.length)


  }
}

pathDClickEvent(path)
{
  
   this.pathClickEvent(path)
}

 

  pathLeavekEvent(path){
    path.strokeColor = 'black';
  }


 


  buildPaper(jasonPassed){

    var self = this;

    var n = 0 
    var arrayPath = [];
    var color = Color.random()

    if(this.canvasElement == undefined) return;
    console.log("building paper")
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);

    jasonPassed.forEach(element => {
      console.log(element.path)

      var path = new Path({strokeColor:'black', strokeWidth:5});
      
      element.vertices.forEach((v, index) => {

        if(element.vertices[index+1]){
        var path = new Path({strokeColor:'black', strokeWidth:5});
        path.add(new Point(v.x, v.y))
        path.add(new Point(element.vertices[index+1].x, element.vertices[index+1].y)) 
        path.onMouseEnter = function(event) {self.pathEnterEvent(this)}
        path.onMouseLeave = function(event) {self.pathLeavekEvent(this)}
        path.onClick = function(event){self.pathClickEvent(this)}
        path.onDoubleClick = function(event){self.pathDClickEvent(this)}
        }
      })

      var path = new Path({strokeColor:'black', strokeWidth:5});
        path.add(new Point(element.vertices[0].x, element.vertices[0].y))
        path.add(new Point(element.vertices[element.vertices.length-1].x, 
                            element.vertices[element.vertices.length-1].y)) 
        path.onMouseEnter = function(event) {self.pathEnterEvent(this)}
        path.onMouseLeave = function(event) {self.pathLeavekEvent(this)}
        path.onClick = function(event){self.pathDClickEvent(this)}
        

    });
   
    console.log(this.project.activeLayer.fitBounds(this.scope.view.bounds))
    this.scope.view.zoom =0.95

}
}

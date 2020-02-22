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

  @Input() jasonPassed;

  @ViewChild('canvasElement') canvasElement: ElementRef;

  public endpoint;
  public scope;
  public project;
   
  

  ngOnChanges(){
    console.log(this.jasonPassed)
    console.log(this.canvasElement.nativeElement);
    
    this.buildPaper(this.jasonPassed);    
  }

  onKeyDown(event) {
    // When a key is pressed, set the content of the text item:
    console.log( event.key + ' key was pressed!')
  }



  buildPaper(jasonPassed){

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
        path.onMouseEnter = function(event) {pathEnterEvent(this)}
        path.onMouseLeave = function(event) {pathLeavekEvent(this)}
        path.onClick = function(event){ pathClickEvent(this)}
        path.onDoubleClick = function(event){ pathDClickEvent(this)}
        }
      })

      var path = new Path({strokeColor:'black', strokeWidth:5});
        path.add(new Point(element.vertices[0].x, element.vertices[0].y))
        path.add(new Point(element.vertices[element.vertices.length-1].x, 
                            element.vertices[element.vertices.length-1].y)) 
        path.onMouseEnter = function(event) {pathEnterEvent(this)}
        path.onMouseLeave = function(event) {pathLeavekEvent(this)}
        path.onClick = function(event){ pathDClickEvent(this)}

    });

    this.project.activeLayer.fitBounds(this.scope.view.bounds);

    function pathClickEvent(path){
      console.log(path)      

      if(arrayPath.length == 0){
      var path2 = path.clone()
      path2.strokeColor = 'green'
      path2.strokeWidth = 10      
      arrayPath.push(path2)      
    } 
    if(arrayPath.length != 0){
      var path2 = path.clone()
      //path2.strokeColor = 'green'
      path2.strokeWidth = 10 
      
      
      var path3 = path2.join(arrayPath[arrayPath.length-1])

      
      path3.strokeColor = color
      path3.strokeWidth = 15 
      arrayPath.push(path3)   

      console.log(path3)


    }
  }

  function pathDClickEvent(path)
  {
     arrayPath = [];
     color = Color.random()
     pathClickEvent(path)

  }

    function pathEnterEvent(path){
      path.strokeColor = 'red';
    }

    function pathLeavekEvent(path){
      path.strokeColor = 'black';
    }
  }

  

  

}

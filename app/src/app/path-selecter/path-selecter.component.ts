import { Component, ViewChild, ElementRef, OnInit, OnChanges, Input, Inject, SimpleChanges } from '@angular/core';
import { PaperScope, Project, Path, Point, Segment, Curve, Color } from 'paper';
import { inject } from '@angular/core/testing';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { element } from 'protractor';
import { FusekiService } from '../services/fuseki.service';
import { GlobalsService } from '../services/globals.service';
import * as urljoin from 'url-join';
import { uuid } from 'uuidv4';

@Component({
  selector: 'app-path-selecter',
  templateUrl: './path-selecter.component.html',
  styleUrls: ['./path-selecter.component.css']
})
export class PathSelecterComponent implements OnChanges {

  constructor(
    private _fs: FusekiService,
    private _g: GlobalsService
  ) {

  }

  @Input() jasonPassed;
  @Input() storyPassed: string;
  @Input() passedWallClass: string;

  @ViewChild('canvasElement') canvasElement: ElementRef;

  public endpoint;
  public scope;
  public project;
  public arrayPath = [];
  public arrayWallType = [];
  public arrayFinshedPath = [];
  public color = Color.random()




  ngOnChanges(change: SimpleChanges) {

    

    
    if (change.storyPassed) {
      this.loadPathFrom()
      console.log("story - " + this.storyPassed)

    }
    if (change.passedWallClass) {
      if (this.arrayPath.length != 0) {

        this.arrayFinshedPath.push(this.arrayPath[this.arrayPath.length - 1])
        this.arrayWallType.push(change.passedWallClass.previousValue)
        this.arrayPath = []
        this.color = Color.random()
        this.arrayWallType.push
      }
    }

    if (change.jasonPassed) {
      this.buildPaper(this.jasonPassed);
    }
  }

  loadPathFrom(){

    if(!this.storyPassed) return;
    const q = `
      SELECT ?wall ?wallType ?wkt
      WHERE {
        <${this.storyPassed}> bot:adjacentElement ?wall .
        ?wall a nir:Wall , ?wallType ;          
          omg:hasGeometry ?geo .
          ?geo fog:asSfa_V2-wkt ?wkt
      }`;
      this._fs.getQuery(q).subscribe(res => {
        console.log(res);
      }, err => console.log(err));
  }

  pathEnterEvent(path) {
    path.strokeColor = 'red';
  }

  pathClickEvent(path) {

    if (this.passedWallClass) {
      if (this.arrayPath.length == 0) {
        var path2 = path.clone()
        path2.strokeColor = 'green'
        path2.strokeWidth = 10
        this.arrayPath.push(path2)

      }
      if (this.arrayPath.length != 0) {
        var path2 = path.clone()
        //path2.strokeColor = 'green'
        path2.strokeWidth = 10


        var path3 = path2.join(this.arrayPath[this.arrayPath.length - 1])

        path3.strokeColor = this.color
        path3.strokeWidth = 15
        this.arrayPath.push(path3)

        console.log(path3.length)


      }
    }
  }

  pathDClickEvent(path) {

    this.pathClickEvent(path)
  }



  pathLeavekEvent(path) {
    path.strokeColor = 'black';
  }

  sendData() {
    this.arrayWallType.push(this.passedWallClass)
    this.arrayFinshedPath.push(this.arrayPath[this.arrayPath.length - 1])
    this.arrayFinshedPath.forEach((element,index) => {
      console.log("sender og Sender")
      var wkt = "LINESTRING ("
      if (element.segments) {
        element.segments.forEach(seg => {
          wkt += seg.point.x + " " + seg.point.y + " ,"
        });
        wkt = wkt.slice(0, -1);
        wkt += ")"
      }

      const ns = this._g.getGlobalNamespace();
      const wallURI = urljoin(ns, uuid());
      const geometriURI = urljoin(ns, uuid());
      var wallType = this.arrayWallType[index];

      const q = `
INSERT DATA{
  <${this.storyPassed}> bot:adjacentElement <${wallURI}> .
  <${wallURI}> a nir:Wall , <${wallType}> ;
    nir:length "${element.length}"^^xsd:decimal ;
    omg:hasGeometry <${geometriURI}> .
  <${geometriURI}> fog:asSfa_V2-wkt "${wkt}"^^xsd:string
}`;

      this._fs.updateQuery(q).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err)
      });

      console.log(q)

    })




  }








  buildPaper(jasonPassed) {

    var self = this;

    var n = 0
    var arrayPath = [];
    var color = Color.random()

    if (this.canvasElement == undefined) return;
    console.log("building paper")
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);

    jasonPassed.forEach(element => {


      var path = new Path({ strokeColor: 'black', strokeWidth: 5 });

      element.forEach((v, index) => {

        if (element[index + 1]) {
          var path = new Path({ strokeColor: 'black', strokeWidth: 5 });
          path.add(new Point(v.x, v.y))
          path.add(new Point(element[index + 1].x, element[index + 1].y))
          path.onMouseEnter = function (event) { self.pathEnterEvent(this) }
          path.onMouseLeave = function (event) { self.pathLeavekEvent(this) }
          path.onClick = function (event) { self.pathClickEvent(this) }
          path.onDoubleClick = function (event) { self.pathDClickEvent(this) }
        }
      })

      var path = new Path({ strokeColor: 'black', strokeWidth: 5 });
      path.add(new Point(element[0].x, element[0].y))
      path.add(new Point(element[element.length - 1].x,
        element[element.length - 1].y))
      path.onMouseEnter = function (event) { self.pathEnterEvent(this) }
      path.onMouseLeave = function (event) { self.pathLeavekEvent(this) }
      path.onClick = function (event) { self.pathDClickEvent(this) }


    });

    console.log(this.project.activeLayer.fitBounds(this.scope.view.bounds))
    this.scope.view.zoom = 0.95

  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public endpoint;

  // Emitted when DXF parser has data
  // (til Jonas)
  onParseFinish(ev){
    console.log(ev);
  }


}

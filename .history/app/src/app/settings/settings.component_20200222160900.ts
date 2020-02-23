import { Component, OnInit } from '@angular/core';
import { GlobalsService, TriplestoreSettings } from '../services/globals.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settings: TriplestoreSettings;
  public namespace: string;

  constructor(
    private _g: GlobalsService
  ) { }

  ngOnInit(): void {

    this.settings = this._g.getTriplestoreSettings();
    this.namespace = this._g.getGlobalNamespace();

  }

  saveSettings(){
    this._g.saveTriplestoreSettings(this.settings);
    this._g.saveGlobalNamespace(this.namespace);
  }

}

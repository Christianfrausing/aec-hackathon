import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { DXFJSONParserService } from './dxf-json-parser.service';
 
@Component({
  selector: 'dxf-json-parser',
  templateUrl: './dxf-json-parser.component.html',
  styleUrls: ['./dxf-json-parser.component.scss'],
  providers: [DXFJSONParserService]
})
export class DXFJSONParserComponent {
 
  public files: NgxFileDropEntry[] = [];
  public processedFiles;

  public spaceLayer: string = "Space";
    public spaceTypeLayer: string = "SpaceType";
    public spaceNameLayer: string = "SpaceName";

  constructor(
      private _s: DXFJSONParserService,
      public sanitizer: DomSanitizer
  ){}
 
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Only process DXF files
          const fileName = file.name;
          const fileExtension = fileName.split('.').pop();
          if(fileExtension.toLowerCase() != "dxf") return;

          this.readFile(file, fileName);
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public readFile(file: File, fileName) {

    console.log("Reading "+fileName);

    var reader = new FileReader();

    reader.readAsText(file, "UTF-8");

        // On file load
        reader.onload = async () => {
            
            const fileContent = reader.result.toString();

            // Parse file content to JSON
            const {json, svg} = await this._s.parseFile(fileContent, this.spaceLayer, this.spaceNameLayer, this.spaceTypeLayer);

            // Parse further to csv

            // Write JSON
            fileName = fileName.replace('dxf', 'json');
            const jsonBlob = await this._s.writeJSONBlob(json);
            var fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(jsonBlob));
            this.processedFiles.push({url: fileUrl, fileName});

            // write SVG
            fileName = fileName.replace('json', 'svg');
            const svgBlob = await this._s.writeSVGBlob(svg);
            fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(svgBlob));
            this.processedFiles.push({url: fileUrl, fileName});

        };
        
        reader.onerror = () => {
            console.log('error reading file');
        }
    }

    public fileOver(event){
        console.log(event);
      }
     
      public fileLeave(event){
        console.log(event);
      }
 
}
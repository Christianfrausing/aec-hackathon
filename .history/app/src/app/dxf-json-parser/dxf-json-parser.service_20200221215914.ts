import { Injectable } from '@angular/core';
import * as paper from 'paper';
// import { Helper } from 'dxf';
import * as dxf from 'dxf';


@Injectable()
export class DXFJSONParserService {

    constructor(){
        paper.setup(null); // creates a new paperJS project
    }

    parseFile(dxfStr, spaceLayer, spaceNameLayer, spaceTypeLayer): Promise<any>{

        return new Promise((resolve, reject) => {

            console.log(dxfStr)

            // Initialise helper
            const helper = new dxf.Helper(dxfStr);

            // Save denormalised object
            // const denormalised = helper.denormalised;

            // // Save space names/types and coordinates
            // var spaceNames = [];
            // var spaceTypes = [];
            // denormalised
            //     .filter(item => item.string != undefined)
            //     .forEach(item => {
            //         if(item.layer == spaceNameLayer){
            //             spaceNames.push(this._buildTextPoint(item))
            //         }
            //         if(item.layer == spaceTypeLayer){
            //             spaceTypes.push(this._buildTextPoint(item))
            //         }
            //     });

            // // Build space objects
            // const json = denormalised
            //                         .filter(item => item.layer = spaceLayer)
            //                         .filter(item => item.vertices)
            //                         .map(item => {

            //                             // Build path from vertices
            //                             var path = new paper.Path();
            //                             item.vertices.forEach(v => path.add(new paper.Point(v.x, v.y)) );

            //                             // Find matching name
            //                             const nMatch = spaceNames.find(item => path.contains(item.point));
            //                             const name = nMatch.text;

            //                             // Find matching type
            //                             const tMatch = spaceTypes.find(item => path.contains(item.point));
            //                             const type = tMatch ? tMatch.text : undefined;

            //                             // Get area
            //                             var area = Math.abs(path.area/1000000);
            //                             area = Math.round(area * 100) / 100;    // Round to two decimal places

            //                             return {path, name, type, area, svg: path.pathData};
            //                         });

            // // NB! DER ER ET PROBLEM MED ARCS
            // // Pakken dxf har en helper.toSVG() der oversætter den korrekt
            // // Fx bliver path for den buede linje i filen Test.dxf til <path d="M 38154.17705819232 52108.07055137999 A 1000 1000 0 0 1 37154.17705819232 51108.07055137999" />

            // const svg = helper.toSVG();

            const json = {};
            const svg = "";

            resolve({json, svg});

        });

    }

    async writeJSONBlob(jsonData){

        var jsonStr = '\ufeff';

        jsonStr += JSON.stringify(jsonData, null, "\t");

        // Build blob
        return new Blob([jsonStr], { type: 'application/octet-stream' });

    }

    async writeSVGBlob(svgData){

        // Build blob
        return new Blob([svgData], { type: 'application/octet-stream' });

    }

    private _buildTextPoint(textItem){
        const x = textItem.xAxisX;
        const y = textItem.xAxisY;
        const point = new paper.Point(x, y);
        const text = textItem.string;
        return {text, point};
    }

}
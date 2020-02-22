import { Injectable } from '@angular/core';
import * as paper from 'paper';
import { Helper } from 'dxf';


@Injectable()
export class DXFJSONParserService {

    constructor(){
        paper.setup(null); // creates a new paperJS project
    }

    parseFile(dxfStr, layer): Promise<any>{

        return new Promise((resolve, reject) => {

            // Initialise helper
            const helper = new Helper(dxfStr);

            // Save denormalised object
            const denormalised = helper.denormalised;

            // Build space objects
            const json = denormalised
                                    .filter(item => item.layer = layer)
                                    .filter(item => item.vertices)
                                    .map(item => item.vertices);

            // NB! DER ER ET PROBLEM MED ARCS
            // Pakken dxf har en helper.toSVG() der oversætter den korrekt
            // Fx bliver path for den buede linje i filen Test.dxf til <path d="M 38154.17705819232 52108.07055137999 A 1000 1000 0 0 1 37154.17705819232 51108.07055137999" />

            const svg = helper.toSVG();

            console.log(json)

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

}
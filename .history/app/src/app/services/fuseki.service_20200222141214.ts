import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';

@Injectable()
export class FusekiService {

    constructor(
        private _g: GlobalsService
    ){}

}
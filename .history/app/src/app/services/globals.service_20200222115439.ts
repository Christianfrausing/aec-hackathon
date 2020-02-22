import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

export interface TriplestoreSettings{
    endpoint: string;
    user?: string;
    password?: string;
}

@Injectable()
export class GlobalsService {

    constructor(
        public lss: LocalStorageService
    ){}

    public saveTriplestoreSettings(object: TriplestoreSettings) {
        // Save object to {prefix}endpointSettings
        this.lss.set('lcaEndpointSettings', object);
    }

    public getTriplestoreSettings(): TriplestoreSettings {
        return this.lss.get('endpointSettings');
    }

}
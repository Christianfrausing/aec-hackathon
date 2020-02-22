import { Injectable } from '@angular/core';

export class TriplestoreSettings{
    endpoint: string;
    user?: string;
    password?: string;

    constructor(ep, u, pw){
        this.endpoint = ep;
        this.user = u;
        this.password = pw;
    }
}

@Injectable()
export class GlobalsService {

    constructor(){}

    public saveTriplestoreSettings(object: TriplestoreSettings) {
        // Save object to {prefix}endpointSettings
        localStorage.setItem('myEndpoint', object.endpoint);
        localStorage.setItem('myUser', object.user);
        localStorage.setItem('myPW', object.password);
    }

    public getTriplestoreSettings(): TriplestoreSettings {
        const endpoint = localStorage.getItem('myEndpoint');
        const user = localStorage.getItem('myUser');
        const password = localStorage.getItem('myPW');

        // If no settings, set default
        if(!endpoint){
            const settings = new TriplestoreSettings("http://localhost:3031/AEChackathon", "hackMaster", "Master");
            this.saveTriplestoreSettings(settings);
            return this.getTriplestoreSettings();
        }

        return new TriplestoreSettings(endpoint, user, password);
    }

}
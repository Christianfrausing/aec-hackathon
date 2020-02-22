import { Injectable } from '@angular/core';

export interface TriplestoreSettings{
    endpoint: string;
    user?: string;
    password?: string;
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
        return {endpoint, user, password};
    }

}
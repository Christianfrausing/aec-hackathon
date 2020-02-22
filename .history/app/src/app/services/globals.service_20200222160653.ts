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

    public namespaces = [
        {prefix: "rdf", uri: "http://www.w3.org/1999/02/22-rdf-syntax-ns#"},
        {prefix: "rdfs", uri: "http://www.w3.org/2000/01/rdf-schema#"},
        {prefix: "xsd", uri: "http://www.w3.org/2001/XMLSchema#"},
        {prefix: "prov", uri: "http://www.w3.org/ns/prov#"},
        {prefix: "opm", uri: "https://w3id.org/opm#"},
        {prefix: "ice", uri: "https://w3id.org/ice#"},
        {prefix: "seas", uri: "https://w3id.org/seas/"},
        {prefix: "sd", uri: "http://www.w3.org/ns/sparql-service-description#"},
        {prefix: "bot", uri: "https://w3id.org/bot#"},
        {prefix: "fso", uri: "https://w3id.org/fso#"},
        {prefix: "cdt", uri: "http://w3id.org/lindt/custom_datatypes#"},
        {prefix: "owl", uri: "http://www.w3.org/2002/07/owl#"},
        {prefix: "nir", uri: "https://www.bim.niras.com/ontology#"},
        {prefix: "omg", uri: "https://w3id.org/omg#"},
        {prefix: "fog", uri: "https://w3id.org/fog#"},
        {prefix: "rvt", uri: "https://example.org/rvt#"},
        {prefix: "schema", uri: "http://schema.org/"},
        {prefix: "props", uri: "https://w3id.org/props#"},
        {prefix: "prod", uri: "https://w3id.org/product#"},
        {prefix: "tl", uri: "http://purl.org/NET/c4dm/timeline.owl#"},
        {prefix: "sh", uri: "http://www.w3.org/ns/shacl#"},
        {prefix: "wgs84", uri: "http://www.w3.org/2003/01/geo/wgs84_pos#"}
    ]

    constructor(){}

    public saveTriplestoreSettings(object: TriplestoreSettings) {
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
            const settings = new TriplestoreSettings("http://localhost:3031/AEChackathon", "hack", "Master");
            this.saveTriplestoreSettings(settings);
            return this.getTriplestoreSettings();
        }

        return new TriplestoreSettings(endpoint, user, password);
    }

    public saveGlobalNamespace(ns: string){
        localStorage.setItem('myGlobalNamespace', ns);
    }

    public getGlobalNamespace(){
        return localStorage.getItem('myGlobalNamespace')
    }

}
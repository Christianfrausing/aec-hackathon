import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService, TriplestoreSettings } from './globals.service';
import { map } from 'rxjs/operators';
import * as urljoin from 'url-join';

@Injectable()
export class FusekiService {

    private settings: TriplestoreSettings;
    private auth: string;

    constructor(
        private _g: GlobalsService,
        private _http: HttpClient
    ){
        this.settings = this._g.getTriplestoreSettings();
    }

    private setAuth(){
        this.auth = `Basic ${window.btoa(this.settings.user + ':' + this.settings.password)}`;
    }

    public getQuery(query, endpoint){

        if(!endpoint) endpoint = urljoin(this.settings, 'query');
    
        query = this._appendPrefixesToQuery(query);
    
        // Get query type if it has not been explicitly stated
        const queryType = this._getQueryType(query);
    
        var options: any = {};
        options.headers = {}
        options.headers['Authorization'] = this.auth;
    
        // query type
        if(queryType == 'construct' || queryType == 'describe'){
          options.headers['Accept'] = 'application/ld+json';
        }else{
          options.headers['Accept'] = 'application/sparql-results+json';
        }
    
        var url = `${endpoint}`;
    
        if(queryType == 'construct' || queryType == 'describe'){
          return this._http.post(url, {query}, options);
        }
        else{
          return this._http.post(url, {query}, options)
            .pipe(
              map(res => {
                var data: any = res;
    
                if(queryType == 'ask'){
                  return data.boolean;
                }
    
                if(queryType == 'select'){
    
                  if(data.results && data.results.bindings){
                    return data.results.bindings;
                  }
                  else if(data.boolean){
                    return data.boolean
                  }
                  else{
                    return null;
                  }
    
                }
                
              })
            );
        }
    
      }

      public updateQuery(query, endpoint?){
    
        if(!endpoint) endpoint = urljoin(this.settings, 'update');

        query = this._appendPrefixesToQuery(query);
    
        var options: any = {observe: 'response', responseType: 'text'};
        options.headers['Authorization'] = this.auth;
    
        return this._http.post(endpoint, {query}, options);
    
      }

      private _appendPrefixesToQuery(query): string{
    
        // Extract namespaces used in the query
        var nameSpacesInQuery = this._getNameSpacesInQuery(query);
        
        // Get the URIs of the prefixes and append them to the query
        var p = '';
        nameSpacesInQuery.forEach(ns => {
            var match = this._g.namespaces.filter(pfx => String(pfx.prefix) == String(ns))[0];
            if(match){
                p+= `PREFIX  ${ns}: <${match.uri}>\n`;
            }
            else {
                return new Error('Unknown prefix '+ns);
            }
        })
        return p+query;
    
      }
    
      private _getNameSpacesInQuery = (str) => {
        var array = [];
    
        const regex = /[a-zA-Z0-9]+\:/g;
        let m;
        
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            m.forEach((match) => {
                match = match.slice(0, -1);
                if(array.indexOf(match) == -1){
                    array.push(match);
                }
            });
        }
        return array;
      }

      public _getQueryType(query: string){

        var keyWords = [
          {text: 'select', index: -1},
          {text: 'ask', index: -1},
          {text: 'construct', index: -1},
          {text: 'count', index: -1},
          {text: 'describe', index: -1},
          {text: 'insert', index: -1},
          {text: 'delete', index: -1}
        ];
    
        // Get indexes and set a variable if at least one matches + store lowest index
    
        var match = false;  // Set to true if some keyword match is found
        var low = Infinity;
    
        keyWords = keyWords.map(item => {
          item.index = query.toLowerCase().indexOf(item.text);
          if(item.index != -1){
            match = true;
            if(item.index < low) low = item.index;
          }
          return item;
        });
    
        // If none of the keywords match return null
        if(!match) return null;
    
        // If more exist, take the lowest
        var lowest = keyWords.find(item => item.index == low);
        if(!lowest) return null;
        const type = lowest.text;
    
        if(type == 'insert' || type == 'delete') return 'update';
    
        return type;
    
      }

}
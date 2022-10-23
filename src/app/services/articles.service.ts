import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ArticlesService {
    static readonly articles_uri = 'http://resource-server:8090/articles';

    constructor(private http: HttpClient) {}

    getArticles(access_token: string): Observable<string> {
        const options = {
            'headers': new HttpHeaders().set('Authorization', 'Bearer ' + access_token),
            'responseType': 'text' as 'json'
        };
            
        return this.http.get<string>(ArticlesService.articles_uri, options);
    }
}
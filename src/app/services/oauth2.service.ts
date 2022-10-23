import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JWT } from '../interfaces/interfaces';

@Injectable({providedIn: 'root'})
export class OAuth2Service {
    static readonly client_id = 'articles-client';
    static readonly client_secret = 'secret';
    static readonly redirect_uri = 'http://client-server:8080/login/oauth2/code/articles-client-oidc';
    static readonly auth_code_uri = 'http://auth-server:9000/oauth2/authorize';
    static readonly token_uri = 'http://auth-server:9000/oauth2/token';

    constructor(private http: HttpClient) {}

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token != null;
    }    

    authenticate(): void {
        this.getAuthCode();
    }

    getAuthCode(): void {
        const full_auth_code_uri = new URL(OAuth2Service.auth_code_uri);
        full_auth_code_uri.searchParams.append('response_type', 'code');
        full_auth_code_uri.searchParams.append('client_id', OAuth2Service.client_id);
        full_auth_code_uri.searchParams.append('scope', 'openid articles.read');
        full_auth_code_uri.searchParams.append('redirect_uri', OAuth2Service.redirect_uri);
        window.location.href = full_auth_code_uri.href;
    }
    
    getToken(code: string): Observable<JWT> {
        const body = new URLSearchParams();
        body.set('grant_type', 'authorization_code');
        body.set('code', code);
        body.set('redirect_uri', OAuth2Service.redirect_uri);
    
        const options = {
          headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent(OAuth2Service.client_id + ':' + OAuth2Service.client_secret))))
        };
          
        return this.http.post<JWT>(OAuth2Service.token_uri, body.toString(), options);
    }

    clearToken(): void {
        localStorage.removeItem('token');
    }
    
}
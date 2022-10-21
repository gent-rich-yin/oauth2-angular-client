import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface JWT {
  access_token: string,
  id_token: string,
  refresh_token: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oauth2-angular-client';

  static readonly client_id = 'articles-client';
  static readonly client_secret = 'secret';
  static readonly redirect_uri = 'http://client-server:8080/login/oauth2/code/articles-client-oidc';
  static readonly auth_code_uri = 'http://auth-server:9000/oauth2/authorize';
  static readonly token_uri = 'http://auth-server:9000/oauth2/token';
  static readonly articles_uri = 'http://resource-server:8090/articles';

  code = '';
  jwt?: JWT;
  articles = '';
    
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    if( error ) {
      alert("Error: " + error + " Description: " + errorDescription);
    } else if( code ) {
      this.code = code;
    }
  }

  getAuthCode() {
    const full_auth_code_uri = new URL(AppComponent.auth_code_uri);
    full_auth_code_uri.searchParams.append('response_type', 'code');
    full_auth_code_uri.searchParams.append('client_id', AppComponent.client_id);
    full_auth_code_uri.searchParams.append('scope', 'openid articles.read');
    full_auth_code_uri.searchParams.append('redirect_uri', AppComponent.redirect_uri);
    window.location.href = full_auth_code_uri.href;
  }

  getToken() {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', this.code);
    body.set('redirect_uri', AppComponent.redirect_uri);

    const options = {
      headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent(AppComponent.client_id + ':' + AppComponent.client_secret))))
    };
      
    this.http.post<JWT>(AppComponent.token_uri, body.toString(), options)
      .subscribe(jwt => {
        this.jwt = jwt;
      });
  }

  getArticles() {
    const options = {
      'headers': new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt?.access_token),
      'responseType': 'text' as 'json'
    };
      
    this.http.get<string>(AppComponent.articles_uri, options)
      .subscribe(articles => {
        console.log(articles);
        this.articles = articles;
      });
  }
  
}

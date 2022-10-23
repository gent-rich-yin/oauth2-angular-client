import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { OAuth2Service } from 'src/app/services/oauth2.service';
import { JWT } from '../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  code: string = '';
  jwt: JWT = {access_token: '', id_token: '', refresh_token: ''};
  articles = '';
  paramMapSubscription: Subscription = new Subscription(); 
    
  constructor(private oauth2Service: OAuth2Service, private articlesService: ArticlesService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.code = params.get('code') as string;
    });
    sessionStorage.setItem('targetComponent', '/home');
    //   const params = new URLSearchParams(window.location.search);
    //   const code = params.get('code');
    //   const error = params.get('error');
    //   const errorDescription = params.get('error_description');
    //   if( error ) {
    //     alert("Error: " + error + " Description: " + errorDescription);
    //   } else if( code ) {
    //     this.code = code;
    // }
  }

  getAuthCode() {
    this.oauth2Service.getAuthCode();
  }

  getToken() {
    this.oauth2Service.getToken(this.code).subscribe(jwt => this.jwt = jwt);
  }

  getArticles() {
      this.articlesService.getArticles(this.jwt.access_token).subscribe(articles => {
        console.log(articles);
        this.articles = articles;
      });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }
}

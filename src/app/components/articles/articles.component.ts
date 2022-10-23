import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { OAuth2Service } from 'src/app/services/oauth2.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles = '';

  constructor(private oauth2Service: OAuth2Service, private articlesService: ArticlesService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    this.articlesService.getArticles(token).subscribe(articles => this.articles = articles);
  }

  clearToken(): void {
    this.oauth2Service.clearToken();
  }

}

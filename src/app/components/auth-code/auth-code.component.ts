import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Service } from 'src/app/services/oauth2.service';

@Component({
  selector: 'app-auto-code',
  template: ''
})
export class AuthCodeComponent implements OnInit {

  constructor(private oauth2Service: OAuth2Service, private router: Router) { }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    const targetComponent = sessionStorage.getItem('targetComponent');

    if( error ) {
      this.router.navigate(['/error', {error: error, errorDescription: errorDescription}]);
    } else if( code ) {
      if( targetComponent === null || targetComponent === '/home' ) {
        this.router.navigate(['/home', {code: code}]);
      } else {
        this.oauth2Service.getToken(code).subscribe(token => {
          localStorage.setItem('token', token.access_token);
          this.router.navigate([targetComponent]);
        });
      }
    }
  }

}

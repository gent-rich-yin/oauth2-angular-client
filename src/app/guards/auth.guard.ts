import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { OAuth2Service } from "../services/oauth2.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private oauth2Service: OAuth2Service) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if( !this.oauth2Service.isAuthenticated() ) {
            sessionStorage.setItem('targetComponent', route.url[0].path);
            this.oauth2Service.authenticate();
            return this.oauth2Service.isAuthenticated();
        }
        return true;
    }

}
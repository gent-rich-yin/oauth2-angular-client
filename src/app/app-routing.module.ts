import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticlesComponent } from "./components/articles/articles.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthCodeComponent } from './components/auth-code/auth-code.component';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', pathMatch: 'full', component: HomeComponent},
  {path: 'login/oauth2/code/articles-client-oidc', component: AuthCodeComponent},
  {path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

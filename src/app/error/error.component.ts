import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  error = '';
  errorDescription = '';
  paramMapSubscription: Subscription = new Subscription(); 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.error = params.get('error') as string;
      this.errorDescription = params.get('errorDescription') as string;
    });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

}

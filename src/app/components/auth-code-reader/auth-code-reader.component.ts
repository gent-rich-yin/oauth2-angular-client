import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'auth-code-reader',
    template: ''
})
export class AuthCodeReaderComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            const autoCode = params['code'];
            const error = params['error'];
            const errorDescription = params['error_description'];

            if( error ) {
                alert('error: ' + error + " description: " + errorDescription);
            } else {
            }

        });
    }

    ngOnInit(): void {
    }
}
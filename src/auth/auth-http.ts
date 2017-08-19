import { Http, RequestOptionsArgs, Response, Request, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    private updateHeaders(headers: Headers) {
        if (headers.has('Authorization') === false) {
            const sessionId = localStorage.getItem('adrenalivre_session_id');
            if (sessionId) {
                headers.append('Authorization', 'Bearer ' + sessionId);
            }
        }
        if (headers.has('Accept') === false) {
            headers.append('Accept', 'application/json');
        }
        if (headers.has('Content-Type') === false) {
            headers.append('Content-Type', 'application/json');
        }
    }

    request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
        this.updateHeaders(url.headers);
        return super.request(url, options);
    }
}

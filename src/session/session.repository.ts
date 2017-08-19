import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Session } from './session';
import { Error, ErrorFactory } from '../error';

@Injectable()
export class SessionRepository {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public retrieve(id: string): Observable<Session | Error> {
        return this.http.get(this.configuration.baseUrl + '/sessions/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Session(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(session: Session): Observable<Session | Error> {
        if (session.id) {
            throw new Error('An existing session can not be saved');
        }

        return this.http.post(this.configuration.baseUrl + '/sessions', session)
            .map((response: Response) => response.json())
            .map((data: object) => session.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(session: Session): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/sessions/' + session.id)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }
}

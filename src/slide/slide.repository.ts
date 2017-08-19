import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Slide } from './slide';
import { Error, ErrorFactory } from '../error';

@Injectable()
export class SlideRepository {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: URLSearchParams | object = {}): Observable<Slide[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/slides', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((slideObject) => new Slide(slideObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<Slide | Error> {
        return this.http.get(this.configuration.baseUrl + '/slides/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Slide(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(slide: Slide): Observable<Slide | Error> {
        if (slide.id) {
            return this.http.patch(this.configuration.baseUrl + '/slides/' + slide.id, slide)
                .map((response: Response) => response.json())
                .map((data: object) => slide.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/slides', slide)
            .map((response: Response) => response.json())
            .map((data: object) => slide.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(slide: Slide): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/slides/' + slide.id)
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

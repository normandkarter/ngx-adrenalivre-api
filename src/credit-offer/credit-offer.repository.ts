import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { CreditOffer } from './credit-offer';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { CreditOfferForm } from "./credit-offer-form";

@Injectable()
export class CreditOfferRepository implements Repository<CreditOffer> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<CreditOffer[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/creditOffers', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((creditOfferObject) => new CreditOffer(creditOfferObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<CreditOffer | Error> {
        return this.http.get(this.configuration.baseUrl + '/creditOffers/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new CreditOffer(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(creditOfferForm: CreditOfferForm, creditOffer: CreditOffer = null): Observable<CreditOffer | Error> {
        if (creditOffer && creditOffer.id) {
            return this.http.patch(this.configuration.baseUrl + '/creditOffers/' + creditOffer.id, creditOfferForm)
                .map((response: Response) => response.json())
                .map((data: object) => creditOffer.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/creditOffers', creditOfferForm)
            .map((response: Response) => response.json())
            .map((data: object) => creditOffer.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(creditOffer: CreditOffer): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/creditOffers/' + creditOffer.id)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public purchase(creditOffer: CreditOffer, stripeToken: string): Observable<void | Error> {
        return this.http.post(this.configuration.baseUrl + '/creditOffers/' + creditOffer.id + '/purchase', {stripeToken: stripeToken})
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

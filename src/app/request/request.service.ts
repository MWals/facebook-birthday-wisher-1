import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RequestService {
  constructor(private http: Http) {
  }

  fetchFeatures() {
    return this.http.get('http://kensplanet.com/facebook-birthday-wisher/features');
  }

  postFeature(feature: String) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://kensplanet.com/facebook-birthday-wisher/feature', {
      feature: feature
    }, {headers: headers});
  }
}

import { Component } from '@angular/core';
import {Http, Headers} from 'angular2/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth/auth.service';
import { User } from '../../app/app.component';
import 'rxjs/add/operator/map';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  API: string = "https://tinytaskrest.herokuapp.com/users";
  error: string;
  auth: AuthService;
  constructor(
    public navCtrl: NavController,
    //private http: Http,
    private authHttp: AuthHttp,
    private headers = new Headers(
      {'Content-Type': 'application/json'}),

  ){}

  getUser(id: number) :Promise<User> {
      const url = `${this.API}/${id}`;
    return this.authHttp.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }

}

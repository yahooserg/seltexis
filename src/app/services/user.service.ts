import { Component, OnInit } from '@angular/core';

import { MyCookieService } from './my-cookie.service';
import { ServerService } from './server.service';
import { CompanyService } from './company.service'
import {
  ActivatedRoute,
  Router
} from '@angular/router';

interface Right {
  companyId: number,
  rights: number[]
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  token: number,
  authenticated: boolean,
  rights: Right[]
}

@Component({
})
export class UserService {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    token: 0,
    authenticated: false,
    rights: []
  };
  tempUser: any;
  constructor(
    private myCookieService: MyCookieService,
    private serverService: ServerService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tempUser = this.myCookieService.getUser();
    if (this.tempUser) {
      this.user = this.tempUser;
    }
    this.user.authenticated = false;
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn() {
    this.serverService.checkUserLoggedIn(this.user, this.companyService.company)
      .subscribe(
      (response) => {
        console.log(response);
        if (response.error || response.items.FALSE === 0) {
          this.user.authenticated = false;
          this.router.navigate([`/${this.companyService.company.name}/login`]);

        } else {
          this.user.authenticated = true;
          this.router.navigate([`/${this.companyService.company.name}`]);
        }
      },
      (error) => {
        console.log("Error: " + error);
        this.user.authenticated = false;
        this.router.navigate([`/${this.companyService.company.name}/login`]);
      }
      );
  }

  saveUserCookie() {
    this.myCookieService.putUser(this.user)
  }

}

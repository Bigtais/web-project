import { SignUp } from "../models/signup.model";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })

export class AuthService {
  isAuth = false;
  constructor(private httpService: HttpService) { };

  async signIn(signup: SignUp) {

    return await firstValueFrom(this.httpService.login(signup)).then((response) => {
      if (response.status != 200) {
        alert("Login incorrect");
      }
      else {
        alert("Login réussi");
        this.isAuth = true;
      }
    });

  }

  // .subscribe((response) => {
  //   if (response.status != 200) {
  //     alert("Login incorrect");
  //   }
  //   else {
  //     alert("Login accepté");
  //     this.isAuth = true;
  //   }
  // })

  signOut() {
    this.isAuth = false;
  }

}

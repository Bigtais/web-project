import { SignUp } from "../models/signup.model";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })

export class RegisterService {
  isAuth = false;
  constructor(private httpService: HttpService) { };

  register(signup: SignUp) {
    this.httpService.register(signup).subscribe((response) => {
      if (response.status !== 200) {
        alert("Ce nom est déjà utilisé");
      }
      else {
        alert("Compte créé avec succès");
      }
    }, (e) => {
      console.log('Erreur : ', e);
    }, () => { }
    );
  }
}

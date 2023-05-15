import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../models/user";


@Injectable({
    providedIn: 'root'
})

export class OrganizerAdminGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user : User = JSON.parse(localStorage.getItem("logged"));

        if(user.type == 1){
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true;
        }
    }

}
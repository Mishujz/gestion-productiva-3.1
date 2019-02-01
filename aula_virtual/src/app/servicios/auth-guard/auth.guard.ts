import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.afAuth.authState.pipe(take(1),
      map(authState => !! authState)
      ,tap(logado => {
        if(!logado){
          this.router.navigate(['/login']);
        }
      })
    );
  }
}

import {Injectable} from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import {AuthService} from '@core/http';

@Injectable({
	providedIn: 'root'
})
export class PagesGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (this.authService.isAuthenticated()) {
			if (state.url === '/auth/logout') {
				return true;
			} else {
				this.router.navigate(['']);
				return false;
			}
		}
		return true;
	}
}

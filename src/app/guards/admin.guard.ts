import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token');
  const jwtHelper = new JwtHelperService();

  if (token && !jwtHelper.isTokenExpired(token)) {
    const decodedToken = jwtHelper.decodeToken(token);
    const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (Array.isArray(roles) && roles.includes('Admin')) {
      return true;
    } else if (roles === 'Admin') {
      return true;
    }
  }

  window.alert('Access denied. Admins only.');
  return false;
};


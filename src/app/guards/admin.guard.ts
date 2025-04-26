import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token');
  const jwtHelper = new JwtHelperService();

  if (token && !jwtHelper.isTokenExpired(token)) {
    const decodedToken = jwtHelper.decodeToken(token);
    const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const isAdmin = Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin';
    const isSeller = Array.isArray(roles) ? roles.includes('Seller') : roles === 'Seller';

    // لو الصفحة اللي بيحاول يفتحها هي add-product-seller
    if (state.url.includes('add-product-seller')) {
      if (isSeller) {
        return true;
      } else {
        window.alert('Access denied. Only Sellers can access this page.');
        return false;
      }
    }

    // باقي الصفحات مسموح بيها للـ Admin فقط
    if (isAdmin) {
      return true;
    }
  }

  window.alert('Access denied.');
  return false;
};

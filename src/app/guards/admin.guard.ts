import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  
  if (role === 'Admin') {
    return true;
  } else {
    // هنا ممكن تضيفي redirect لو حابة
    window.alert('Access denied. Admins only.');
    return false;
  }
};


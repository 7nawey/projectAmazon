import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';


@Component({
  selector: 'app-user-list',
  imports: [RouterLink, CommonModule,ConfirmDeleteModalComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  totalCount = 1;
  totalPages = 4;
  currentPage = 1;
  pageSize = 8;
  pageNumbers: number[] = [];
  roles: any[] = [];
  selectedUser: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (error) => {
        console.error('Error :', error);
      }
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  loadRoles() {
    this.userService.getAllRoles().subscribe({
      next: (response) => {
        this.roles = response;
        console.log('Roles:', this.roles);
      },
      error: (error) => {
        console.error('Failed to update:', error);
      }
    });
  }

  deleteUser(user: any) {
    console.log('Selected user:', user);
    console.log('user ID:', user?.id);
  
    if (!user?.id) {
      console.error('user ID is undefined!');
      return;
    }
  
    Swal.fire({
      title: '  Are you sure?',
      text: 'You can not restore user again!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes,Delete!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe({
          next: (res: any) => {
            const message = typeof res === 'string' ? res : res?.message || 'User deleted successfully!'; 
            Swal.fire(' Done!', message, 'success');
            this.loadUsers();
          },
          error: (err) => {
            const errorMsg = err?.error?.message || err?.error || 'Error while deleting.';
            Swal.fire('Erroe!', errorMsg, 'error');
            console.error(' Error while deleting :', err);
          }
        });
      }
    });
  }
  
}

// export class UserListComponent implements OnInit {
//   users: any[] = [];
//   totalCount = 1;
//   totalPages = 4;
//   currentPage = 1;
//   pageSize = 8;
//   pageNumbers: number[] = [];
//   roles: any[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     this.loadUsers();
//     this.loadRoles();
//   }

//   loadUsers() {
//     this.userService.getUsers(this.currentPage, this.pageSize).subscribe(response => {
//       this.users = response.data;
//       this.totalCount = response.totalCount;
//       this.totalPages = response.totalPages;
//       this.currentPage = response.currentPage;

//       this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
//     });
//   }

//   changePage(page: number) {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.loadUsers();
//     }
//   }

//   loadRoles() {
//     this.userService.getAllRoles().subscribe({
//       next: (response) => {
//         this.roles = response;
//         console.log('Roles:', this.roles);
//       },
//       error: (error) => {
//         console.error('Failed to load roles:', error);
//       }
//     });
// }
// onDeleteRole(id: string) {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You will not be able to recover this user!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, delete it!',
//     cancelButtonText: 'No, cancel!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.userService.deleteUser(id).subscribe({
//         next: (response) => {
//           Swal.fire('Deleted!', 'User has been deleted.', 'success');
//           this.loadUsers(); // إعادة تحميل قائمة المستخدمين بعد الحذف
//         },
//         error: (error) => {
//           Swal.fire('Error', 'Failed to delete user.', 'error');
//         }
//       });
//     }
//   });
// }
// onDeleteRole(roleId: string) {
//   this.userService.deleteUser(roleId).subscribe({
//     next: () => {
//       console.log('Role deleted');
//       // Refresh or reload roles
//     },
//     error: (err) => {
//       console.error('Delete failed:', err);
//     }
//   });

//  selectedUser!: any;

// setUserToDelete(user: any) {
//   this.selectedUser = user;
// }

// deleteUser(user: any) {
//   console.log('Selected user:', user);        
//   console.log('user ID:', user?.id);         

//   if (!user?.id) {
//     console.error('user ID is undefined!');
//     return;
//   }

//   this.userService.deleteUser(user.id).subscribe({
//     next: (res) => {
//       alert(res); // أو console.log(res)
//       this.loadUsers(); // لو بتجدد الليستة بعد الحذف
//     },
//     error: (err) => {
//       console.error('خطأ أثناء الحذف:', err);
//     }
//   });

// }}
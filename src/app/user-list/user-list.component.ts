import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';


@Component({
  selector: 'app-user-list',
  imports: [RouterLink, CommonModule,NavDashbordComponent],
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
      title: 'Are you sure?',
      text: 'You can not restore this user again!',
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
            Swal.fire('Error!', errorMsg, 'error');
            console.error(' Error while deleting :', err);
          }
        });
      }
    });
  }
  
}

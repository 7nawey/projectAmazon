import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UpdateUserComponent implements OnInit {
  UpdateUserForm: FormGroup;
  roles: any[] = [];
  currentRole!: string;
  selectedRoleId: string = ''; 

  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.UpdateUserForm = this.formbuilder.group({
      UserName: [{ value: '', disabled: true }],
      Role: ['', Validators.required],
      Id: ['', Validators.required]
    });
  }

  get formControls() {
    return this.UpdateUserForm.controls;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        console.error('ID parameter is missing!');
        return;
      }

      this.userService.getUserById(id).subscribe(data => {
        this.UpdateUserForm.patchValue({
          UserName: data.userName,
          Id: data.id,
          Role: data.roleName
        });

        this.currentRole = data.roleName;
      });
    });

    this.loadRoles();
  }

  loadRoles() {
    this.userService.getAllRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (error) => {
        console.error('Failed to load roles:', error);
      }
    });
  }
  onRoleChange(event: any) {
    const selectedRole = event.target.value;
    const selectedRoleObj = this.roles.find(role => role.name === selectedRole);
    if (selectedRoleObj) {
      this.selectedRoleId = selectedRoleObj.id;
    }
  }
  handleUpdateUserForm() {
    if (this.UpdateUserForm.valid) {
      const formValue = this.UpdateUserForm.getRawValue(); 
  
      const updateDTO = {
        id: formValue.Id,
        roleName: formValue.Role,
        roleId: this.selectedRoleId 
      };
  
      console.log("Sending data:", updateDTO);
  
      this.userService.updateUserRole(updateDTO).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/UserList']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Something went wrong!', 
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }}
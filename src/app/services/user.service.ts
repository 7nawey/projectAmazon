import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7105/api/Roles';
  constructor(private http: HttpClient) { }
  getUsers(page: number, pageSize: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  
    return this.http.get<{
      data: any[],
      totalCount: number,
      totalPages: number,
      currentPage: number
    }>(`${this.baseUrl}/GetAllUsers`, { params });
  }
 
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetById/${id}`);
  }
  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/GetAllRoles`);
  }

  updateUserRole(updateDTO: { id: string, roleName: string, roleId: string }): Observable<any> {
    const url = `${this.baseUrl}/UpdateRole/${updateDTO.id}`; 
    return this.http.put<any>(url, updateDTO); 
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/DeleteUser/${id}`);
  }
}
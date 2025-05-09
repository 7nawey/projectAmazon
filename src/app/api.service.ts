import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from './types/category';
// import { Category } from './types/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://kashef.runasp.net/api';

  constructor(private http: HttpClient) {}

  getAllProducts(page: number = 1, pageSize: number = 83): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any[]>(`${this.baseUrl}/Product/GetAllProducts`, { params });
  }
  getAllProductsFashoin(page: number = 15, pageSize: number = 8): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any[]>(`${this.baseUrl}/Product/GetAllProducts`, { params });
  }
  getProductByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/GetByName/${name}`);
  } 

  getAllSubGrocery(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/SubCategory/GetByCategory/Grocery`);
  }
  getSubCategories(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.baseUrl}/SubCategory/GetAllSubCategoriesPagination`, { params });
  }
  getCategoriesPagination(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.baseUrl}/Category/GetAllCategoriesPagination`, { params });
  }
  getmeats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/meats`);
  }
  getfruits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/veges & fruits`);
  }
  getcanned(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/canned`);
  }
  getdrinks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/drinks`);
  }
  getMen(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/men`);
  }
  getWomen(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByName/women`);
  }
  getChildren(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/childern`);
  }
  getKitchen(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/kitchen`);
  }
  getBed(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/bed`);
  }
  getLiving(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/living%20room`);
  }
  getLaptop(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/laptop`);
  }
  getPhones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/phones`);
  }
  getSkincare(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/skincare`);
  }
  getMakeup(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/makup`);
  }
  getPerfume(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/perfums`);
  }
  getJewelry(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/jewullary`);
  }
  getBodycare(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/bodycare`);
  }
  getFootball(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/football`);
  }
  getGym(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/GYM`);
  }
  getBasketball(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/basketball`);
  }
  getScreen(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/screens & printers`);
  }
  getaccesories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetBySubCategory/accesories & other`);
  }
  getElectroniccategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/electronic`);
  }
  getFashoincategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Fashion`);
  }
  getToys(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Toys & Games`);
  }
  getBook(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Books`);
  }
  getHomecategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Home`);
  }
  getGrocerycategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Grocery`);
  }
  getBeautycategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Beauty & Personal Care`);
  }
  getSportscategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product/GetByCategory/Sports & Outdoors`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/${id}`);
  }

  getUsersCount():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Roles/UsersCount`)
  }

  getProductsCount():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Product/ProductsCount`)
  }

  getsubCatagoriesCount():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/SubCategory/SubcategoriesCount`)
  }
  getCategoriesCount():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Category/CategoriesCount`)
  }
  getAllCategories():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Category/GetAllCategories`)
  }
  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Category`, category);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`https://kashef.runasp.net/api/Category/${id}`);
  }
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Category/GetById/${id}`);
  }  
  updateCategory(id: number, updatedCategory: Category): Observable<any> {
    // const url = `https://kashef.runasp.net/api/Category/UpdateCategory/${id}`;
    return this.http.put(`https://kashef.runasp.net/api/Category/UpdateCategory/${id}`, updatedCategory);
  }
  getProducts(page: number, pageSize: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
  
    return this.http.get<any>('https://kashef.runasp.net/api/Product/GetAllProductsPagination', { params });
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/Product`, {
      params: { id: id.toString() }
    });
  }
  
  updateProduct(formData: any, productID: number): Observable<any> {
    
    return this.http.put(`${this.baseUrl}/Product/UpdateProduct/${productID}`, formData);
  }

  getAllSubcategories():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/SubCategory/GetAllSubCategories`)
  }
  AddSubcategory(subcategory: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/SubCategory`, subcategory);
  }
  getsubcategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/SubCategory/${id}`);
  } 
  updatesubcategory(id: any, updatedsubcategory: any): Observable<any> {
    return this.http.put(`https://kashef.runasp.net/api/SubCategory/UpdateSubcategory/${id}`, updatedsubcategory);
  } 
  deleteSubategory(id: number): Observable<any> {
    return this.http.delete(`https://kashef.runasp.net/api/SubCategory/${id}`);
  }
  searchProducts(term: string) {
    return this.http.get<any[]>(`https://kashef.runasp.net/api/Product/Search/${term}`);
  }
  getCategoriesAndSubCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/GetCategoriesAndSubCategories`);
  }

  
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Product`, product);
  }
}

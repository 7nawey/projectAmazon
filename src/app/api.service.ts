import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7105/api';

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

}

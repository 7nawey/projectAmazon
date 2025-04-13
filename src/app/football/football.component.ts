import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubSportsComponent } from '../sub-sports/sub-sports.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-football',
  imports: [SubSportsComponent,ProductsComponent],
  templateUrl: './football.component.html',
  styleUrl: './football.component.css'
})
export class FootballComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getFootball().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}

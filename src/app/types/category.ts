export interface Category {
    categoryID: number;
  categoryName: string;
  categoryImg: string;
  description: string;
}
export interface Product {
  productID: number;
  name: string;
  price: number;
  descreption: string;
  stockQuantity: number;
  // باقي الخصائص حسب اللي بيرجعه الـ API
}

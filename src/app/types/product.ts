// product.interface.ts
export interface Product {
    productID: number;
    name: string;
    price: number;
    priceAfterDiscount: number;
    descreption: string;
    stockQuantity: number;
    rating: number;
    imgCover: string;
    categoryID: number;          
    sub_categoryID: number;  
    subCategoryName: string;
    productImages: { imageURL: string; isPrimary: boolean }[];
  }
  
export  interface productImages {
  imageURL: string;
  isPrimary: boolean;
  imageID: number;
  }
  
  
  
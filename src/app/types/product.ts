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
    sellerName: string;
    subCategoryName: string;
    productImages: { imageURL: string; isPrimary: boolean }[];
  }
  
  interface ProductImage {
    imageURL: string;
    isPrimary: boolean;
  }
  
  
  
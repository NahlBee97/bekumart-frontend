export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  productPhotos: IProductPhoto[];
  category: ICategory;
  stock: number;
  weightInKg: number;
  rating: number;
  sale: number;
  updatedAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}

export interface IProductPhoto {
  id: string;
  productId: string;
  imageUrl: string;
  isDefault: boolean;
  updatedAt: Date;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ICategory;
  stock: number;
  weightInKg: number;
  rating: number;
  updatedAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
}

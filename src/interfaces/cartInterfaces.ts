import { IProduct } from "./productInterfaces";

export interface ICartItem {
  id: string;
  cartId: string;
  product: IProduct;
  quantity: number;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

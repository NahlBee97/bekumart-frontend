import { IUser } from "./authInterfaces";
import { IProduct } from "./productInterfaces";

export type orderStatuses =
  | "PENDING"
  | "PROCESSING"
  | "READY_FOR_PICKUP"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELLED";

export interface IOrder {
  id: string;
  userId: string;
  user: IUser;
  totalAmount: number;
  totalWeight: number;
  status: orderStatuses
  fulfillmentType: "DELIVERY" | "PICKUP";
  paymentMethod: "ONLINE" | "INSTORE";
  addressId: string | null;
  courier: string | null;
  createdAt: string;
  updateAt: string;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  product: IProduct;
  quantity: number;
  priceAtPurchase: number;
}

import { IProduct } from "./productInterfaces";

export interface IOrder {
  id: string;
  userId: string;
  totalAmount: number;
  totalWeight: number;
  status:
    | "PENDING"
    | "PROCESSING"
    | "READY_FOR_PICKUP"
    | "OUT_FOR_DELIVERY"
    | "COMPLETED"
    | "CANCELLED";
  fulfillmentType: "DELIVERY" | "PICKUP";
  paymentMethod: "ONLINE" | "INSTORE";
  addressId: string | null;
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

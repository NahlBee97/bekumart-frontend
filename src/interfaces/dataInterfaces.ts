import {
  UserRoles,
  OrderStatuses,
  FulfillmentTypes,
  PaymentMethod,
} from "./enums";

export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string; // Often omitted from client-side interfaces
  imageUrl: string;
  isVerified: boolean;
  role: UserRoles;
}

export interface IAddress {
  id: string;
  receiver: string;
  userId: string;
  street: string;
  subdistrict: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weightInKg: number;
  sale: number;
  rating: number;
  category: ICategory;
  productPhotos: IProductPhoto[];
  reviews: IReview[];
}

export interface IProductPhoto {
  id: string;
  productId: string;
  product: IProduct;
  imageUrl: string;
  isDefault: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  totalWeight: number;
}

export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  id: string;
  userId: string;
  user: IUser;
  items: IOrderItem[];
  totalAmount: number;
  totalWeight: number;
  status: OrderStatuses;
  fulfillmentType: FulfillmentTypes;
  courier: string;
  paymentMethod: PaymentMethod;
  addressId: string;
  createdAt: Date;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: IProduct;
  quantity: number;
  priceAtPurchase: number;
  createdAt: Date;
}

export interface IReview {
  id: string;
  userId: string;
  user: IUser;
  productId: string;
  desc: string;
  rating: number;
  likeCount: number;
  reviewPhotos: IReviewPhoto[];
  createdAt: Date;
}

export interface IReviewPhoto {
  id: string;
  reviewId: string;
  imageUrl: string;
}

export interface ISalesSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  chartData: {
    name: Date;
    Revenue: number;
  }[];
}

export interface IProductInsights {
  bestSellers: { name: string; quantitySold: number }[];
  lowStockProducts: { name: string; stock: number }[];
}

export interface IReviewLike {
  id: string;
  userId: string;
  user: IUser;
  reviewId: string;
}

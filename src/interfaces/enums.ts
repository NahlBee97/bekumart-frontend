export enum UserRoles {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export enum OrderStatuses {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum FulfillmentTypes {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

export enum PaymentMethod {
  ONLINE = "ONLINE",
  INSTORE = "INSTORE",
}

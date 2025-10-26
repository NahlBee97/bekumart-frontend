import { ICartItem, IProductPhoto } from "@/interfaces/dataInterfaces";

export const CartItem = ({ item }: { item: ICartItem }) => {
  const defaultImage = item.product.productPhotos.find(
    (photo: IProductPhoto) => photo.isDefault
  )?.imageUrl;

  return (
    <li className="flex py-6">
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line */}
        <img
          src={defaultImage}
          alt={`Image of ${item.product.name}`}
          className="h-24 w-24 rounded-md border border-gray-300 object-cover object-center sm:h-32 sm:w-32"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900">
            {item.product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Berat: {item.product.weightInKg} kg
          </p>
        </div>
        <div className="flex items-end justify-between text-sm">
          <p className="text-gray-700">Jumlah {item.quantity}</p>
          <p className="font-medium text-gray-900">
            Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </li>
  );
};

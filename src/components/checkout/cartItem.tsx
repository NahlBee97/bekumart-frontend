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
          className="h-24 w-24 rounded-xl object-cover object-center sm:h-32 sm:w-32 bg-mist"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-base font-medium text-ink">
            {item.product.name}
          </h3>
          <p className="mt-1 text-sm text-fog">
            Berat: {item.product.weightInKg} kg
          </p>
        </div>
        <div className="flex items-end justify-between text-sm">
          <p className="text-fog">Jumlah {item.quantity}</p>
          <p className="font-mono font-medium text-ink">
            Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </li>
  );
};

import { IAddress } from "@/interfaces/dataInterfaces";
import { Edit3, MapPin, Trash2 } from "lucide-react";

interface props {
    address: IAddress
    onClickSetMain: () => void;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export const AddressCard = ({address, onClickSetMain, onClickEdit, onClickDelete}: props) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex items-start gap-3">
        <MapPin className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-gray-900">{address.receiver}</p>
          <p className=" text-gray-500">{address.street}</p>
          <p className="text-gray-500">
            {address.subdistrict}, {address.district}, {address.postalCode}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 self-end sm:self-center">
        {address.isDefault && (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Utama
          </span>
        )}
        {!address.isDefault && (
          <button
            onClick={onClickSetMain}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Jadikan Alamat Utama
          </button>
        )}
        <button
          className="p-1 text-gray-500 hover:text-blue-600"
          onClick={onClickEdit}
        >
          <Edit3 className="h-4 w-4" />
        </button>
        <button
          onClick={onClickDelete}
          className="p-1 text-gray-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

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
        <div className="bg-frost-light rounded-full p-2 flex-shrink-0">
          <MapPin className="h-4 w-4 text-frost-deep" />
        </div>
        <div className="text-sm">
          <p className="font-medium text-ink">{address.receiver}</p>
          <p className="text-fog">{address.street}</p>
          <p className="text-fog">
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
            className="text-sm font-medium text-frost-deep hover:text-frost transition-colors"
          >
            Jadikan Alamat Utama
          </button>
        )}
        <button
          className="p-1.5 rounded-full text-fog hover:text-frost-deep hover:bg-frost-light/60 transition-colors"
          onClick={onClickEdit}
        >
          <Edit3 className="h-4 w-4" />
        </button>
        <button
          onClick={onClickDelete}
          className="p-1.5 rounded-full text-fog hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

import { IProductPhoto, IReviewPhoto } from "@/interfaces/dataInterfaces";
import { Star, Trash2, UploadCloud } from "lucide-react";

interface props {
  photo: IProductPhoto | IReviewPhoto;
  isMain: boolean;
  onSetMain: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PhotoThumbnail = ({
  photo,
  isMain,
  onSetMain,
  onUpdate,
  onDelete,
}:props ) => (
  <div className="relative group aspect-square">
    {/* eslint-disable-next-line */}
    <img
      src={photo.imageUrl}
      alt={`Foto produk ${photo.id}`}
      className="w-full h-full object-cover rounded-lg shadow-md"
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://placehold.co/400x400/CCCCCC/FFFFFF?text=Gagal+Muat";
      }}
    />
    {isMain && (
      <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1 rounded-full shadow-lg">
        <Star className="h-4 w-4" />
      </div>
    )}
    <div className="absolute inset-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg flex justify-center items-center space-x-2">
      <button
        title="Jadikan Foto Utama"
        onClick={() => onSetMain(photo.id)}
        className={`p-2 bg-white rounded-full text-gray-700 hover:bg-yellow-400 hover:text-white transform scale-0 group-hover:scale-100 transition-transform duration-200 ${
          isMain ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isMain}
      >
        <Star className="h-5 w-5" />
      </button>
      <button
        title="Ganti Foto"
        onClick={() => onUpdate(photo.id)}
        className="p-2 bg-white rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transform scale-0 group-hover:scale-100 transition-transform duration-200 delay-75"
      >
        <UploadCloud className="h-5 w-5" />
      </button>
      <button
        title="Hapus Foto"
        onClick={() => onDelete(photo.id)}
        className="p-2 bg-white rounded-full text-gray-700 hover:bg-red-500 hover:text-white transform scale-0 group-hover:scale-100 transition-transform duration-200 delay-150"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  </div>
);
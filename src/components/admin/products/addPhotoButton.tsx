import { Plus } from "lucide-react";

const AddPhotoButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative group aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
  >
    <Plus className="h-10 w-10 group-hover:scale-110 transition-transform" />
    <span className="text-sm mt-2 font-semibold">Tambah Foto</span>
  </button>
);

export default AddPhotoButton;
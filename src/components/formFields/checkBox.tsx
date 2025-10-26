interface props {
  isChecked: boolean;
  onChecked: () => void;
  label:string;
}

export const CheckBox = ({ isChecked, onChecked, label }: props) => {
  return (
    <>
      <input
        className="mt-2 h-2"
        type="checkbox"
        checked={isChecked}
        onChange={onChecked}
      />{" "}
      <label className="text-gray-600 text-xs">{label}</label>
    </>
  );
};

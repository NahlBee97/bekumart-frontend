interface props {
  isChecked: boolean;
  onChecked: () => void;
  label:string;
}

export const CheckBox = ({ isChecked, onChecked, label }: props) => {
  return (
    <>
      <input
        className="mt-2 h-3.5 w-3.5 accent-frost cursor-pointer"
        type="checkbox"
        checked={isChecked}
        onChange={onChecked}
      />{" "}
      <label className="text-fog text-xs">{label}</label>
    </>
  );
};

import { GoogleIcon } from "../icons";

interface props {
    onLogin: () => void;
    buttonText: string;
}

export const GoogleButton = ({onLogin, buttonText}: props) => {
  return (
    <button
      type="button"
      onClick={onLogin}
      className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
    >
      <GoogleIcon />
      {buttonText}
    </button>
  );
}

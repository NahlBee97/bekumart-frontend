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
      className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-full bg-white text-ink/80 font-semibold hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300 transition-all duration-200"
    >
      <GoogleIcon />
      {buttonText}
    </button>
  );
}

interface props {
  // eslint-disable-next-line
  formik: any;
  buttonText: string;
}

export const SubmitButton = ({ formik, buttonText }: props) => {
  return (
    <button
      type="submit"
      disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
      className="w-full flex items-center justify-center py-3 px-4 bg-frost text-white font-semibold rounded-full shadow-sm hover:bg-frost-deep hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-frost transition-all duration-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
    >
      {formik.isSubmitting ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/40 border-t-white"></div>
      ) : (
        buttonText
      )}
    </button>
  );
};

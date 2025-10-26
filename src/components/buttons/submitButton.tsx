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
      className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {formik.isSubmitting ? (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default function EmptyState() {
    return (
    <div className="text-center py-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        Belum Ada Pesanan
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Sepertinya Anda belum pernah berbelanja.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => (window.location.href = "/shop")}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Mulai Belanja
        </button>
      </div>
    </div>
  );
}
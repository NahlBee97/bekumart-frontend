import { useRouter } from "next/navigation";
import { CommonButton } from "@/components/buttons/commonButton";

export const EmptyState = () => {
  const router = useRouter();
    return (
      <div className="flex flex-col justify-center items-center text-center py-16">
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
        <div className="mt-6 w-44">
          <CommonButton onClick={() => router.push("/shop")} buttonText="Mulai Belanja" isDisable={false} />
        </div>
      </div>
    );
}
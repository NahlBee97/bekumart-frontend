"use client";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
}

export function LoadingModal({ isOpen, title }: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/50 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl">
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
              <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
            </div>
            {/* Content */}
            <div className="mt-3 text-center">
              <h3
                className="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

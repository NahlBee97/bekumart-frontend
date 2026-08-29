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
      <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="frost-glass-light flex flex-col items-center justify-center p-6 rounded-2xl animate-fade-up">
            {/* Icon */}
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-4 border-frost-light"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-frost animate-spin"></div>
            </div>
            {/* Content */}
            <div className="mt-3 text-center">
              <h3
                className="text-base font-semibold leading-6 text-ink"
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

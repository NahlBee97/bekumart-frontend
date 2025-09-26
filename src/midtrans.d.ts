// In: src/types/midtrans.d.ts

// Define the structure of the callback result objects
interface MidtransTransactionResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  pdf_url?: string;
  finish_redirect_url?: string;
}

// Define the structure of the snap object
interface MidtransSnap {
  pay: (
    transactionToken: string,
    options?: {
      onSuccess?: (result: MidtransTransactionResult) => void;
      onPending?: (result: MidtransTransactionResult) => void;
      //   eslint-disable-next-line
      onError?: (result: any) => void; // Error result can be complex
      onClose?: () => void;
    }
  ) => void;
}

// Use 'declare global' to merge the declaration with the global scope
declare global {
  interface Window {
    snap?: MidtransSnap; // Use '?' to indicate it might not be loaded yet
  }
}

// Add an empty export to treat this file as a module
export {};

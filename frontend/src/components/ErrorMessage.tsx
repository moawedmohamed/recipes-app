import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-red-50 border border-red-200 rounded-xl shadow-md p-6 animate-fadeIn">
      {/* Icon */}
      <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4 shadow-inner">
        <FaExclamationTriangle className="w-8 h-8" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-red-700">
        Something went wrong
      </h2>

      {/* Message */}
      <p className="text-gray-700 mt-2 max-w-md text-center">{message}</p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 px-6 py-2 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 transition-all"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

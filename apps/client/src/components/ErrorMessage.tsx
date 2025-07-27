interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}

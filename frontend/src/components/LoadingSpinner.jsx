function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      
      {/* Spinning circle */}
      <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
      
      {/* Text below spinner */}
      <p className="text-gray-400 mt-4 text-sm">
        AI is reviewing your code...
      </p>

    </div>
  );
}

export default LoadingSpinner;
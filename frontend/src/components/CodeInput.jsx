function CodeInput({ code, setCode, onSubmit, loading }) {
  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">AI Code Review Bot 🤖</h1>
        <p className="text-gray-400">Paste your code and get instant AI-powered feedback</p>
      </div>

      {/* Code Textarea */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm font-medium mb-2 block">
          Your Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          rows={15}
          className="w-full bg-gray-800 text-green-400 border border-gray-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
        {/* Character count */}
        <p className="text-gray-500 text-xs mt-1 text-right">
          {code.length} characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={loading || !code.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        {loading ? "Reviewing..." : "Review My Code"}
      </button>

    </div>
  );
}

export default CodeInput;
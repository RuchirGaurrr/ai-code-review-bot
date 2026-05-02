import { useRef, useEffect, useState } from "react"

function CodeInput({ code, setCode, onSubmit, loading }) {
  const textareaRef = useRef(null)

  const loadingMessages = [
    "Analyzing your code...",
    "Detecting bugs...",
    "Checking best practices...",
    "Generating review...",
  ]
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])

  // Auto resize on every code change
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [code])

  // Cycle loading messages
  useEffect(() => {
    if (!loading) {
      setLoadingMessage(loadingMessages[0])
      return
    }
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length
      setLoadingMessage(loadingMessages[index])
    }, 1500)
    return () => clearInterval(interval)
  }, [loading])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      onSubmit()
    }
  }

  const lineCount = code.split("\n").length

  return (
    <div className="w-full max-w-xl mx-auto">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">AI Code Review Bot 🤖</h1>
        <p className="text-gray-400 text-sm">Paste your code and get instant AI-powered feedback</p>
      </div>

      {/* Floating Input Box */}
      <div className="bg-[#2b2b2b] rounded-2xl border border-[#3a3a3a] shadow-2xl p-4">

        {/* Textarea — auto expanding */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            if (e.target.value.length <= 5000) {
              setCode(e.target.value)
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Paste your code here..."
          style={{ minHeight: "60px", maxHeight: "400px", overflowY: "auto" }}
          className="w-full bg-transparent text-gray-200 placeholder-gray-500 font-mono text-sm focus:outline-none resize-none leading-relaxed"
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#3a3a3a]">

          {/* Line count + character warning */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs">
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </span>
            {code.length > 4000 && (
              <span className="text-yellow-500 text-xs">
                {5000 - code.length} characters remaining
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Ctrl+Enter hint */}
            {!loading && (
              <span className="text-gray-600 text-xs">Ctrl + Enter to review</span>
            )}

            {/* Submit button */}
            <button
              onClick={onSubmit}
              disabled={loading || !code.trim()}
              className="bg-white hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold text-sm px-4 py-1.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin"></div>
                  {loadingMessage}
                </>
              ) : (
                <>
                  Review
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center text-gray-600 text-xs mt-3">
        Supports Python, JavaScript, and more
      </p>

    </div>
  )
}

export default CodeInput
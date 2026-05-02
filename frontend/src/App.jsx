import { useState, useRef } from "react"
import CodeInput from "./components/CodeInput"
import ReviewDisplay from "./components/ReviewDisplay"
import { getCodeReview } from "./api/api"

function App() {
  const [code, setCode] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const reviewRef = useRef(null)

  const handleSubmit = async () => {
    setError("")
    setReview("")

    if (!code.trim()) {
      setError("Please paste some code before reviewing!")
      return
    }

    setLoading(true)
    try {
      const data = await getCodeReview(code)
      setReview(data.review)
      // Scroll to review after it loads
      setTimeout(() => {
        reviewRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setCode("")
    setReview("")
    setError("")
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-[#1f1b0a] to-[#121212] px-4">

      <div className="flex flex-col items-center justify-center min-h-screen gap-8">

        {/* Code Input */}
        <CodeInput
          code={code}
          setCode={setCode}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-xl">
            <p className="text-red-400 bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* New Review Button + Review Display */}
        {review && (
          <>
            {/* New Review Button */}
            <div className="w-full max-w-xl flex justify-end">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
                </svg>
                New Review
              </button>
            </div>

            {/* Review Display */}
            <div ref={reviewRef} className="w-full max-w-xl">
              <ReviewDisplay review={review} />
            </div>
          </>
        )}

      </div>

    </div>
  )
}

export default App
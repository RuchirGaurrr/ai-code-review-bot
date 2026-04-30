import { useState } from "react"
import CodeInput from "./components/CodeInput"
import ReviewDisplay from "./components/ReviewDisplay"
import { getCodeReview } from "./api/api"

function App() {
  const [code, setCode] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setError("")
    setReview("")

    // Only check if completely empty
    if (!code.trim()) {
      setError("Please paste some code before reviewing!")
      return
    }

    setLoading(true)
    try {
      const data = await getCodeReview(code)
      setReview(data.review)
    } catch (err) {
      setError("Something went wrong. Is your backend running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-[#1f1b0a] to-[#121212] px-4">

      {/* Centered layout */}
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

        {/* Review Display */}
        {review && <ReviewDisplay review={review} />}

      </div>

    </div>
  )
}

export default App
import { useState } from "react"
import CodeInput from "./components/CodeInput"
import ReviewDisplay from "./components/ReviewDisplay"
import LoadingSpinner from "./components/LoadingSpinner"
import { getCodeReview } from "./api/api"

function App() {
  // State variables
  const [code, setCode] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    // Clear previous results
    setError("")
    setReview("")
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
    <div className="min-h-screen bg-gray-900 px-4 py-10">

      {/* Code Input Section */}
      <CodeInput
        code={code}
        setCode={setCode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-3xl mx-auto mt-6">
          <p className="text-red-400 bg-red-900/30 border border-red-700 rounded-lg px-4 py-3">
            {error}
          </p>
        </div>
      )}

      {/* Review Display */}
      {review && <ReviewDisplay review={review}/>}

    </div>
  )
}

export default App
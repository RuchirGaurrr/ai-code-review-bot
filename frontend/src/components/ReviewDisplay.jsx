import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react"

// Reusable Copy Button
function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-150"
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

// Code Block — Claude style, standalone box
function CodeBlock({ language, children }) {
  const code = String(children).replace(/\n$/, "")
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="my-4 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900"
      onMouseEnter={(e) => {
        e.stopPropagation() // prevent bubbling to review div
        setIsHovered(true)
      }}
      onMouseLeave={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
    >
      {/* Top bar — no border line, language always visible, copy on hover */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900">
        <span className="text-gray-400 text-xs font-mono">{language || "code"}</span>
        {/* Always rendered but invisible — prevents hover conflict */}
        <div className={`transition-opacity duration-150 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <CopyButton textToCopy={code} />
        </div>
      </div>

      {/* Syntax highlighted code */}
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language || "text"}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.8rem",
          background: "#18181b",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

function ReviewDisplay({ review }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">AI Review</h2>
      </div>

      {/* Review Content — no outer box, free flowing text */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Copy button for full review — top right, on hover */}
        <div className={`absolute top-0 right-0 transition-opacity duration-150 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <CopyButton textToCopy={review} />
        </div>

        {/* Free flowing markdown text */}
        <div className="text-gray-300 text-sm leading-relaxed prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <CodeBlock language={match[1]}>{children}</CodeBlock>
                ) : (
                  <code className="bg-gray-700 text-green-400 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {review}
          </ReactMarkdown>
        </div>

      </div>

    </div>
  )
}

export default ReviewDisplay
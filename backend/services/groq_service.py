from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def get_code_review(code : str, language : str) -> str:
    prompt = f"""
    You are an expert code reviewer.
    
    First, identify what programming language this code is written in.
    
    Then provide your review in this exact format:
    
    **Language Detected:** <language name>
    
    **1. Bugs or Errors**
    <your feedback>
    
    **2. Code Quality & Best Practices**
    <your feedback>
    
    **3. Performance Improvements**
    <your feedback>
    
    **4. Security Issues**
    <your feedback>
    
    **5. Improved Code**
    Always provide the full improved version of the code below, even if changes are minimal.
    Add a comment on every changed or improved line explaining what was changed and why.
    
```<language>
    <improved code with inline comments on changed lines>
```
    
    **6. Overall Rating**
    <X out of 10 with explanation>
    
    Code to review:
    {code}
    """

    #API call to Groq
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{
            "role": "system",
            "content" : "You are an expert code reviewer. Give clear, structured and helpful feedback."
        },
        {
            "role" : "user",
            "content" : prompt
        }],
        temperature=0.7,
        max_tokens=1024,
    )
    return response.choices[0].message.content
from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def get_code_review(code : str, language : str) -> str:
    prompt = f""""
    You are an expert {language} developer and code reviewer.
    Review the following {language} code and provide feedback on:
    1. Bugs or errors
    2. Code quality and best practices
    3. Performance improvements
    4. Security issues (if any)
    5. Overall rating out of 10

    Be specifi, constructive and beginner-friendly in your feedback.
    code to review:
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
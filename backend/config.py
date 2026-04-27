from dotenv import load_dotenv
import os

# Reads the .env file and loads all variables into the environment
load_dotenv()

# Fetch the Groq API key from environment
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Safety check — clear error if key is missing
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set in your .env file!")
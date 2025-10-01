from flask import Flask, request, jsonify
from google import genai
from flask_cors import CORS
import os

from dotenv import load_dotenv 


load_dotenv() 


GENAI_API_KEY = os.getenv("API_KEY")


if not GENAI_API_KEY:
    raise ValueError("API_KEY not found. Make sure it's set in your .env file.")



app = Flask(__name__)
CORS(app) 

client = genai.Client(api_key=GENAI_API_KEY)

FIXED_SYSTEM_PROMPT = """
You are the **Gemini Style and Tone Assistant**. Your primary function is to help the user draft or refine written content across various formats (essays, professional emails, personal letters, social media captions).

**Core Directives:**
1.  **Context is King:** Analyze the user's input to determine the required tone, target audience, and format (e.g., formal essay, informal email).
2.  **Generate Coherent Prose:** Your response must be a single, fluid block of text that directly addresses the user's prompt. Do not use bullet points or numbered lists unless explicitly requested by the user.
3.  **Refinement:** Prioritize clarity, strong vocabulary, and grammatical correctness. Ensure smooth transitions between ideas.
4.  **No Metacommentary:** Do not include introductory phrases (e.g., "Here is the essay you requested:") or concluding remarks. Deliver the written piece immediately.
5.  **Adapt Tone:** Seamlessly adopt the appropriate tone (professional, conversational, persuasive, narrative) based on the inferred or stated format.
"""

CONFIG_WITH_SYSTEM_PROMPT = {
    'system_instruction': FIXED_SYSTEM_PROMPT
}


@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    
    user_prompt = data.get("prompt", "") 

    if not user_prompt:
        return jsonify({"success": False, "error": "Missing 'prompt' in request data."}), 400

    try:
        
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=user_prompt,
            config=CONFIG_WITH_SYSTEM_PROMPT 
        )
        
        suggestions = response.candidates[0].content.parts[0].text.strip()

       
        return jsonify({"success": True, "suggestions": suggestions.split("\n")})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)

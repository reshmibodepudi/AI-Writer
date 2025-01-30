from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

import os


GENAI_API_KEY = os.getenv("API_KEY")

app = Flask(__name__)
CORS(app)  


genai.configure(api_key=GENAI_API_KEY)

@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get("prompt", "")

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        
        suggestions = response.candidates[0].content.parts[0].text.strip()

        return jsonify({"success": True, "suggestions": suggestions.split("\n")})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os
from pdf_reader import extract_text


app = Flask(__name__)

CORS(app)

load_dotenv()
key = os.getenv("api_key")

client = genai.Client(
    api_key=key
)


pdf_content = ""
@app.route(
    "/upload",
    methods=["POST"]
)

def upload():

    global pdf_content

    file=request.files["pdf"]

    path="uploads/" + file.filename

    file.save(path)

    pdf_content=extract_text(path)

    return jsonify({
        "message":"PDF uploaded"
    })






@app.route(
    "/chat",
    methods=["POST"]
)

def chat():

    data = request.json

    message = data["message"]


    prompt = f"""

    Study notes:

    {pdf_content}


    Question:

    {message}

    Answer using study notes.
"""


    response=client.models.generate_content(model="gemini-2.5-flash",contents=prompt)


    return jsonify({
        "reply": response.text
    })


app.run(debug=True)
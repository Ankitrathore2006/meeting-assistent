from flask import Flask, request, jsonify
from Chatbot import ChatBot
from SpeechToText import SpeechRecognition

app = Flask(__name__)

# -------------------------
# Chat endpoint
# -------------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        query = data.get("message", "")
        if not query:
            return jsonify({"error": "No message provided"}), 400

        reply = ChatBot(query, stream=False)  # Non-stream for API
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------
# Speech-to-text endpoint
# -------------------------
@app.route("/speech-to-text", methods=["GET"])
def speech_to_text():
    try:
        transcript = SpeechRecognition()

        if not transcript:
            return jsonify({"transcript": "", "reply": "Could not understand audio"})

        # 👇 Transcript ko Chatbot ke paas bhejna
        reply = ChatBot(transcript, stream=False)

        return jsonify({"transcript": transcript, "reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------
# Run Flask
# -------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

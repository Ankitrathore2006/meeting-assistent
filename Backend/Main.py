# Main.py
from Chatbot import Chatbot
from SpeechToText import SpeechToText

chatbot = Chatbot()
stt = SpeechToText()

while True:
    user_text = stt.listen()
    if "exit" in user_text.lower():
        print("👋 Exiting...")
        break

    reply = chatbot.ask(user_text)
    print(f"🤖 AI: {reply}")

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import chromadb
from chromadb.utils import embedding_functions
from ollama import Client
import sqlite3
from datetime import datetime
from utils.preprocess import preprocess_text
from utils.translate import detect_language, translate_to_english, translate_from_english
from utils.analytics import log_query

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
collection = chroma_client.get_or_create_collection(name="rag_collection", embedding_function=embedding_fn)

# Initialize Ollama client
ollama_client = Client()

# Load documents into ChromaDB (run once or on startup if docs change)
def load_documents():
    docs_dir = "./docs"
    if not os.path.exists(docs_dir) or not collection.count() == 0:
        return
    for filename in os.listdir(docs_dir):
        with open(os.path.join(docs_dir, filename), 'r', encoding='utf-8') as f:
            text = f.read()
            preprocessed_text = preprocess_text(text)
            collection.add(documents=[preprocessed_text], metadatas=[{"source": filename}], ids=[filename])

load_documents()  # Load docs on startup

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('message', '')
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    # Log query
    log_query(user_input)

    # Detect language and translate to English if needed
    lang = detect_language(user_input)
    if lang != 'en':
        user_input_en = translate_to_english(user_input, lang)
    else:
        user_input_en = user_input

    # Retrieve relevant documents from ChromaDB
    results = collection.query(query_texts=[user_input_en], n_results=2)
    context = "\n".join(results['documents'][0]) if results['documents'] else "No relevant context found."

    # Construct prompt for Ollama
    prompt = f"Context:\n{context}\n\nUser Query: {user_input_en}\nAnswer based on the context if available, otherwise provide a general response."

    # Get response from Ollama DeepSeek model
    try:
        response = ollama_client.chat(model='deepseek-r1', messages=[{'role': 'user', 'content': prompt}])
        bot_response = response['message']['content']
    except Exception as e:
        bot_response = f"Error: {str(e)}"

    # Translate response back to user's language if not English
    if lang != 'en':
        bot_response = translate_from_english(bot_response, lang)

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('../queries.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS queries 
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  query TEXT, 
                  timestamp TEXT)''')
    conn.commit()
    conn.close()

def log_query(query):
    init_db()
    conn = sqlite3.connect('../queries.db')
    c = conn.cursor()
    timestamp = datetime.now().isoformat()
    c.execute("INSERT INTO queries (query, timestamp) VALUES (?, ?)", (query, timestamp))
    conn.commit()
    conn.close()
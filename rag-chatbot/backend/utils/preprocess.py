import re

def preprocess_text(text):
    # Basic cleaning: remove extra whitespace, lowercase
    text = re.sub(r'\s+', ' ', text.strip())
    text = text.lower()
    return text
from googletrans import Translator, LANGUAGES

translator = Translator()

def detect_language(text):
    try:
        return translator.detect(text).lang
    except Exception:
        return 'en'  # Default to English on error

def translate_to_english(text, source_lang):
    try:
        return translator.translate(text, src=source_lang, dest='en').text
    except Exception:
        return text  # Return original on error

def translate_from_english(text, target_lang):
    try:
        return translator.translate(text, src='en', dest=target_lang).text
    except Exception:
        return text  # Return original on error
"""
Local multilingual citizen-request analyzer.

Prototype languages:
- English
- Hindi
- Marathi

No external API or API key required.
"""


CATEGORY_KEYWORDS = {
    "Healthcare": [
        # English
        "hospital", "doctor", "health", "clinic", "medicine",
        "medical", "ambulance", "healthcare",

        # Hindi
        "अस्पताल", "डॉक्टर", "स्वास्थ्य", "दवा", "इलाज",
        "चिकित्सा", "एम्बुलेंस",

        # Marathi
        "रुग्णालय", "डॉक्टर", "आरोग्य", "औषध", "उपचार",
        "दवाखाना", "रुग्णवाहिका",
    ],

    "Roads": [
        # English
        "road", "roads", "street", "bridge", "highway",
        "pothole", "traffic", "footpath",

        # Hindi
        "सड़क", "सड़क", "पुल", "राजमार्ग", "गड्ढा",
        "ट्रैफिक", "फुटपाथ",

        # Marathi
        "रस्ता", "रस्ते", "पूल", "महामार्ग", "खड्डा",
        "वाहतूक", "फुटपाथ",
    ],

    "Water": [
    # English
    "water", "pipeline", "drinking water", "tap water",
    "water supply", "leakage", "shortage",

    # Hindi
    "पानी", "जल", "पाइपलाइन", "पीने का पानी",
    "जल आपूर्ति", "पानी की कमी", "रिसाव",

    # Marathi
    "पाणी", "पाण्याची", "पाणीपुरवठा",
    "पिण्याचे पाणी", "पाण्याची कमतरता",
    "पाणी नाही", "जल", "पाईपलाईन", "गळती",
],

    "Education": [
        # English
        "school", "college", "education", "teacher",
        "classroom", "student", "university",

        # Hindi
        "स्कूल", "विद्यालय", "कॉलेज", "शिक्षा", "शिक्षक",
        "कक्षा", "छात्र", "विश्वविद्यालय",

        # Marathi
        "शाळा", "महाविद्यालय", "शिक्षण", "शिक्षक",
        "वर्ग", "विद्यार्थी", "विद्यापीठ",
    ],

    "Digital Connectivity": [
        # English
        "internet", "wifi", "wi-fi", "network",
        "mobile network", "connectivity", "broadband",

        # Hindi
        "इंटरनेट", "वाईफाई", "नेटवर्क", "मोबाइल नेटवर्क",
        "कनेक्टिविटी", "ब्रॉडबैंड",

        # Marathi
        "इंटरनेट", "वायफाय", "नेटवर्क", "मोबाईल नेटवर्क",
        "कनेक्टिव्हिटी", "ब्रॉडबँड",
    ],
}


SEVERITY_KEYWORDS = {
    "Critical": [
        # English
        "urgent", "critical", "emergency", "danger",
        "life threatening", "no hospital", "no water",
        "accident", "unsafe",

        # Hindi
        "तुरंत", "अत्यावश्यक", "गंभीर", "आपातकाल",
        "खतरा", "जान का खतरा", "अस्पताल नहीं",
        "पानी नहीं", "दुर्घटना", "असुरक्षित",

        # Marathi
        "तातडीचे", "तात्काळ", "गंभीर", "आपत्कालीन",
        "धोका", "जीवाला धोका", "रुग्णालय नाही",
        "पाणी नाही", "अपघात", "असुरक्षित",
    ],

    "High": [
        # English
        "poor", "difficult", "problem", "shortage",
        "unavailable", "broken", "damaged", "lack",

        # Hindi
        "खराब", "मुश्किल", "समस्या", "कमी",
        "उपलब्ध नहीं", "टूटा", "क्षतिग्रस्त", "अभाव",

        # Marathi
        "खराब", "अडचण", "समस्या", "कमतरता",
        "उपलब्ध नाही", "तुटलेले", "नुकसान", "अभाव",
    ],
}


LANGUAGE_KEYWORDS = {
    "hi": [
        "अस्पताल", "स्वास्थ्य", "पानी", "सड़क", "शिक्षा",
        "स्कूल", "समस्या", "गांव", "गाँव", "चाहिए",
    ],

    "mr": [
        "रुग्णालय", "आरोग्य", "पाणी", "रस्ता", "शिक्षण",
        "शाळा", "समस्या", "गाव", "पाहिजे", "नाही",
    ],
}


def detect_language(text: str) -> str:
    """
    Lightweight language detection for the prototype.

    Returns:
        en = English
        hi = Hindi
        mr = Marathi
    """

    for word in LANGUAGE_KEYWORDS["mr"]:
        if word in text:
            return "mr"

    for word in LANGUAGE_KEYWORDS["hi"]:
        if word in text:
            return "hi"

    return "en"


def _contains_keyword(text: str, keywords: list[str]) -> bool:
    return any(keyword in text for keyword in keywords)


def analyze_request(message: str):
    """
    Analyze a citizen development request locally.

    This is an explainable multilingual prototype.
    No external AI API is required.
    """

    if not message or not message.strip():
        return {
            "category": "Other",
            "severity": "Medium",
            "language": "en",
        }

    text = message.lower().strip()

    # -------------------------
    # Language detection
    # -------------------------

    language = detect_language(text)

    # -------------------------
    # Category detection
    # -------------------------

    category = "Other"

    # Check every category and select the first matching category.
    for category_name, keywords in CATEGORY_KEYWORDS.items():
        if _contains_keyword(text, keywords):
            category = category_name
            break

    # -------------------------
    # Severity detection
    # -------------------------

    if _contains_keyword(text, SEVERITY_KEYWORDS["Critical"]):
        severity = "Critical"

    elif _contains_keyword(text, SEVERITY_KEYWORDS["High"]):
        severity = "High"

    else:
        severity = "Medium"

    return {
        "category": category,
        "severity": severity,
        "language": language,
    }
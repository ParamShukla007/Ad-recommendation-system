from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import numpy as np

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_keywords(keywords):
    return model.encode(keywords)

def cosine_similarity(a, b):
    a = a / np.linalg.norm(a)
    b = b / np.linalg.norm(b)
    return np.dot(a, b)

@app.route('/match_ads', methods=['POST'])
def match_ads():
    data = request.json
    extracted_keywords = data.get('extracted_keywords', [])
    ads = data.get('ads', [])
    threshold = data.get('threshold', 0.7)

    extracted_embeds = embed_keywords(extracted_keywords)
    matched_ads = []

    for ad in ads:
        ad_keywords = ad.get('keywords', [])
        ad_embeds = embed_keywords(ad_keywords)
        max_sim = max(
            cosine_similarity(extracted_embeds[i], ad_embeds[j])
            for i in range(len(extracted_keywords))
            for j in range(len(ad_keywords))
        ) if ad_keywords else 0
        if max_sim >= threshold:
            ad['similarity'] = float(max_sim)
            matched_ads.append(ad)
    return jsonify(matched_ads)

if __name__ == '__main__':
    app.run(port=5001)
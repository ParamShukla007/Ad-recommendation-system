import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractTextFromUrl } from "../../utils/extractTextFromUrl.js";
import Ad from "../../models/adsSchema.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeAndExtract(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    // 1. Extract text from URL
    const text = await extractTextFromUrl(url);

    // 2. Prepare prompt for Gemini
    const prompt = `
      Summarize the following article and extract the main keywords.
      Return a JSON object with "summary" and "keywords" (array).
      Article:
      ${text}
    `;

    // 3. Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract JSON from code block if present
    let jsonText = response;
    const match = response.match(/```json\s*([\s\S]*?)```/);
    if (match) {
      jsonText = match[1];
    }

    let summary = "";
    let keywords = [];
    try {
      const parsed = JSON.parse(jsonText);
      summary = parsed.summary;
      keywords = parsed.keywords;
    } catch {
      summary = response;
      keywords = [];
    }

    // 4. Fetch all ads from DB
    const ads = await Ad.find({});

    // 5. Send keywords and ads to Python service for semantic matching
    let matchedAds = [];
    if (keywords.length > 0 && ads.length > 0) {
      const pyRes = await axios.post("http://127.0.0.1:5001/match_ads", {
        extracted_keywords: keywords,
        ads: ads.map(ad => ({
          _id: ad._id,
          title: ad.title,
          description: ad.description,
          keywords: ad.keywords
        })),
        threshold: 0.7 // adjust as needed
      });
      matchedAds = pyRes.data;
      matchedAds.sort((a, b) => b.similarity - a.similarity);
    }

    res.json({ summary, keywords, matchedAds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
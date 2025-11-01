import axios from "axios";
import * as cheerio from "cheerio";
/**
 * Fetches a URL and extracts visible textual content from paragraphs.
 * Truncates to avoid token overflow.
 */
export async function extractTextFromUrl(url) {
  const res = await axios.get(url, { timeout: 15000 });
  const html = res.data;
  const $ = cheerio.load(html);

  // Take the main content heuristically (all <p> text)
  const paragraphs = $("p")
    .map((i, el) => $(el).text())
    .get()
    .join("\n\n");

  const cleaned = paragraphs.replace(/\s+/g, " ").trim();

  // limit to 6000 characters (adjust as needed)
  return cleaned.length > 6000 ? cleaned.slice(0, 6000) : cleaned;
}
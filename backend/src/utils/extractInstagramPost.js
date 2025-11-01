import axios from "axios";
import cheerio from "cheerio";

// Scrape Instagram post for text and hashtags
async function scrapeInstagramPost(url) {
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const $ = cheerio.load(data);

  // Instagram post text is often in <meta property="og:description">
  const metaDesc = $('meta[property="og:description"]').attr('content') || '';
  // Extract hashtags from the description
  const hashtags = metaDesc.match(/#[a-zA-Z0-9_]+/g) || [];

  return {
    text: metaDesc,
    hashtags
  };
}

export default scrapeInstagramPost;
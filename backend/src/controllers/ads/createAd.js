
import Ad from "../../models/adsSchema.js";

const uploadAd = async (req, res) => {
  try {
    let adsData = req.body;
    // Accept either a single ad object or an array of ads
    if (!Array.isArray(adsData)) {
      adsData = [adsData];
    }
    // Validate each ad object minimally
    const adsToSave = adsData.map(ad => ({
      title: ad.title,
      description: ad.description,
      keywords: ad.keywords,
    }));
    const savedAds = await Ad.insertMany(adsToSave);
    res.status(201).json({ message: "Ads uploaded successfully", ads: savedAds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { uploadAd };
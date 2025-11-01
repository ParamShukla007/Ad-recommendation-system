import { Router } from "express";
import { summarizeAndExtract } from "../controllers/extraction/textExtract.js";

const router = Router();

router.route("/summarizeAndExtract").post(summarizeAndExtract);
export default router;
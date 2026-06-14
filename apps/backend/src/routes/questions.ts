import { Router } from "express";
import { generateQuestions } from "../controllers/questions";

const router = Router();

router.post("/generate-questions", generateQuestions);

export default router;

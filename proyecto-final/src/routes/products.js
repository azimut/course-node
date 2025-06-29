import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => res.json({ message: "sucessfully created" }));

export default router;

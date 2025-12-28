import express from "express";
import { registerCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, authorizeRoles("recruiter"), registerCompany);
router.route("/get").get(isAuthenticated, authorizeRoles("recruiter"), getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, authorizeRoles("recruiter"), updateCompany);

export default router;

import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, authorizeRoles("recruiter"), postJob);
router.route("/getAll").get(isAuthenticated, getAllJobs);
router.route("/getAdmin").get(isAuthenticated, authorizeRoles("recruiter"), getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;

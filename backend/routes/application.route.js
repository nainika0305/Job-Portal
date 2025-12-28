import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.route("/apply/:jobId").post(isAuthenticated, authorizeRoles("student"), applyJob);
router.route("/get").get(isAuthenticated, authorizeRoles("student"), getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, authorizeRoles("recruiter"), updateStatus);

export default router;

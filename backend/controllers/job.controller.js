import { Job } from "../models/job.model.js";

// ADdmin can post a job 
export const postJob = async (req, res) => {
    console.log("BODY:", req.body);

    try {
        const { title, description, requirements, salary, location, jobType, experience, positions, companyId } = req.body;
        const userId = req.id;


        // Missing fields 
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !positions || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        };

        // Student tries to post 
        if (req.role === "student") {
            return res.status(403).json({
                message: "Students are not allowed to post jobs",
                success: false
            });
        }

        // Create job if all fields given 
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            positions,
            company: companyId,
            created_by: req.id
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// Show all jobs for student 
export const getAllJobs = async (req, res) => {
    try {
        // filtering by keyword given in the query
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                // search for keyword anywhere inside the title 
                { title: { $regex: keyword, $options: "i" } }, // i = case insenstitive
                { description: { $regex: keyword, $options: "i" } },
            ]
        };// return document if title or description matches 

        // to get company details also use populate 
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        // No jobs with this keyword
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };

        // all ok
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// Student wants a particular job 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}


// Jobs created by the Admin 
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });

        // no jobs 
        if (!jobs) {
            return res.status(404).json({
                message: "No Jobs found",
                success: false
            })
        };

        // jobs found
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

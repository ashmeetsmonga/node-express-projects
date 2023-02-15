const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Job = require("../models/Job");

const getJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req;

	const job = await Job.findOne({ _id: jobId, createdBy: userId });
	if (!job) throw new NotFoundError(`Job not found with id ${jobId}`);

	res.status(StatusCodes.OK).json(job);
};

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
	const {
		user: { userId },
		params: { jobId },
		body: { company, position },
	} = req;

	if (company === "" || position === "")
		throw new BadRequestError("Company/position cannot be empty");
	console.log(req.user);
	const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
		new: true,
		runValidators: true,
	});
	return res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
	res.send("deleteJob");
};

module.exports = { getJob, getAllJobs, createJob, updateJob, deleteJob };

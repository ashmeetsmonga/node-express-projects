const getJob = async (req, res) => {
	res.send("getJob");
};

const getAllJobs = async (req, res) => {
	res.send("getAllJobs");
};

const createJob = async (req, res) => {
	res.json(req.user);
};

const updateJob = async (req, res) => {
	res.send("updateJob");
};

const deleteJob = async (req, res) => {
	res.send("deleteJob");
};

module.exports = { getJob, getAllJobs, createJob, updateJob, deleteJob };

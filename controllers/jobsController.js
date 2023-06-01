
const createJob = async (req,res) => {
    res.send("create JOB")
}
const deleteJob = async (req,res) => {
    res.send("delete JOB")
}
const updateJob = async (req,res) => {
    res.send("update JOB")
}
const getAllJobs = async (req,res) => {
    res.send("get all JOB")
}

const showStats = async (req,res) => {
    res.send("stats ")
}

export {createJob,deleteJob,updateJob,getAllJobs,showStats}
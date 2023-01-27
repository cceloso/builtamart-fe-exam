import axios from "axios"

export const getEmployeeJobs = async () => {
    try {
        const res = await axios.get("/employeeJobs")
        return res.data
    } catch (err) {
        console.error(err)
        return null
    }
}

export const getEmployeeJob = async (employeeId: number) => {
    try {
        const res = await axios.get(`/employeeJobs?employeeId=${employeeId}`)
        return res.data
    } catch (err) {
        console.error(err)
        return null
    }
}

export const addEmployeeJob = async (employeeId: number, jobId: number) => {
    try {
        const res = await axios.post("/employeeJobs", {
            employeeId,
            jobId
        })
        return res
    } catch (err) {
        console.error(err)
        return null
    }
}

export const deleteEmployeeJob = async (id: number) => {
    try {
        const res = await axios.delete(`/employeeJobs/${id}`)
        return res
    } catch (err) {
        console.error(err)
        return null
    }
}
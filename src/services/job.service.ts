import axios from "axios"

export const getJobs = async () => {
    try {
        const res = await axios.get("/jobs")
        return res.data
    } catch (err) {
        console.error(err)
        return null
    }
}

export const addJob = async (name: string) => {
    try {
        const res = await axios.post("/jobs", {
            name: name,
        })
        return res
    } catch (err) {
        console.error(err)
        return null
    }
}

export const editJob = async (id: number, name: string) => {
    try {
        const res = await axios.put(`/jobs/${id}`, {
            name: name,
        })
        return res
    } catch (err) {
        console.error(err)
        return null
    }
}

export const deleteJob = async (id: number) => {
    try {
        await axios.delete(`/jobs/${id}`)
        window.location.reload()
    } catch (err) {
        console.error(err)
    }
}
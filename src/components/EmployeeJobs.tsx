import axios from "axios"
import { useEffect, useState } from "react"

interface EmployeeJobsProps {
    id: number
}

const EmployeeJobs = ({ id }: { id: number }) => {
    const [employeeJobs, setEmployeeJobs] = useState<Job[]>([])

    const getEmployeeJobs = async ()=> {
        try {
            let res = await axios.get(`${import.meta.env.VITE_API_URL}/employeeJobs?employeeId=${id}`)
            const employeeJobs: EmployeeJob[] = res.data
            console.log(`employeeJobs: ${employeeJobs}`)

            const jobIds = employeeJobs.map((job) => job.jobId)
            console.log(`jobIds: ${jobIds}`)

            res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
            const jobs: Job[] = res.data
            console.log(`jobs: ${jobs}`)

            const filteredJobs = jobs.filter((job) => jobIds.includes(job.id))

            console.log(`filtered jobs ${id}: ${filteredJobs}`)
            setEmployeeJobs(filteredJobs)
        } catch (err) {
            console.error(err)
            return null
        }
    }

    useEffect(() => {
        getEmployeeJobs()
    }, [id])

    return (
        <div>
            {employeeJobs.map((job) => (
                <p className="text-sm truncate w-72">{job.name}</p>
            ))}
        </div>
    )
}

export default EmployeeJobs
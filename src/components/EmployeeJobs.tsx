import { useEffect, useState } from "react"
import { getEmployeeJob } from "../services/employeeJob.service"
import { getJobs } from "../services/job.service"

interface EmployeeJobsProps {
    id: number
}

const EmployeeJobs = (props: EmployeeJobsProps) => {
    const [employeeJobs, setEmployeeJobs] = useState<Job[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const employeeJobs: EmployeeJob[] = await getEmployeeJob(props.id)
            const jobs: Job[] = await getJobs()
            const employeeJobIds = employeeJobs.map((job) => job.jobId)
            const filteredJobs = jobs.filter((job) => employeeJobIds.includes(job.id))

            setEmployeeJobs(filteredJobs)
        }

        fetchData()
    }, [props.id])

    return (
        <div>
            {employeeJobs.length === 0 && <p className="text-sm truncate italic">No assigned job</p>}
            
            {employeeJobs.length > 0 && employeeJobs.map((job) => (
                <p className="text-sm truncate w-72" key={job.id}>{job.name}</p>
            ))}
        </div>
    )
}

export default EmployeeJobs